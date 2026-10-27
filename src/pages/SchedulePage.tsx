import type { FilterItem } from '../lib/filters';
import { compareUrgency } from '../lib/filters';
import { Countdown } from '../components/Countdown';
import { PageTitle } from '../components/PageTitle';
import { EmptyState } from '../components/EmptyState';

interface SchedulePageProps {
  items: FilterItem[];
  onOpen: (id: string) => void;
  onAdd: () => void;
  onShowTutorial: () => void;
}

interface Group {
  key: string;
  label: string;
  tone?: 'overdue';
  items: FilterItem[];
}

export function SchedulePage({ items, onOpen, onAdd, onShowTutorial }: SchedulePageProps) {
  if (items.length === 0) {
    return (
      <div className="page">
        <PageTitle subtitle="Everything coming up, in order." />
        <EmptyState
          title="Nothing scheduled yet"
          body="Once you add a task, its due date appears here — grouped by when it’s due."
          primaryLabel="Add a task"
          onPrimary={onAdd}
          secondaryLabel="How Replacely works"
          onSecondary={onShowTutorial}
          compact
        />
      </div>
    );
  }

  const overdue = items.filter((item) => item.info.status === 'overdue').sort(compareUrgency);
  const week = items
    .filter((item) => item.info.status !== 'overdue' && item.info.daysLeft <= 7)
    .sort(compareUrgency);
  const month = items
    .filter((item) => item.info.status !== 'overdue' && item.info.daysLeft > 7 && item.info.daysLeft <= 30)
    .sort(compareUrgency);
  const later = items
    .filter((item) => item.info.status !== 'overdue' && item.info.daysLeft > 30)
    .sort(compareUrgency);

  const groups: Group[] = [
    { key: 'overdue', label: 'Overdue', tone: 'overdue' as const, items: overdue },
    { key: 'week', label: 'This week', items: week },
    { key: 'month', label: 'Next 30 days', items: month },
    { key: 'later', label: 'Later', items: later },
  ].filter((group) => group.items.length > 0);

  const attention = items.filter((item) => item.info.status !== 'healthy').length;

  return (
    <div className="page">
      <PageTitle
        subtitle={
          attention > 0
            ? `${items.length} ${items.length === 1 ? 'task' : 'tasks'} · ${attention === 1 ? '1 needs' : `${attention} need`} attention`
            : `${items.length} ${items.length === 1 ? 'task' : 'tasks'} · all on schedule`
        }
      />

      {groups.map((group) => (
        <section className="schedule-section" key={group.key}>
          <div className={`section-label ${group.tone === 'overdue' ? 'is-overdue' : ''}`}>
            <span>{group.label}</span>
            <span>{group.items.length}</span>
          </div>
          <div className="inset-group">
            {group.items.map(({ filter, info }) => {
              return (
                <button
                  key={filter.id}
                  type="button"
                  className="schedule-row"
                  onClick={() => onOpen(filter.id)}
                >
                  <span className="schedule-main">
                    <span className="schedule-name">{filter.name}</span>
                    <span className="schedule-location">{filter.location}</span>
                  </span>
                  <Countdown info={info} />
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <p className="local-note">Due dates move forward when you mark a task done.</p>
    </div>
  );
}
