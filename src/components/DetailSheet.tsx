import type { Filter } from '../types';
import { findType } from '../data/filterTypes';
import { annualCost, daysBetween, formatCurrency, formatDate, formatLifespan, getFilterInfo } from '../lib/filters';
import { Countdown } from './Countdown';
import { Sheet } from './Sheet';
import { CategoryIcon, MapPin, RefreshCw, Trash2 } from './Icons';

const STATUS_LABEL = {
  healthy: 'Healthy',
  due: 'Due soon',
  overdue: 'Overdue',
} as const;

interface DetailSheetProps {
  filter: Filter;
  now: number;
  onClose: () => void;
  onEdit: () => void;
  onReplace: () => void;
  onDelete: () => void;
}

export function DetailSheet({ filter, now, onClose, onEdit, onReplace, onDelete }: DetailSheetProps) {
  const type = findType(filter.typeId);
  const info = getFilterInfo(filter, now);
  const overdue = info.status === 'overdue';
  const runCost = annualCost(filter);
  const history = [...filter.history].sort((a, b) => b.replacedAt.localeCompare(a.replacedAt));

  return (
    <Sheet
      title="Task"
      onClose={onClose}
      tall
      leading={
        <button type="button" className="sheet-action" onClick={onClose}>
          Close
        </button>
      }
      trailing={
        <button type="button" className="sheet-action is-strong" onClick={onEdit}>
          Edit
        </button>
      }
      footer={
        <div className="detail-actions">
          <button type="button" className="button button-primary button-block" onClick={onReplace}>
            <RefreshCw size={17} />
            Mark done
          </button>
          <button type="button" className="detail-delete" onClick={onDelete}>
            <Trash2 size={15} />
            Delete task
          </button>
        </div>
      }
    >
      <div className={`detail-head cat-${type.category}`}>
        <span className="category-icon is-large">
          <CategoryIcon category={type.category} size={24} />
        </span>
        <div className="detail-head-copy">
          <span className="detail-type">{type.label}</span>
          <h2>{filter.name}</h2>
          <p>
            <MapPin size={12} />
            {filter.location}
          </p>
        </div>
        <span className={`status-pill ${info.status}`}>{STATUS_LABEL[info.status]}</span>
      </div>

      <section className={`detail-countdown status-${info.status}`}>
        <span className="detail-countdown-label">
          {overdue ? 'Past due' : info.daysLeft === 0 ? 'Due today' : `${info.daysLeft} days left`}
        </span>
        <Countdown
          ms={overdue ? info.overdueMs : info.remainingMs}
          className={overdue ? 'is-overdue' : ''}
          label={`${overdue ? 'Overdue by' : 'Remaining'}: ${Math.abs(info.daysLeft)} days`}
        />
        <span className="detail-caption">{overdue ? 'past due' : 'to go'}</span>
        <div className="progress-track">
          <span className="progress-fill" style={{ width: `${Math.min(100, info.percentUsed)}%` }} />
        </div>
        <div className="detail-dates">
          <div>
            <span>Started</span>
            <strong>{formatDate(filter.installedAt)}</strong>
          </div>
          <div>
            <span>Due</span>
            <strong>{formatDate(info.dueDate)}</strong>
          </div>
          <div className="detail-percent">
            <span>Used</span>
            <strong>{Math.round(info.percentUsed)}%</strong>
          </div>
        </div>
      </section>

      <div className="detail-info">
        <div>
          <span>Repeats</span>
          <strong>
            {filter.lifespanDays} days
            <small>{formatLifespan(filter.lifespanDays)}</small>
          </strong>
        </div>
        <div>
          <span>Cost each</span>
          <strong>{filter.cost != null ? formatCurrency(filter.cost) : 'Not set'}</strong>
        </div>
        <div>
          <span>Yearly estimate</span>
          <strong>{runCost > 0 ? formatCurrency(Math.round(runCost)) : '—'}</strong>
        </div>
        <div>
          <span>Completions</span>
          <strong>
            {history.length}
            <small>logged</small>
          </strong>
        </div>
      </div>

      {filter.notes && (
        <section className="detail-section">
          <p className="section-label">Notes</p>
          <div className="detail-note-card">{filter.notes}</div>
        </section>
      )}

      <section className="detail-section">
        <div className="detail-section-head">
          <p className="section-label">Completion history</p>
          <span className="detail-history-count">{history.length}</span>
        </div>
        <div className="history-list">
          {history.length === 0 ? (
            <p className="history-empty">No completions logged yet. This is the first cycle.</p>
          ) : (
            history.map((entry) => {
              const run = daysBetween(entry.previousInstalledAt, entry.replacedAt);
              return (
                <div className="history-item" key={entry.id}>
                  <span className="history-dot" />
                  <div className="history-copy">
                    <strong>Done {formatDate(entry.replacedAt)}</strong>
                    <span>{run === 0 ? 'Last time: under a day' : `Last time: ${run} days`}</span>
                    {entry.note && <p>{entry.note}</p>}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="history-current">Started {formatDate(filter.installedAt)}</p>
      </section>
    </Sheet>
  );
}
