import type { FilterItem } from '../lib/filters';
import { compareUrgency, formatDate } from '../lib/filters';
import { PageTitle } from '../components/PageTitle';
import { EmptyState } from '../components/EmptyState';
import { Calendar, CategoryIcon, ChevronRight, MapPin } from '../components/Icons';
import { findType } from '../data/filterTypes';

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

function whenLabel(item: FilterItem): string {
  const { info } = item;
  if (info.status === 'overdue') return `${Math.abs(info.daysLeft)}d late`;
  if (info.daysLeft === 0) return 'Today';
  if (info.daysLeft === 1) return 'Tomorrow';
  return `In ${info.daysLeft} days`;
}

export function SchedulePage({ items, onOpen, onAdd, onShowTutorial }: SchedulePageProps) {
  if (items.length === 0) {
    return (
      <div className="page">
        <PageTitle title="Schedule" subtitle="Everything coming up, in order." />
        <EmptyState
          art={
            <span className="empty-round-icon">
              <Calendar size={30} />
            </span>
          }
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
        title="Schedule"
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
              const type = findType(filter.typeId);
              return (
                <button
                  key={filter.id}
                  type="button"
                  className="schedule-row"
                  onClick={() => onOpen(filter.id)}
                >
                  <span className={`schedule-icon cat-${type.category}`}>
                    <CategoryIcon category={type.category} size={17} />
                  </span>
                  <span className="schedule-main">
                    <span className="schedule-name">{filter.name}</span>
                    <span className="schedule-location">
                      <MapPin size={11} />
                      {filter.location}
                    </span>
                  </span>
                  <span className="schedule-right">
                    <span className={`schedule-when status-text-${info.status}`}>{whenLabel({ filter, info })}</span>
                    <span className="schedule-date">{formatDate(info.dueDate)}</span>
                  </span>
                  <ChevronRight size={17} className="chevron" />
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <p className="local-note">
        <Calendar size={12} />
        Due dates update as soon as you mark a task done.
      </p>
    </div>
  );
}
