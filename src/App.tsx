import { useEffect, useMemo, useRef, useState } from 'react';
import type {
  AppState,
  Filter,
  FilterDraft,
  FilterTab,
  HistoryEntry,
  ResolvedTheme,
  Settings,
  TabKey,
  ThemePreference,
} from './types';
import {
  createInitialState,
  downloadBackup,
  loadState,
  markReminderSentToday,
  parseBackup,
  reminderAlreadySentToday,
  saveState,
} from './lib/storage';
import {
  addDays,
  compareUrgency,
  formatDate,
  getFilterInfo,
  parseDateInput,
  toDateInput,
  uid,
} from './lib/filters';
import { findType } from './data/filterTypes';
import { isStandalone, systemTheme, supportsLocalNotifications } from './lib/platform';
import { BottomNav } from './components/BottomNav';
import { DetailSheet } from './components/DetailSheet';
import { FilterForm } from './components/FilterForm';
import { ReplaceSheet } from './components/ReplaceSheet';
import { InstallSheet } from './components/InstallSheet';
import { Tutorial } from './components/Tutorial';
import { IosAlert } from './components/IosAlert';
import { FiltersPage } from './pages/FiltersPage';
import { SchedulePage } from './pages/SchedulePage';
import { InsightsPage } from './pages/InsightsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AlertTriangle, Check, Plus } from './components/Icons';

const TAB_TITLES: Record<TabKey, string> = {
  filters: 'Tasks',
  schedule: 'Schedule',
  insights: 'Insights',
  settings: 'Settings',
};

/** Browser chrome matches the page ground. */
const BAND_COLOR: Record<ResolvedTheme, string> = { light: '#f4f3f0', dark: '#171716' };

