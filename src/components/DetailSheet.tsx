import type { Filter } from '../types';
import { findType } from '../data/filterTypes';
import { annualCost, daysBetween, formatCurrency, formatDate, formatLifespan, getFilterInfo } from '../lib/filters';
import { Countdown } from './Countdown';
import { DayStrip } from './DayStrip';
import { Sheet } from './Sheet';
import { CategoryIcon, Check, MapPin, Trash2 } from './Icons';

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
          <button type="button" className="button button-done button-block" onClick={onReplace}>
            <Check size={18} />
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
          <h2>{filter.name}</h2>
          <p>
            <MapPin size={12} />
            {filter.location}
          </p>
        </div>
      </div>

      <div className="list-group detail-list">
        <div className="detail-countdown-row">
          <Countdown info={info} className="is-large" />
          <DayStrip filter={filter} now={now} />
        </div>
        <div>
          <span>Last done</span>
          <strong>{formatDate(filter.installedAt)}</strong>
        </div>
        <div>
          <span>{overdue ? 'Was due' : 'Due'}</span>
          <strong>{formatDate(info.dueDate)}</strong>
        </div>
        <div>
          <span>Repeats</span>
          <strong>Every {formatLifespan(filter.lifespanDays)}</strong>
        </div>
        <div>
          <span>Cost each time</span>
          <strong>{filter.cost != null ? formatCurrency(filter.cost) : 'Not set'}</strong>
        </div>
        <div>
          <span>Yearly estimate</span>
          <strong>{runCost > 0 ? formatCurrency(Math.round(runCost)) : '—'}</strong>
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
      </section>
    </Sheet>
  );
}
