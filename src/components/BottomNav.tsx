import type { TabKey } from '../types';
import { Calendar, ChartBar, ListFilter, Settings } from './Icons';

interface BottomNavProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  dueCount: number;
  overdueCount: number;
}

const TABS: { key: TabKey; label: string; Icon: typeof ListFilter }[] = [
  { key: 'filters', label: 'Filters', Icon: ListFilter },
  { key: 'schedule', label: 'Schedule', Icon: Calendar },
  { key: 'insights', label: 'Insights', Icon: ChartBar },
  { key: 'settings', label: 'Settings', Icon: Settings },
];

export function BottomNav({ active, onChange, dueCount, overdueCount }: BottomNavProps) {
  return (
    <nav className="tab-bar" aria-label="Main navigation">
      {TABS.map(({ key, label, Icon }) => {
        const isActive = active === key;
        const showOverdue = key === 'filters' && overdueCount > 0;
        const showDue = key === 'filters' && overdueCount === 0 && dueCount > 0;

        return (
          <button
            key={key}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            className={`tab-item ${isActive ? 'is-active' : ''}`}
            aria-label={
              showOverdue
                ? `${label}, ${overdueCount} overdue`
                : showDue
                  ? `${label}, ${dueCount} due soon`
                  : undefined
            }
            onClick={() => onChange(key)}
          >
            <span className="tab-glyph">
              <Icon size={24} />
              {showOverdue && <span className="tab-badge" aria-hidden="true">{overdueCount > 99 ? '99+' : overdueCount}</span>}
              {showDue && <span className="tab-badge is-dot is-due" aria-hidden="true" />}
            </span>
            <span className="tab-label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
