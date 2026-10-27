import type { FilterItem } from '../lib/filters';
import { annualCost, formatCurrency } from '../lib/filters';
import { PageTitle } from '../components/PageTitle';
import { EmptyState } from '../components/EmptyState';
import { FilterCard } from '../components/FilterCard';
import { Lock, Search, X } from '../components/Icons';

/** Search appears once the list is long enough to need it. */
const SEARCH_THRESHOLD = 6;

interface FiltersPageProps {
  items: FilterItem[];
  visibleItems: FilterItem[];
  now: number;
  query: string;
  onQueryChange: (value: string) => void;
  onAdd: () => void;
  onOpen: (id: string) => void;
  onReplace: (id: string) => void;
  onShowTutorial: () => void;
}

function endOfMonth(now: number): Date {
  const date = new Date(now);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function summary(items: FilterItem[], thisMonth: number, annualSpend: number): string {
  const parts = [`${items.length} ${items.length === 1 ? 'task' : 'tasks'}`];
  parts.push(thisMonth === 0 ? 'nothing due this month' : `${thisMonth} due this month`);
  if (annualSpend > 0) parts.push(`${formatCurrency(Math.round(annualSpend))} a year`);
  return parts.join(' · ');
}

export function FiltersPage({
  items,
  visibleItems,
  now,
  query,
  onQueryChange,
  onAdd,
  onOpen,
  onReplace,
  onShowTutorial,
}: FiltersPageProps) {
  const hasFilters = items.length > 0;
  const monthEnd = endOfMonth(now).getTime();
  const dueThisMonth = (item: FilterItem) =>
    item.info.status === 'overdue' || item.info.dueDate.getTime() <= monthEnd;
  const annualSpend = items.reduce((sum, item) => sum + annualCost(item.filter), 0);
  const thisMonth = visibleItems.filter(dueThisMonth);
  const later = visibleItems.filter((item) => !dueThisMonth(item));
  const featuredId = visibleItems[0]?.filter.id;
  const overdueCount = thisMonth.filter((item) => item.info.status === 'overdue').length;

  const halves = [
    {
      key: 'month',
      label: 'This month',
      count: overdueCount > 0 ? `${thisMonth.length} · ${overdueCount} overdue` : String(thisMonth.length),
      items: thisMonth,
    },
    { key: 'later', label: 'Later', count: String(later.length), items: later },
  ].filter((half) => half.items.length > 0);

  return (
    <div className="page">
      <PageTitle
        subtitle={hasFilters ? summary(items, items.filter(dueThisMonth).length, annualSpend) : undefined}
      />

      {hasFilters && (
        <>
          {items.length >= SEARCH_THRESHOLD && (
            <div className="search-bar">
              <Search size={17} />
              <input
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search tasks or rooms"
                aria-label="Search tasks"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button type="button" className="search-clear" onClick={() => onQueryChange('')} aria-label="Clear search">
                  <X size={13} />
                </button>
              )}
            </div>
          )}

          {halves.map((half) => (
            <section className="task-half" key={half.key} aria-label={half.label}>
              <div className="half-head">
                <h2>{half.label}</h2>
                <span>{half.count}</span>
              </div>
              <div className="task-group">
                {half.items.map(({ filter, info }) => (
                  <FilterCard
                    key={filter.id}
                    filter={filter}
                    info={info}
                    now={now}
                    featured={filter.id === featuredId}
                    onOpen={() => onOpen(filter.id)}
                    onReplace={() => onReplace(filter.id)}
                  />
                ))}
              </div>
            </section>
          ))}

          {visibleItems.length === 0 && (
            <div className="no-results">
              <h2>No tasks match “{query.trim()}”</h2>
              <button type="button" className="button button-secondary" onClick={() => onQueryChange('')}>
                Clear search
              </button>
            </div>
          )}

          <p className="local-note">
            <Lock size={12} />
            Swipe a task left to mark it done. Stored only on this device.
          </p>
        </>
      )}

      {!hasFilters && (
        <EmptyState
          art={
            <span className="empty-calendar" aria-hidden="true">
              <span className="empty-calendar-band" />
              <span className="empty-calendar-day">1</span>
            </span>
          }
          title="Nothing to track yet"
          body="Add the jobs your home needs, like filters, cleaning and gutters, and Replacely counts down to each one."
          primaryLabel="Add your first task"
          onPrimary={onAdd}
          secondaryLabel="See how Replacely works"
          onSecondary={onShowTutorial}
        />
      )}
    </div>
  );
}
