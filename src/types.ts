export type Category =
  | 'cleaning'
  | 'maintenance'
  | 'outdoor'
  | 'safety'
  | 'air'
  | 'water'
  | 'appliance'
  | 'vehicle'
  | 'pool'
  | 'other';

export type FilterStatus = 'healthy' | 'due' | 'overdue';

export interface HistoryEntry {
  id: string;
  /** Date the new filter went in (YYYY-MM-DD). */
  replacedAt: string;
  /** Install date of the filter that was taken out (YYYY-MM-DD). */
  previousInstalledAt: string;
  note?: string;
}

export interface Filter {
  id: string;
  name: string;
  typeId: string;
  location: string;
  /** Install date, YYYY-MM-DD (local). */
  installedAt: string;
  lifespanDays: number;
  cost?: number;
  notes?: string;
  history: HistoryEntry[];
  createdAt: string;
}

export interface FilterDraft {
  name: string;
  typeId: string;
  location: string;
  installedAt: string;
  lifespanDays: number;
  cost?: number;
  notes?: string;
}

export type ThemePreference = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export interface Settings {
  theme: ThemePreference;
  reminders: boolean;
  hasSeenTutorial: boolean;
  installTipDismissed: boolean;
}

export interface AppState {
  version: 2;
  filters: Filter[];
  settings: Settings;
}

export type TabKey = 'filters' | 'schedule' | 'insights' | 'settings';
export type FilterTab = 'all' | 'due' | 'overdue';