export default function App() {
  const [app, setApp] = useState<AppState>(() => loadState() ?? createInitialState());
  const [tab, setTab] = useState<TabKey>('filters');
  const [now, setNow] = useState(() => Date.now());
  const [query, setQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [tutorialOpen, setTutorialOpen] = useState(() => !app.settings.hasSeenTutorial);
  const [installOpen, setInstallOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [replaceId, setReplaceId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);
  const [pendingImport, setPendingImport] = useState<Filter[] | null>(null);
  const [toast, setToast] = useState<{ message: string; tone: 'success' | 'error' } | null>(null);
  const [system, setSystem] = useState<ResolvedTheme>(() => systemTheme());
  const [installed, setInstalled] = useState(() => isStandalone());
  const scrollRef = useRef<HTMLDivElement>(null);

  const resolvedTheme: ResolvedTheme = app.settings.theme === 'system' ? system : app.settings.theme;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    saveState(app);
  }, [app]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', BAND_COLOR[resolvedTheme]);
  }, [resolvedTheme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => setSystem(event.matches ? 'dark' : 'light');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(display-mode: standalone)');
    const onChange = () => setInstalled(isStandalone());
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [tab]);

  useEffect(() => {
    if (!app.settings.reminders || !supportsLocalNotifications()) return;
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    if (app.filters.length === 0 || reminderAlreadySentToday()) return;

    const attention = app.filters
      .map((filter) => ({ filter, info: getFilterInfo(filter, Date.now()) }))
      .filter(({ info }) => info.status !== 'healthy');
    if (attention.length === 0) return;

    const names = attention.slice(0, 3).map(({ filter }) => filter.name).join(', ');
    try {
      new Notification('Replacely — tasks need attention', {
        body: `${attention.length} ${attention.length === 1 ? 'task is' : 'tasks are'} due or overdue: ${names}${attention.length > 3 ? '…' : ''}.`,
        tag: 'replacely-due',
      });
      markReminderSentToday();
    } catch {
      // The dashboard and tab badge still show due filters.
    }
  }, [app.filters, app.settings.reminders]);

  const hasOverlay =
    tutorialOpen ||
    installOpen ||
    formOpen ||
    Boolean(detailId) ||
    Boolean(replaceId) ||
    Boolean(deletingId) ||
    deleteAllOpen ||
    Boolean(pendingImport);

  useEffect(() => {
    if (!hasOverlay) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      if (pendingImport) setPendingImport(null);
      else if (deletingId) setDeletingId(null);
      else if (deleteAllOpen) setDeleteAllOpen(false);
      else if (formOpen) {
        setFormOpen(false);
        setEditingId(null);
      } else if (replaceId) setReplaceId(null);
      else if (installOpen) setInstallOpen(false);
      else if (tutorialOpen) {
        setTutorialOpen(false);
        setApp((state) => ({ ...state, settings: { ...state.settings, hasSeenTutorial: true } }));
      } else if (detailId) setDetailId(null);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hasOverlay, pendingImport, deletingId, deleteAllOpen, formOpen, replaceId, installOpen, tutorialOpen, detailId]);

  const items = useMemo(
    () => app.filters.map((filter) => ({ filter, info: getFilterInfo(filter, now) })),
    [app.filters, now],
  );

  const counts: { all: number; healthy: number; due: number; overdue: number } = {
    all: items.length,
    healthy: 0,
    due: 0,
    overdue: 0,
  };
  for (const item of items) counts[item.info.status] += 1;

  const visibleItems = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return items
      .filter(({ filter, info }) => {
        if (filterTab === 'due' && info.status !== 'due') return false;
        if (filterTab === 'overdue' && info.status !== 'overdue') return false;
        if (!needle) return true;
        const typeLabel = findType(filter.typeId).label;
        return [filter.name, filter.location, filter.notes ?? '', typeLabel].some((value) =>
          value.toLocaleLowerCase().includes(needle),
        );
      })
      .sort(compareUrgency);
  }, [items, query, filterTab]);

  const locations = useMemo(
    () => [...new Set(app.filters.map((filter) => filter.location))].sort((a, b) => a.localeCompare(b)),
    [app.filters],
  );

  const selected = detailId ? app.filters.find((filter) => filter.id === detailId) ?? null : null;
  const editing = editingId ? app.filters.find((filter) => filter.id === editingId) ?? null : null;
  const replacing = replaceId ? app.filters.find((filter) => filter.id === replaceId) ?? null : null;
  const deleting = deletingId ? app.filters.find((filter) => filter.id === deletingId) ?? null : null;

  function showToast(message: string, tone: 'success' | 'error' = 'success') {
    setToast({ message, tone });
  }

  function updateSettings(patch: Partial<Settings>) {
    setApp((state) => ({ ...state, settings: { ...state.settings, ...patch } }));
  }

  function openAdd() {
    setEditingId(null);
    setFormOpen(true);
  }

  function openEdit(filter: Filter) {
    setEditingId(filter.id);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
  }

  function closeTutorial() {
    setTutorialOpen(false);
    updateSettings({ hasSeenTutorial: true });
  }

  function handleSave(draft: FilterDraft) {
    if (editing) {
      const id = editing.id;
      setApp((state) => ({
        ...state,
        filters: state.filters.map((filter) => (filter.id === id ? { ...filter, ...draft } : filter)),
      }));
      showToast('Task updated');
    } else {
      const filter: Filter = {
        id: uid(),
        ...draft,
        history: [],
        createdAt: new Date().toISOString(),
      };
      setApp((state) => ({ ...state, filters: [...state.filters, filter] }));
      setTab('filters');
      setQuery('');
      setFilterTab('all');
      showToast('Task added — countdown started');
    }
    closeForm();
  }

  function handleReplace(date: string, note?: string) {
    if (!replacing) return;
    const target = replacing;
    const entry: HistoryEntry = {
      id: uid(),
      replacedAt: date,
      previousInstalledAt: target.installedAt,
      note,
    };
    setApp((state) => ({
      ...state,
      filters: state.filters.map((filter) =>
        filter.id === target.id ? { ...filter, installedAt: date, history: [entry, ...filter.history] } : filter,
      ),
    }));
    setReplaceId(null);
    showToast(`${target.name} reset — next change ${formatDate(toDateInput(addDays(parseDateInput(date), target.lifespanDays)))}`);
  }

  function confirmDelete() {
    if (!deleting) return;
    const target = deleting;
    setApp((state) => ({ ...state, filters: state.filters.filter((filter) => filter.id !== target.id) }));
    if (detailId === target.id) setDetailId(null);
    if (editingId === target.id) closeForm();
    if (replaceId === target.id) setReplaceId(null);
    setDeletingId(null);
    showToast(`${target.name} deleted`);
  }

  function confirmClearAll() {
    setApp((state) => ({ ...state, filters: [] }));
    setDeleteAllOpen(false);
    setDetailId(null);
    closeForm();
    setReplaceId(null);
    showToast('All tasks deleted');
  }

  function handleExport() {
    downloadBackup(app);
    showToast('Backup downloaded');
  }

  async function handleImportFile(file: File) {
    try {
      const text = await file.text();
      const filters = parseBackup(text);
      if (!filters) {
        showToast('That file isn’t a Replacely backup', 'error');
        return;
      }
      if (filters.length === 0) {
        showToast('That backup doesn’t contain any tasks', 'error');
        return;
      }
      setPendingImport(filters);
    } catch {
      showToast('Couldn’t read that file', 'error');
    }
  }

  function confirmImport() {
    if (!pendingImport) return;
    const imported = pendingImport;
    setApp((state) => ({ ...state, filters: imported }));
    setPendingImport(null);
    setTab('filters');
    setQuery('');
    setFilterTab('all');
    setDetailId(null);
    showToast(`Imported ${imported.length} ${imported.length === 1 ? 'task' : 'tasks'}`);
  }

  async function handleToggleReminders(enabled: boolean) {
    if (!enabled) {
      updateSettings({ reminders: false });
      showToast('Browser reminders off');
      return;
    }
    if (!supportsLocalNotifications()) {
      showToast('This browser can’t schedule local reminders', 'error');
      return;
    }
    let permission = Notification.permission;
    if (permission === 'default') {
      try {
        permission = await Notification.requestPermission();
      } catch {
        permission = 'denied';
      }
    }
    if (permission === 'granted') {
      updateSettings({ reminders: true });
      showToast('Browser reminders on');
    } else {
      showToast('Notifications are blocked — allow them in browser settings', 'error');
    }
  }

  function changeTheme(theme: ThemePreference) {
    updateSettings({ theme });
  }

  return (
    <div className="app-shell">
      <header className="app-bar">
        <div className="app-bar-inner">
          <div className="band-copy">
            <h1 className="band-title">{TAB_TITLES[tab]}</h1>
          </div>
          {tab !== 'settings' && (
            <button type="button" className="add-button" onClick={openAdd} aria-label="Add task">
              <Plus size={22} />
            </button>
          )}
        </div>
      </header>

      <div className="app-scroll" ref={scrollRef}>
        <div className="page-view" key={tab}>
          {tab === 'filters' && (
            <FiltersPage
              items={items}
              visibleItems={visibleItems}
              now={now}
              query={query}
              onQueryChange={setQuery}
              onAdd={openAdd}
              onOpen={setDetailId}
              onReplace={setReplaceId}
              onShowTutorial={() => setTutorialOpen(true)}
            />
          )}
          {tab === 'schedule' && (
            <SchedulePage
              items={items}
              onOpen={setDetailId}
              onAdd={openAdd}
              onShowTutorial={() => setTutorialOpen(true)}
            />
          )}
          {tab === 'insights' && (
            <InsightsPage
              items={items}
              now={now}
              onAdd={openAdd}
              onOpenSettings={() => setTab('settings')}
            />
          )}
          {tab === 'settings' && (
            <SettingsPage
              settings={app.settings}
              filterCount={app.filters.length}
              installed={installed}
              notificationsSupported={supportsLocalNotifications()}
              onThemeChange={changeTheme}
              onToggleReminders={handleToggleReminders}
              onExport={handleExport}
              onImportFile={handleImportFile}
              onOpenInstall={() => setInstallOpen(true)}
              onOpenTutorial={() => setTutorialOpen(true)}
              onDeleteAll={() => setDeleteAllOpen(true)}
            />
          )}
        </div>
      </div>

      <BottomNav active={tab} onChange={setTab} dueCount={counts.due} overdueCount={counts.overdue} />

      {selected && (
        <DetailSheet
          filter={selected}
          now={now}
          onClose={() => setDetailId(null)}
          onEdit={() => {
            setDetailId(null);
            openEdit(selected);
          }}
          onReplace={() => {
            setDetailId(null);
            setReplaceId(selected.id);
          }}
          onDelete={() => setDeletingId(selected.id)}
        />
      )}

      {formOpen && (
        <FilterForm initial={editing} locations={locations} onClose={closeForm} onSave={handleSave} />
      )}

      {replacing && (
        <ReplaceSheet filter={replacing} onCancel={() => setReplaceId(null)} onConfirm={handleReplace} />
      )}

      {installOpen && <InstallSheet installed={installed} onClose={() => setInstallOpen(false)} />}

      {tutorialOpen && <Tutorial installed={installed} onClose={closeTutorial} />}

      {deleting && (
        <IosAlert
          title="Delete this task?"
          message={
            <>
              <strong>{deleting.name}</strong> and its completion history will be removed. This can’t be undone.
            </>
          }
          confirmLabel="Delete"
          destructive
          onCancel={() => setDeletingId(null)}
          onConfirm={confirmDelete}
        />
      )}

      {pendingImport && (
        <IosAlert
          title="Import this backup?"
          message={
            <>
              This backup contains <strong>{pendingImport.length}</strong>{' '}
              {pendingImport.length === 1 ? 'task' : 'tasks'}. Importing will replace the{' '}
              <strong>{app.filters.length}</strong> currently stored here.
            </>
          }
          confirmLabel="Import"
          onCancel={() => setPendingImport(null)}
          onConfirm={confirmImport}
        />
      )}

      {deleteAllOpen && (
        <IosAlert
          title="Delete everything?"
          message="Every task, note and completion record will be removed from this device. Export a backup first if you might want them back."
          confirmLabel="Delete all"
          destructive
          onCancel={() => setDeleteAllOpen(false)}
          onConfirm={confirmClearAll}
        />
      )}

      {toast && (
        <div className={`toast ${toast.tone}`} role={toast.tone === 'error' ? 'alert' : 'status'}>
          {toast.tone === 'error' ? <AlertTriangle size={15} /> : <Check size={15} />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
