import type { FilterTab } from '../types';
import type { FilterItem } from '../lib/filters';
import { annualCost, formatCurrency, formatDate } from '../lib/filters';
import { PageTitle } from '../components/PageTitle';
import { EmptyState } from '../components/EmptyState';
import { FilterCard } from '../components/FilterCard';
import { Countdown } from '../components/Countdown';
import {
  AlertTriangle,
  Calendar,
  ChevronRight,
  Lock,
  MapPin,
  Search,
  Wallet,
  Wind,
  X,
} from '../components/Icons';

interface FiltersPageProps {
  items: FilterItem[];
  visibleItems: FilterItem[];
  next: FilterItem | null;
  counts: { all: number; healthy: number; due: number; overdue: number };
  now: number;
  query: string;
  onQueryChange: (value: string) => void;
  filterTab: FilterTab;
  onFilterTabChange: (tab: FilterTab) => void;
  onAdd: () => void;
  onOpen: (id: string) => void;
  onReplace: (id: string) => void;
  onShowTutorial: () => void;
}

function attentionText(count: number): string {
  if (count === 0) return 'everything is on schedule';
  return count === 1 ? '1 needs attention' : `${count} need attention`;
}

export function FiltersPage({
  items,
  visibleItems,
  next,
  counts,
  now,
  query,
  onQueryChange,
  filterTab,
  onFilterTabChange,
  onAdd,
  onOpen,
  onReplace,
  onShowTutorial,
}: FiltersPageProps) {
  const attention = counts.due + counts.overdue;
  const annualSpend = items.reduce((sum, item) => sum + annualCost(item.filter), 0);
  const hasFilters = items.length > 0;
  const overdue = next?.info.status === 'overdue';
  const heading = filterTab === 'all' ? 'All tasks' : filterTab === 'due' ? 'Due soon' : 'Overdue';

  return (
    <div className="page">
      <PageTitle
        title="Tasks"
        subtitle={hasFilters ? `${items.length} tracked · ${attentionText(attention)}` : 'Everything your home needs, on a schedule.'}
      />

      {hasFilters && (
        <>
          {next && (
            <button
              type="button"
              className="next-card"
              onClick={() => onOpen(next.filter.id)}
              aria-label={`${overdue ? 'Overdue' : 'Next due'}: ${next.filter.name}`}
            >
              <span className="next-glow" aria-hidden="true" />
              <span className="next-top">
                <span>{overdue ? 'Past due' : 'Next due'}</span>
                <span className={`next-status ${overdue ? 'overdue' : ''}`}>
                  {overdue ? 'Overdue' : next.info.status === 'due' ? 'Due soon' : 'On track'}
                </span>
              </span>
              <span className={`next-countdown ${overdue ? 'is-overdue' : ''}`}>
                <Countdown
                  ms={overdue ? next.info.overdueMs : next.info.remainingMs}
                  label={`${overdue ? 'Overdue by' : 'Next due in'} ${Math.abs(next.info.daysLeft)} days`}
                />
              </span>
              <span className="next-name">{next.filter.name}</span>
              <span className="next-location">
                <MapPin size={13} />
                {next.filter.location}
              </span>
              <span className="next-foot">
                <span>{overdue ? 'Was due' : 'Due'} {formatDate(next.info.dueDate)}</span>
                <span className="next-link">
                  View details
                  <ChevronRight size={15} />
                </span>
              </span>
            </button>
          )}

          <div className="metric-grid">
            <div className={`metric-card ${counts.due > 0 ? 'is-due' : ''}`}>
              <span className="metric-icon">
                <Calendar size={16} />
              </span>
              <span className="metric-value">{counts.due}</span>
              <span className="metric-label">Due soon</span>
            </div>
            <div className={`metric-card ${counts.overdue > 0 ? 'is-overdue' : ''}`}>
              <span className="metric-icon">
                <AlertTriangle size={16} />
              </span>
              <span className="metric-value">{counts.overdue}</span>
              <span className="metric-label">Overdue</span>
            </div>
            <div className="metric-card">
              <span className="metric-icon">
                <Wallet size={16} />
              </span>
              <span className="metric-value metric-money">{formatCurrency(Math.round(annualSpend))}</span>
              <span className="metric-label">Per year</span>
            </div>
          </div>

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

          <div className="segmented" role="group" aria-label="Filter by status">
            {(
              [
                ['all', 'All'],
                ['due', 'Due soon'],
                ['overdue', 'Overdue'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={filterTab === key}
                className={filterTab === key ? 'is-active' : ''}
                onClick={() => onFilterTabChange(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="list-head">
            <span>
              {heading} · {visibleItems.length}
            </span>
            <span className="list-hint">Swipe to mark done</span>
          </div>

          {visibleItems.length > 0 ? (
            <div className="filter-list">
              {visibleItems.map(({ filter, info }) => (
                <FilterCard
                  key={filter.id}
                  filter={filter}
                  info={info}
                  now={now}
                  onOpen={() => onOpen(filter.id)}
                  onReplace={() => onReplace(filter.id)}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <span className="no-results-icon">
                <Search size={22} />
              </span>
              <h2>No tasks match</h2>
              <p>Try another search or status.</p>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => {
                  onQueryChange('');
                  onFilterTabChange('all');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      )}

      {!hasFilters && (
        <EmptyState
          art={
            <div className="empty-filter-art">
              <span className="empty-art-icon">
                <Wind size={28} />
              </span>
              <span className="empty-art-timer">90d</span>
              <span className="empty-art-bar">
                <i />
              </span>
            </div>
          }
          title="Nothing to track yet"
          body="Add the jobs your home needs — filters, cleaning, gutters — and Replacely will count down to each one."
          primaryLabel="Add your first task"
          onPrimary={onAdd}
          secondaryLabel="See how Replacely works"
          onSecondary={onShowTutorial}
        />
      )}

      {hasFilters && (
        <p className="local-note">
          <Lock size={12} />
          Stored privately on this device. Export a backup in Settings.
        </p>
      )}
    </div>
  );
}
