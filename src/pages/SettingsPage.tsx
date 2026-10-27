import { useRef, type ChangeEvent } from 'react';
import type { Settings, ThemePreference } from '../types';
import { ChevronRight, CircleCheck } from '../components/Icons';

interface SettingsPageProps {
  settings: Settings;
  filterCount: number;
  installed: boolean;
  notificationsSupported: boolean;
  onThemeChange: (theme: ThemePreference) => void;
  onToggleReminders: (enabled: boolean) => void;
  onExport: () => void;
  onImportFile: (file: File) => void;
  onOpenInstall: () => void;
  onOpenTutorial: () => void;
  onDeleteAll: () => void;
}

const THEMES: { key: ThemePreference; label: string }[] = [
  { key: 'system', label: 'System' },
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
];

export function SettingsPage({
  settings,
  filterCount,
  installed,
  notificationsSupported,
  onThemeChange,
  onToggleReminders,
  onExport,
  onImportFile,
  onOpenInstall,
  onOpenTutorial,
  onDeleteAll,
}: SettingsPageProps) {
  const fileInput = useRef<HTMLInputElement>(null);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onImportFile(file);
    event.target.value = '';
  }

  return (
    <div className="page">

      <section className="settings-section">
        <p className="section-label">Appearance</p>
        <div className="settings-group theme-group">
          <div className="theme-group-head">
            <span>Theme</span>
          </div>
          <div className="segmented theme-segmented" role="radiogroup" aria-label="Theme">
            {THEMES.map((theme) => (
              <button
                key={theme.key}
                type="button"
                role="radio"
                aria-checked={settings.theme === theme.key}
                className={settings.theme === theme.key ? 'is-active' : ''}
                onClick={() => onThemeChange(theme.key)}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="settings-section">
        <p className="section-label">Reminders</p>
        <div className="settings-group">
          <div className="settings-row static">
            <span className="settings-copy">
              <span className="settings-title">
                {notificationsSupported ? 'Browser reminders' : 'Due badge'}
              </span>
              <span className="settings-sub">
                {notificationsSupported
                  ? 'A notification for tasks that are due or overdue, checked at most once a day.'
                  : 'On iPhone, due tasks are shown with a badge on the Tasks tab. iOS does not let web apps schedule local alerts.'}
              </span>
            </span>
            {notificationsSupported ? (
              <button
                type="button"
                role="switch"
                aria-checked={settings.reminders}
                aria-label="Browser reminders"
                className="switch"
                onClick={() => onToggleReminders(!settings.reminders)}
              />
            ) : (
              <span className="settings-check">
                <CircleCheck size={20} />
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="settings-section">
        <p className="section-label">Install</p>
        <div className="settings-group">
          {installed ? (
            <div className="settings-row static">
              <span className="settings-copy">
                <span className="settings-title">Installed on this device</span>
                <span className="settings-sub">You’re using Replacely from the Home Screen.</span>
              </span>
            </div>
          ) : (
            <button type="button" className="settings-row" onClick={onOpenInstall}>
              <span className="settings-copy">
                <span className="settings-title">Add to Home Screen</span>
                <span className="settings-sub">Full screen, with your tasks saved on the device.</span>
              </span>
              <ChevronRight size={17} className="chevron" />
            </button>
          )}
        </div>
        <p className="settings-footnote">
          To use it offline, install it from an https address.
        </p>
      </section>

      <section className="settings-section">
        <p className="section-label">Help</p>
        <div className="settings-group">
          <button type="button" className="settings-row" onClick={onOpenTutorial}>
            <span className="settings-copy">
              <span className="settings-title">How Replacely works</span>
              <span className="settings-sub">A short guide to tasks, countdowns and installing.</span>
            </span>
            <ChevronRight size={17} className="chevron" />
          </button>
        </div>
      </section>

      <section className="settings-section">
        <p className="section-label">Your data</p>
        <div className="settings-group">
          <button type="button" className="settings-row" onClick={onExport}>
            <span className="settings-copy">
              <span className="settings-title">Export backup</span>
              <span className="settings-sub">Save a JSON copy of every task and its history.</span>
            </span>
            <ChevronRight size={17} className="chevron" />
          </button>
          <button type="button" className="settings-row" onClick={() => fileInput.current?.click()}>
            <span className="settings-copy">
              <span className="settings-title">Import backup</span>
              <span className="settings-sub">Replace the tasks in this app with a backup.</span>
            </span>
            <ChevronRight size={17} className="chevron" />
          </button>
          <input ref={fileInput} type="file" accept="application/json,.json" onChange={handleFile} hidden />
        </div>
        <p className="settings-footnote">
          {filterCount === 0
            ? 'No tasks stored yet.'
            : `${filterCount} ${filterCount === 1 ? 'task is' : 'tasks are'} stored in this browser. Export a backup before clearing Safari data or changing phones.`}
        </p>
      </section>

      <section className="settings-section">
        <p className="section-label">About</p>
        <div className="settings-group">
          <div className="settings-row static">
            <span className="settings-copy">
              <span className="settings-title">Replacely</span>
              <span className="settings-sub">Version 2.0 · Household reminder app</span>
            </span>
            <span className="settings-value">2.0</span>
          </div>
          <div className="settings-row static">
            <span className="settings-copy">
              <span className="settings-title">Private by design</span>
              <span className="settings-sub">No account, no server, no tracking. Your tasks live in this browser.</span>
            </span>
          </div>
        </div>
        <p className="settings-footnote">
          Replacely is an independent app. It is not affiliated with Apple Inc. The interface is inspired by familiar
          mobile patterns.
        </p>
      </section>

      <section className="settings-section">
        <div className="settings-group">
          <button
            type="button"
            className="settings-row destructive"
            onClick={onDeleteAll}
            disabled={filterCount === 0}
          >
            <span className="settings-copy">
              <span className="settings-title">Delete all tasks</span>
              <span className="settings-sub">Removes every task, note and completion record.</span>
            </span>
          </button>
        </div>
      </section>

      <p className="app-footnote">Made for keeping up, not catching up.</p>
    </div>
  );
}
