import { useRef, useState, type FormEvent } from 'react';
import type { Filter, FilterDraft } from '../types';
import { CATEGORY_META, CATEGORY_ORDER, FILTER_TYPES, findType } from '../data/filterTypes';
import { addDays, formatDate, formatLifespan, parseDateInput, toDateInput } from '../lib/filters';
import { Sheet } from './Sheet';
import { Calendar, ChevronDown } from './Icons';

const FORM_ID = 'filter-editor-form';
const LIFESPAN_CHIPS = [
  { days: 30, label: '1 mo' },
  { days: 60, label: '2 mo' },
  { days: 90, label: '3 mo' },
  { days: 180, label: '6 mo' },
  { days: 365, label: '1 yr' },
  { days: 730, label: '2 yr' },
];

interface FilterFormProps {
  initial: Filter | null;
  locations: string[];
  onClose: () => void;
  onSave: (draft: FilterDraft) => void;
}

export function FilterForm({ initial, locations, onClose, onSave }: FilterFormProps) {
  const initialType = findType(initial?.typeId ?? 'custom');
  const [name, setName] = useState(initial?.name ?? '');
  const [typeId, setTypeId] = useState(initial?.typeId ?? initialType.id);
  const [location, setLocation] = useState(initial?.location ?? '');
  const [installedAt, setInstalledAt] = useState(initial?.installedAt ?? toDateInput());
  const [lifespan, setLifespan] = useState(String(initial?.lifespanDays ?? initialType.lifespanDays));
  const [cost, setCost] = useState(initial?.cost != null ? String(initial.cost) : String(initialType.cost));
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lifespanTouched, setLifespanTouched] = useState(Boolean(initial));
  const [costTouched, setCostTouched] = useState(Boolean(initial));
  const formRef = useRef<HTMLFormElement>(null);

  const type = findType(typeId);
  const today = toDateInput();
  const lifespanNumber = Math.round(Number(lifespan));
  const costNumber = cost.trim() === '' ? undefined : Number(cost);
  const previewDue =
    installedAt && Number.isFinite(lifespanNumber) && lifespanNumber > 0
      ? addDays(parseDateInput(installedAt), lifespanNumber)
      : null;

  function changeType(nextId: string) {
    const next = findType(nextId);
    setTypeId(nextId);
    if (!lifespanTouched) setLifespan(String(next.lifespanDays));
    if (!costTouched) setCost(String(next.cost));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!name.trim()) nextErrors.name = 'Give this task a name.';
    if (!location.trim()) nextErrors.location = 'Add the room or spot where it lives.';
    if (!Number.isFinite(lifespanNumber) || lifespanNumber < 1 || lifespanNumber > 3650) {
      nextErrors.lifespan = 'Use a lifespan between 1 and 3,650 days.';
    }
    if (!installedAt) {
      nextErrors.installedAt = 'Pick the install date.';
    } else if (installedAt > today) {
      nextErrors.installedAt = 'Install date can’t be in the future.';
    }
    if (costNumber !== undefined && (!Number.isFinite(costNumber) || costNumber < 0)) {
      nextErrors.cost = 'Enter a cost of zero or more.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => {
        formRef.current?.querySelector('.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }

    onSave({
      name: name.trim(),
      typeId,
      location: location.trim(),
      installedAt,
      lifespanDays: lifespanNumber,
      cost: costNumber,
      notes: notes.trim() || undefined,
    });
  }

  return (
    <Sheet
      title={initial ? 'Edit task' : 'New task'}
      onClose={onClose}
      tall
      elevated
      leading={
        <button type="button" className="sheet-action" onClick={onClose}>
          Cancel
        </button>
      }
      trailing={
        <button type="submit" form={FORM_ID} className="sheet-action is-strong">
          {initial ? 'Save' : 'Add'}
        </button>
      }
    >
      <form id={FORM_ID} ref={formRef} onSubmit={handleSubmit} noValidate>
        <section className="form-section">
          <p className="form-section-label">The task</p>
          <div className="form-group">
            <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
              <label className="form-label" htmlFor="filter-name">
                Name
              </label>
              <input
                id="filter-name"
                className="form-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Clean the toilets"
                aria-invalid={Boolean(errors.name)}
                autoComplete="off"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="filter-type">
                Type
              </label>
              <span className="form-select-wrap">
                <select
                  id="filter-type"
                  className="form-input"
                  value={typeId}
                  onChange={(event) => changeType(event.target.value)}
                >
                  {CATEGORY_ORDER.map((category) => (
                    <optgroup key={category} label={CATEGORY_META[category].label}>
                      {FILTER_TYPES.filter((preset) => preset.category === category).map((preset) => (
                        <option key={preset.id} value={preset.id}>
                          {preset.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown size={16} />
              </span>
              <span className="form-hint">
                Typical interval: {formatLifespan(type.lifespanDays)} ({type.lifespanDays} days)
              </span>
            </div>

            <div className={`form-field ${errors.location ? 'has-error' : ''}`}>
              <label className="form-label" htmlFor="filter-location">
                Location
              </label>
              <input
                id="filter-location"
                className="form-input"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g. Downstairs bathroom"
                list="filter-location-options"
                aria-invalid={Boolean(errors.location)}
                autoComplete="off"
              />
              <datalist id="filter-location-options">
                {locations.map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
              {errors.location && <span className="form-error">{errors.location}</span>}
            </div>
          </div>
        </section>

        <section className="form-section">
          <p className="form-section-label">Schedule</p>
          <div className="form-group">
            <div className={`form-field ${errors.installedAt ? 'has-error' : ''}`}>
              <label className="form-label" htmlFor="filter-installed">
                Last done on
              </label>
              <input
                id="filter-installed"
                className="form-input"
                type="date"
                value={installedAt}
                max={today}
                onChange={(event) => setInstalledAt(event.target.value)}
                aria-invalid={Boolean(errors.installedAt)}
              />
              {errors.installedAt && <span className="form-error">{errors.installedAt}</span>}
            </div>

            <div className={`form-field ${errors.lifespan ? 'has-error' : ''}`}>
              <label className="form-label" htmlFor="filter-lifespan">
                Repeat every
              </label>
              <span className="form-suffix-wrap">
                <input
                  id="filter-lifespan"
                  className="form-input"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={3650}
                  value={lifespan}
                  onChange={(event) => {
                    setLifespan(event.target.value);
                    setLifespanTouched(true);
                  }}
                  aria-invalid={Boolean(errors.lifespan)}
                />
                <span className="form-suffix">days</span>
              </span>
              <div className="form-chips">
                {LIFESPAN_CHIPS.map(({ days, label }) => (
                  <button
                    key={days}
                    type="button"
                    className={`form-chip ${lifespanNumber === days ? 'is-active' : ''}`}
                    onClick={() => {
                      setLifespan(String(days));
                      setLifespanTouched(true);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {errors.lifespan && <span className="form-error">{errors.lifespan}</span>}
            </div>

            <div className={`form-field ${errors.cost ? 'has-error' : ''}`}>
              <label className="form-label" htmlFor="filter-cost">
                Cost each time <span className="form-optional">Optional</span>
              </label>
              <span className="form-prefix-wrap">
                <span className="form-prefix" aria-hidden="true">
                  $
                </span>
                <input
                  id="filter-cost"
                  className="form-input"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  value={cost}
                  onChange={(event) => {
                    setCost(event.target.value);
                    setCostTouched(true);
                  }}
                  placeholder="0"
                  aria-invalid={Boolean(errors.cost)}
                />
              </span>
              {errors.cost && <span className="form-error">{errors.cost}</span>}
              <span className="form-hint">Used for the yearly estimate in Insights.</span>
            </div>
          </div>
        </section>

        <section className="form-section">
          <p className="form-section-label">Notes</p>
          <div className="form-group">
            <div className="form-field">
              <label className="form-label" htmlFor="filter-notes">
                Size, model or a reminder <span className="form-optional">Optional</span>
              </label>
              <textarea
                id="filter-notes"
                className="form-input form-textarea"
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="e.g. Every third Sunday. Spares live under the sink."
              />
            </div>
          </div>
        </section>

        {previewDue && (
          <div className="form-preview">
            <span className="form-preview-icon">
              <Calendar size={18} />
            </span>
            <span className="form-preview-copy">
              <span className="form-preview-label">Next due</span>
              <span className="form-preview-date">{formatDate(toDateInput(previewDue))}</span>
            </span>
            <span className="form-preview-pill">{formatLifespan(lifespanNumber)}</span>
          </div>
        )}
      </form>
    </Sheet>
  );
}
