import { useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent } from 'react';
import type { Filter } from '../types';
import { findType } from '../data/filterTypes';
import { formatDate, splitDuration, type FilterInfo } from '../lib/filters';
import { Countdown } from './Countdown';
import { CategoryIcon, ChevronRight, MapPin, RefreshCw } from './Icons';

const STATUS_LABEL = {
  healthy: 'Healthy',
  due: 'Due soon',
  overdue: 'Overdue',
} as const;

const ACTION_WIDTH = 88;

interface FilterCardProps {
  filter: Filter;
  info: FilterInfo;
  now: number;
  onOpen: () => void;
  onReplace: () => void;
}

export function FilterCard({ filter, info, now, onOpen, onReplace }: FilterCardProps) {
  const type = findType(filter.typeId);
  const overdue = info.status === 'overdue';
  const [open, setOpen] = useState(false);
  const [dragX, setDragX] = useState<number | null>(null);
  const start = useRef<{ x: number; y: number; base: number; horizontal: boolean | null } | null>(null);
  const moved = useRef(false);
  const dragging = useRef(false);

  const dueLabel =
    info.dueDate.getFullYear() === new Date(now).getFullYear()
      ? info.dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      : formatDate(info.dueDate);

  const duration = overdue ? info.overdueMs : info.remainingMs;
  const parts = splitDuration(duration);
  const caption = overdue ? 'past due' : info.daysLeft === 0 ? 'left today' : 'until replacement';

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if ((event.target as HTMLElement).closest('button')) return;
    start.current = { x: event.clientX, y: event.clientY, base: open ? -ACTION_WIDTH : 0, horizontal: null };
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging.current || !start.current) return;
    const dx = event.clientX - start.current.x;
    const dy = event.clientY - start.current.y;

    if (start.current.horizontal === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      start.current.horizontal = Math.abs(dx) > Math.abs(dy);
    }
    if (!start.current.horizontal) return;

    if (Math.abs(dx) > 8) moved.current = true;
    setDragX(Math.max(-ACTION_WIDTH, Math.min(0, start.current.base + dx)));
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const value = dragX ?? (open ? -ACTION_WIDTH : 0);
    dragging.current = false;
    start.current = null;
    setOpen(value < -ACTION_WIDTH / 2);
    setDragX(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    window.setTimeout(() => {
      moved.current = false;
    }, 0);
  }

  function handleClickCapture(event: MouseEvent) {
    if (!moved.current) return;
    event.preventDefault();
    event.stopPropagation();
    moved.current = false;
  }

  function handleCardClick() {
    if (open) {
      setOpen(false);
      return;
    }
    onOpen();
  }

  const offset = dragX ?? (open ? -ACTION_WIDTH : 0);
  const swipeStyle: CSSProperties = {
    transform: `translateX(${offset}px)`,
    transition: dragX === null ? undefined : 'none',
  };

  return (
    <div className={`swipe-shell ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="swipe-action"
        tabIndex={open ? 0 : -1}
        aria-hidden={!open}
        onClick={() => {
          setOpen(false);
          onReplace();
        }}
      >
        <RefreshCw size={21} />
        <span>Replace</span>
      </button>

      <article
        className={`filter-card status-${info.status} cat-${type.category}`}
        style={swipeStyle}
        onClick={handleCardClick}
        onClickCapture={handleClickCapture}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="card-top">
          <span className="category-icon">
            <CategoryIcon category={type.category} size={20} />
          </span>
          <div className="card-heading">
            <p className="card-type">{type.label}</p>
            <h3 className="card-name">{filter.name}</h3>
          </div>
          <span className={`status-pill ${info.status}`}>{STATUS_LABEL[info.status]}</span>
        </div>

        <p className="card-location">
          <MapPin size={14} />
          <span>{filter.location}</span>
        </p>

        <div className="card-countdown-row">
          <Countdown
            ms={duration}
            label={
              overdue
                ? `Overdue by ${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes`
                : `${STATUS_LABEL[info.status]}: ${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes remaining`
            }
          />
          <span className="card-caption">{caption}</span>
        </div>

        <div className="progress-track" aria-hidden="true">
          <span className="progress-fill" style={{ width: `${Math.min(100, info.percentUsed)}%` }} />
        </div>
        <div className="card-meta">
          <span>{Math.round(info.percentUsed)}% used</span>
          <span>Due {dueLabel}</span>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="card-replace-button"
            onClick={(event) => {
              event.stopPropagation();
              onReplace();
            }}
          >
            <RefreshCw size={15} />
            Replace
          </button>
          <button
            type="button"
            className="card-details-button"
            onClick={(event) => {
              event.stopPropagation();
              onOpen();
            }}
          >
            Details
            <ChevronRight size={16} />
          </button>
        </div>
      </article>
    </div>
  );
}
