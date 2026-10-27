import { useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent } from 'react';
import type { Filter } from '../types';
import { countdownParts, type FilterInfo } from '../lib/filters';
import { Countdown } from './Countdown';
import { DayStrip } from './DayStrip';
import { Check } from './Icons';

const ACTION_WIDTH = 88;

interface FilterCardProps {
  filter: Filter;
  info: FilterInfo;
  now: number;
  /** The most urgent job: shows its run as crossed-off calendar days. */
  featured?: boolean;
  onOpen: () => void;
  onReplace: () => void;
}

export function FilterCard({ filter, info, now, featured = false, onOpen, onReplace }: FilterCardProps) {
  const [open, setOpen] = useState(false);
  const [dragX, setDragX] = useState<number | null>(null);
  const start = useRef<{ x: number; y: number; base: number; horizontal: boolean | null } | null>(null);
  const moved = useRef(false);
  const dragging = useRef(false);

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    start.current = { x: event.clientX, y: event.clientY, base: open ? -ACTION_WIDTH : 0, horizontal: null };
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
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

  function endDrag(event: PointerEvent<HTMLButtonElement>) {
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

  function handleClick() {
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
    <div className={`swipe-shell ${open ? 'is-open' : ''} ${open || dragX !== null ? 'is-revealed' : ''}`}>
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
        <Check size={21} />
        <span>Done</span>
      </button>

      <button
        type="button"
        className={`task-row status-${info.status} ${featured ? 'is-featured' : ''}`}
        style={swipeStyle}
        aria-label={`${filter.name}, ${filter.location}, ${countdownParts(info).label}`}
        onClick={handleClick}
        onClickCapture={handleClickCapture}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span className="task-row-line">
          <span className="task-row-copy">
            <span className="task-row-name">{filter.name}</span>
            <span className="task-row-location">{filter.location}</span>
          </span>
          <Countdown info={info} />
        </span>
        {featured && <DayStrip filter={filter} now={now} />}
      </button>
    </div>
  );
}
