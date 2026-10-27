import { useState, type FormEvent } from 'react';
import type { Filter } from '../types';
import { findType } from '../data/filterTypes';
import { addDays, formatDate, formatLifespan, parseDateInput, toDateInput } from '../lib/filters';
import { Sheet } from './Sheet';
import { CategoryIcon, Check, ChevronRight, MapPin, RefreshCw } from './Icons';

const FORM_ID = 'replace-filter-form';

interface ReplaceSheetProps {
  filter: Filter;
  onCancel: () => void;
  onConfirm: (date: string, note?: string) => void;
}

export function ReplaceSheet({ filter, onCancel, onConfirm }: ReplaceSheetProps) {
  const today = toDateInput();
  const type = findType(filter.typeId);
  const [date, setDate] = useState(today);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const newDue = date ? addDays(parseDateInput(date), filter.lifespanDays) : null;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!date) {
      setError('Pick the replacement date.');
      return;
    }
    if (date > today) {
      setError('The replacement date can’t be in the future.');
      return;
    }
    if (date < filter.installedAt) {
      setError('That’s before this filter was installed.');
      return;
    }
    onConfirm(date, note.trim() || undefined);
  }

  return (
    <Sheet
      title="Replace filter"
      onClose={onCancel}
      elevated
      footer={
        <button type="submit" form={FORM_ID} className="button button-primary button-block">
          <RefreshCw size={17} />
          Reset countdown
        </button>
      }
    >
      <form id={FORM_ID} onSubmit={handleSubmit} noValidate>
        <div className="replace-summary">
          <span className={`category-icon cat-${type.category}`}>
            <CategoryIcon category={type.category} size={19} />
          </span>
          <div className="replace-summary-copy">
            <strong>{filter.name}</strong>
            <span>
              <MapPin size={12} />
              {filter.location}
            </span>
          </div>
          <span className="replace-checks">
            <Check size={16} />
          </span>
        </div>

        <div className="form-group replace-group">
          <div className="form-field">
            <label className="form-label" htmlFor="replace-date">
              Replaced on
            </label>
            <input
              id="replace-date"
              className="form-input"
              type="date"
              value={date}
              min={filter.installedAt}
              max={today}
              onChange={(event) => {
                setDate(event.target.value);
                setError('');
              }}
              aria-invalid={Boolean(error)}
            />
            {error && <span className="form-error">{error}</span>}
            <span className="form-hint">Installed {formatDate(filter.installedAt)}</span>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="replace-note">
              Note <span className="form-optional">Optional</span>
            </label>
            <input
              id="replace-note"
              className="form-input"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Brand, model or where the spares are"
              autoComplete="off"
            />
          </div>
        </div>

        {newDue && (
          <div className="form-preview">
            <span className="form-preview-icon">
              <RefreshCw size={18} />
            </span>
            <span className="form-preview-copy">
              <span className="form-preview-label">New countdown begins</span>
              <span className="form-preview-date">{formatDate(toDateInput(newDue))}</span>
            </span>
            <span className="form-preview-pill">{formatLifespan(filter.lifespanDays)}</span>
          </div>
        )}

        <p className="sheet-note">
          The previous filter’s run is added to the history. Your filter details stay the same.
          <ChevronRight size={13} />
        </p>
      </form>
    </Sheet>
  );
}
