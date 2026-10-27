import type { AppState, Filter, HistoryEntry, Settings, ThemePreference } from '../types';
import { toDateInput, uid } from './filters';

const STORAGE_KEY = 'filterly:v2';
const LEGACY_STORAGE_KEY = 'filterly:v1';
const REMINDER_KEY = 'filterly:last-reminder';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isRealDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function readTheme(value: unknown): ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system' ? value : 'system';
}

export function defaultSettings(): Settings {
  return {
    theme: 'system',
    reminders: false,
    hasSeenTutorial: false,
    installTipDismissed: false,
  };
}

function sanitizeHistory(value: unknown): HistoryEntry[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!isRecord(entry)) return [];
    if (typeof entry.replacedAt !== 'string' || !isRealDate(entry.replacedAt)) return [];
    const previous =
      typeof entry.previousInstalledAt === 'string' && isRealDate(entry.previousInstalledAt)
        ? entry.previousInstalledAt
        : entry.replacedAt;
    return [
      {
        id: typeof entry.id === 'string' ? entry.id : uid(),
        replacedAt: entry.replacedAt,
        previousInstalledAt: previous,
        note: typeof entry.note === 'string' && entry.note.trim() ? entry.note : undefined,
      },
    ];
  });
}

export function sanitizeFilter(value: unknown): Filter | null {
  if (!isRecord(value)) return null;
  const name = typeof value.name === 'string' ? value.name.trim() : '';
  const location = typeof value.location === 'string' ? value.location.trim() : '';
  const installedAt = typeof value.installedAt === 'string' ? value.installedAt : '';
  const lifespanDays = Number(value.lifespanDays);

  if (!name || !location) return null;
  if (!isRealDate(installedAt)) return null;
  if (!Number.isFinite(lifespanDays) || lifespanDays < 1 || lifespanDays > 3650) return null;

  const cost = Number(value.cost);
  return {
    id: typeof value.id === 'string' && value.id ? value.id : uid(),
    name,
    typeId: typeof value.typeId === 'string' ? value.typeId : 'custom',
    location,
    installedAt,
    lifespanDays: Math.round(lifespanDays),
    cost: Number.isFinite(cost) && cost >= 0 ? cost : undefined,
    notes: typeof value.notes === 'string' && value.notes.trim() ? value.notes : undefined,
    history: sanitizeHistory(value.history),
    createdAt: typeof value.createdAt === 'string' ? value.createdAt : new Date().toISOString(),
  };
}

function isSampleValue(value: unknown): boolean {
  if (!isRecord(value)) return false;
  if (value.isSample === true) return true;
  return typeof value.id === 'string' && value.id.startsWith('sample-');
}

export function createInitialState(): AppState {
  return {
    version: 2,
    filters: [],
    settings: defaultSettings(),
  };
}

function parseState(raw: string): AppState | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || !Array.isArray(parsed.filters)) return null;

    const filters = parsed.filters
      .filter((value) => !isSampleValue(value))
      .map(sanitizeFilter)
      .filter((filter): filter is Filter => filter !== null);

    const rawSettings = isRecord(parsed.settings) ? parsed.settings : {};
    const settings: Settings = {
      theme: readTheme(rawSettings.theme),
      reminders: rawSettings.reminders === true,
      hasSeenTutorial: rawSettings.hasSeenTutorial === true,
      installTipDismissed: rawSettings.installTipDismissed === true,
    };

    return { version: 2, filters, settings };
  } catch {
    return null;
  }
}

function migrateLegacyState(raw: string): AppState | null {
  const state = parseState(raw);
  if (!state) return null;
  // Existing users get the new tutorial once, but no sample filters or old banners.
  return {
    ...state,
    settings: { ...state.settings, hasSeenTutorial: false, installTipDismissed: false },
  };
}

export function loadState(): AppState | null {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) return parseState(current);

    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!legacy) return null;

    const migrated = migrateLegacyState(legacy);
    if (migrated) localStorage.removeItem(LEGACY_STORAGE_KEY);
    return migrated;
  } catch {
    return null;
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage can be full or blocked; the app still works for this session.
  }
}

export function buildBackup(state: AppState): string {
  return JSON.stringify(
    {
      app: 'replacely',
      version: 2,
      exportedAt: new Date().toISOString(),
      filters: state.filters,
    },
    null,
    2,
  );
}

export function parseBackup(text: string): Filter[] | null {
  try {
    const parsed: unknown = JSON.parse(text);
    if (!isRecord(parsed) || !Array.isArray(parsed.filters)) return null;
    return parsed.filters
      .filter((value) => !isSampleValue(value))
      .map(sanitizeFilter)
      .filter((filter): filter is Filter => filter !== null);
  } catch {
    return null;
  }
}

export function downloadBackup(state: AppState): void {
  const blob = new Blob([buildBackup(state)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `filterly-backup-${toDateInput()}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function reminderAlreadySentToday(): boolean {
  try {
    return localStorage.getItem(REMINDER_KEY) === toDateInput();
  } catch {
    return false;
  }
}

export function markReminderSentToday(): void {
  try {
    localStorage.setItem(REMINDER_KEY, toDateInput());
  } catch {
    // Non-critical.
  }
}
