import type { Filter, FilterStatus } from '../types';

export const DAY_MS = 86_400_000;

export function parseDateInput(value: string): Date {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year ?? 2000, (month ?? 1) - 1, day ?? 1);
}

export function toDateInput(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function formatDate(value: string | Date, withYear = true): string {
  const date = typeof value === 'string' ? parseDateInput(value) : value;
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    ...(withYear ? { year: 'numeric' } : {}),
  });
}

export function daysBetween(from: string, to: string): number {
  return Math.max(0, Math.round((parseDateInput(to).getTime() - parseDateInput(from).getTime()) / DAY_MS));
}

export function formatCurrency(value: number, precise = false): string {
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: precise || hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatLifespan(days: number): string {
  if (days % 365 === 0) return days === 365 ? '1 year' : `${days / 365} years`;
  if (days % 30 === 0) return days === 30 ? '1 month' : `${days / 30} months`;
  if (days === 1) return '1 day';
  return `${days} days`;
}

export interface DurationParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function splitDuration(ms: number): DurationParts {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function formatDuration(ms: number, includeSeconds = true): string {
  const { days, hours, minutes, seconds } = splitDuration(ms);
  const clock = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m${
    includeSeconds ? ` ${String(seconds).padStart(2, '0')}s` : ''
  }`;
  return days > 0 ? `${days}d ${clock}` : clock;
}

export interface FilterItem {
  filter: Filter;
  info: FilterInfo;
}

export interface FilterInfo {
  dueDate: Date;
  daysLeft: number;
  percentUsed: number;
  remainingMs: number;
  overdueMs: number;
  status: FilterStatus;
}

const DUE_SOON_DAYS = 7;
const DUE_SOON_PERCENT = 85;

export function getFilterInfo(filter: Pick<Filter, 'installedAt' | 'lifespanDays'>, nowMs: number): FilterInfo {
  const installed = parseDateInput(filter.installedAt);
  const dueDate = addDays(installed, filter.lifespanDays);
  const dueEnd = new Date(dueDate);
  dueEnd.setHours(23, 59, 59, 999);

  const now = new Date(nowMs);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const daysLeft = Math.round((dueDate.getTime() - today.getTime()) / DAY_MS);
  const remainingMs = dueEnd.getTime() - nowMs;
  const elapsed = nowMs - installed.getTime();
  const percentUsed = Math.max(0, (elapsed / (filter.lifespanDays * DAY_MS)) * 100);

  const status: FilterStatus =
    remainingMs <= 0 ? 'overdue' : daysLeft <= DUE_SOON_DAYS || percentUsed >= DUE_SOON_PERCENT ? 'due' : 'healthy';

  return {
    dueDate,
    daysLeft,
    percentUsed,
    remainingMs: Math.max(0, remainingMs),
    overdueMs: Math.max(0, -remainingMs),
    status,
  };
}

const STATUS_RANK: Record<FilterStatus, number> = { overdue: 0, due: 1, healthy: 2 };

export function compareUrgency(a: FilterItem, b: FilterItem): number {
  if (STATUS_RANK[a.info.status] !== STATUS_RANK[b.info.status]) {
    return STATUS_RANK[a.info.status] - STATUS_RANK[b.info.status];
  }
  if (a.info.status === 'overdue') return b.info.overdueMs - a.info.overdueMs;
  return a.info.remainingMs - b.info.remainingMs;
}

export function annualCost(filter: Pick<Filter, 'cost' | 'lifespanDays'>): number {
  if (!filter.cost) return 0;
  return (filter.cost * 365) / filter.lifespanDays;
}

export function uid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `f_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}
