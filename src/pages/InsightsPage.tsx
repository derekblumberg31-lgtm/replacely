import type { FilterItem } from '../lib/filters';
import { annualCost, formatCurrency } from '../lib/filters';
import { CATEGORY_META, CATEGORY_ORDER, findType } from '../data/filterTypes';
import { PageTitle } from '../components/PageTitle';
import { EmptyState } from '../components/EmptyState';
import { ChartBar, ChevronRight, Wallet } from '../components/Icons';

interface InsightsPageProps {
  items: FilterItem[];
  now: number;
  onAdd: () => void;
  onOpenSettings: () => void;
}

export function InsightsPage({ items, now, onAdd, onOpenSettings }: InsightsPageProps) {
  if (items.length === 0) {
    return (
      <div className="page">
        <PageTitle title="Insights" subtitle="Costs, categories and what’s coming up." />
        <EmptyState
          art={
            <span className="empty-round-icon">
              <ChartBar size={30} />
            </span>
          }
          title="No insights yet"
          body="Add a few tasks with their costs and Replacely will estimate your yearly spend and show upcoming months."
          primaryLabel="Add a task"
          onPrimary={onAdd}
          compact
        />
      </div>
    );
  }

  const annualSpend = items.reduce((sum, item) => sum + annualCost(item.filter), 0);
  const pricedCount = items.filter((item) => item.filter.cost != null).length;
  const replacementsPerYear = items.reduce((sum, item) => sum + 365 / item.filter.lifespanDays, 0);

  const due90 = items.filter((item) => item.info.daysLeft >= 0 && item.info.daysLeft <= 90);
  const due90Cost = due90.reduce((sum, item) => sum + (item.filter.cost ?? 0), 0);

  const categories = CATEGORY_ORDER.map((category) => {
    const matching = items.filter((item) => findType(item.filter.typeId).category === category);
    return { category, label: CATEGORY_META[category].label, count: matching.length };
  }).filter((entry) => entry.count > 0);

  const current = new Date(now);
  const monthStart = new Date(current.getFullYear(), current.getMonth(), 1);
  const months = Array.from({ length: 6 }, (_, index) => {
    const start = new Date(monthStart.getFullYear(), monthStart.getMonth() + index, 1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
    const count = items.filter((item) => item.info.dueDate >= start && item.info.dueDate < end).length;
    return {
      key: `${start.getFullYear()}-${start.getMonth()}`,
      label: start.toLocaleDateString(undefined, { month: 'short' }),
      count,
    };
  });
  const maxMonth = Math.max(1, ...months.map((month) => month.count));

  return (
    <div className="page">
      <PageTitle title="Insights" subtitle="Costs, categories and what’s coming up." />

      <section className="insight-hero">
        <div className="insight-eyebrow">
          <Wallet size={14} />
          Estimated yearly spend
        </div>
        <p className="insight-big">{formatCurrency(Math.round(annualSpend))}</p>
        <p className="insight-sub">
          About {Math.max(1, Math.round(replacementsPerYear))} job
          {Math.round(replacementsPerYear) === 1 ? '' : 's'} a year across {items.length}{' '}
          {items.length === 1 ? 'task' : 'tasks'}.
        </p>
        <p className="insight-foot">
          {pricedCount === items.length
            ? 'Based on the cost entered for each task. Actual prices vary.'
            : pricedCount === 0
              ? 'Add costs to see a spend estimate.'
              : `Based on ${pricedCount} of ${items.length} tasks with a cost entered.`}
        </p>
      </section>

      <div className="insight-grid-2">
        <div className="insight-tile">
          <span className="insight-tile-label">Next 90 days</span>
          <span className="insight-tile-value">{formatCurrency(Math.round(due90Cost))}</span>
          <span className="insight-tile-note">
            {due90.length} task{due90.length === 1 ? '' : 's'} coming up
          </span>
        </div>
        <div className="insight-tile">
          <span className="insight-tile-label">Per year</span>
          <span className="insight-tile-value">{Math.max(1, Math.round(replacementsPerYear))}</span>
          <span className="insight-tile-note">tasks to plan for</span>
        </div>
      </div>

      <section className="insight-card">
        <div className="insight-card-head">
          <h2>By category</h2>
          <span>
            {items.length} {items.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>
        <div className="category-list">
          {categories.map(({ category, label, count }) => (
            <div className={`category-row cat-${category}`} key={category}>
              <span className="category-dot" />
              <span className="category-label">{label}</span>
              <span className="category-bar">
                <span style={{ width: `${Math.max(6, Math.round((count / items.length) * 100))}%` }} />
              </span>
              <span className="category-count">{count}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="insight-card">
        <div className="insight-card-head">
          <h2>Next 6 months</h2>
          <span>tasks</span>
        </div>
        <div className="months-chart">
          {months.map((month) => (
            <div className="month-column" key={month.key}>
              <span className="month-count">{month.count > 0 ? month.count : ''}</span>
              <span className="month-track">
                <span
                  className={`month-bar ${month.count === 0 ? 'is-empty' : ''}`}
                  style={{ height: `${month.count === 0 ? 4 : Math.max(16, Math.round((month.count / maxMonth) * 100))}%` }}
                />
              </span>
              <span className="month-label">{month.label}</span>
            </div>
          ))}
        </div>
        <p className="insight-foot">Based on the due dates in this app.</p>
      </section>

      <button type="button" className="insight-link-row" onClick={onOpenSettings}>
        <span>Backups and reminders live in Settings</span>
        <ChevronRight size={16} />
      </button>

    </div>
  );
}
