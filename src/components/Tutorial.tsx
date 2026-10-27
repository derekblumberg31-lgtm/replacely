import { useRef, useState, type PointerEvent } from 'react';
import { toDateInput } from '../lib/filters';
import { DayStrip } from './DayStrip';
import { Check, ChevronDown, ChevronRight, RefreshCw, Share } from './Icons';

interface TutorialProps {
  installed: boolean;
  onClose: () => void;
}

const SLIDES = [
  {
    title: 'Every chore, one countdown.',
    body: 'Add the jobs your home needs, like filters, cleaning, gutters and safety checks, and Replacely counts down to each one.',
  },
  {
    title: 'Set it once, in seconds.',
    body: 'Pick what it is and where it is, then tighten or loosen the interval. Replacely handles the date math.',
  },
  {
    title: 'Mark it done. Reset it.',
    body: 'When the job is done, mark it done. The countdown starts again and that run is saved in its history.',
  },
  {
    title: 'Keep it on your Home Screen.',
    body: 'Open Replacely in Safari, tap Share, then Add to Home Screen. Installed from an HTTPS address, it keeps working offline.',
  },
];

function TutorialArt({ step, installed }: { step: number; installed: boolean }) {
  if (step === 0) {
    const day = 86_400_000;
    const sample = { installedAt: toDateInput(new Date(Date.now() - 18 * day)), lifespanDays: 21 };
    return (
      <div className="tut-art-inner tut-art-countdown">
        <div className="task-group tut-list" aria-hidden="true">
          <div className="task-row is-featured">
            <span className="task-row-line">
              <span className="task-row-copy">
                <span className="task-row-name">Mop hard floors</span>
                <span className="task-row-location">Kitchen</span>
              </span>
              <span className="countdown">
                <span className="countdown-number">3</span>
                <span className="countdown-unit">days</span>
              </span>
            </span>
            <DayStrip filter={sample} now={Date.now()} />
          </div>
          <div className="task-row tut-list-row">
            <span className="task-row-line">
              <span className="task-row-copy">
                <span className="task-row-name">Clean the gutters</span>
                <span className="task-row-location">Front and back</span>
              </span>
              <span className="countdown">
                <span className="countdown-number">4</span>
                <span className="countdown-unit">months</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="tut-art-inner">
        <div className="tut-form-card">
          <div className="tut-form-row">
            <span>Type</span>
            <strong>Air purifier HEPA</strong>
            <ChevronDown size={14} />
          </div>
          <div className="tut-form-row">
            <span>Location</span>
            <strong>Upstairs bedroom</strong>
          </div>
          <div className="tut-form-row">
            <span>Repeats</span>
            <strong>365 days</strong>
          </div>
          <div className="tut-form-chips">
            <span className="is-active">90d</span>
            <span>180d</span>
            <span>365d</span>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="tut-art-inner">
        <span className="tut-refresh">
          <RefreshCw size={34} />
        </span>
        <div className="tut-history-card">
          <div className="tut-history-row">
            <span className="tut-history-dot" />
            <div>
              <strong>Done today</strong>
              <span>Last time: 90 days</span>
            </div>
          </div>
          <div className="tut-history-row">
            <span className="tut-history-dot is-muted" />
            <div>
              <strong>Done Jul 21</strong>
              <span>Last time: 90 days</span>
            </div>
          </div>
          <div className="tut-history-current">Started today</div>
        </div>
      </div>
    );
  }

  return (
    <div className="tut-art-inner">
      <div className="tut-home">
        <div className="tut-home-row">
          <span className="tut-home-app is-muted" />
          <span className="tut-home-app is-muted" />
          <span className="tut-home-app is-muted" />
        </div>
        <div className="tut-home-row">
          <span className="tut-app-wrap">
            <img className="tut-app-icon" src={`${import.meta.env.BASE_URL}icons/icon-192.png`} alt="" />
            <span className="tut-home-label">Replacely</span>
          </span>
          <span className="tut-home-app is-muted" />
          <span className="tut-home-app is-muted" />
        </div>
      </div>
      <div className="tut-install-pill">
        {installed ? <Check size={16} /> : <Share size={16} />}
        {installed ? 'Already installed' : 'Add to Home Screen'}
      </div>
    </div>
  );
}

export function Tutorial({ installed, onClose }: TutorialProps) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ x: number; y: number; horizontal: boolean | null } | null>(null);
  const lastIndex = SLIDES.length - 1;

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    start.current = { x: event.clientX, y: event.clientY, horizontal: null };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!start.current) return;
    const dx = event.clientX - start.current.x;
    const dy = event.clientY - start.current.y;
    if (start.current.horizontal === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      start.current.horizontal = Math.abs(dx) > Math.abs(dy);
    }
    if (!start.current.horizontal) return;
    const atEdge = (index === 0 && dx > 0) || (index === lastIndex && dx < 0);
    setDrag(atEdge ? dx * 0.28 : Math.max(-120, Math.min(120, dx)));
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (!start.current) return;
    if (drag < -48 && index < lastIndex) setIndex(index + 1);
    else if (drag > 48 && index > 0) setIndex(index - 1);
    setDrag(0);
    setDragging(false);
    start.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div className="tutorial" role="dialog" aria-modal="true" aria-label="How Replacely works">
      <div className="tutorial-top">
        <div className="tutorial-brand">
          <img className="tutorial-mark" src={`${import.meta.env.BASE_URL}icons/icon-192.png`} alt="" />
          Replacely guide
        </div>
        <button type="button" className="tutorial-skip" onClick={onClose}>
          Skip
        </button>
      </div>

      <div
        className={`tutorial-viewport ${dragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="tutorial-track"
          style={{ transform: `translate3d(calc(${-index * 100}% + ${drag}px), 0, 0)` }}
        >
          {SLIDES.map((slide, slideIndex) => (
            <section
              className="tutorial-slide"
              key={slide.title}
              aria-hidden={slideIndex !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${SLIDES.length}`}
            >
              <div className="tutorial-art">
                <TutorialArt step={slideIndex} installed={installed} />
              </div>
              <div className="tutorial-copy">
                <h2>{slide.title}</h2>
                <p>{slide.body}</p>
                {slideIndex === lastIndex && installed && (
                  <span className="tutorial-installed">
                    <Check size={14} />
                    Replacely is installed on this device.
                  </span>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="tutorial-footer">
        <div className="tutorial-dots">
          {SLIDES.map((slide, dotIndex) => (
            <button
              key={slide.title}
              type="button"
              className={`tutorial-dot ${dotIndex === index ? 'is-active' : ''}`}
              aria-label={`Go to page ${dotIndex + 1}`}
              aria-current={dotIndex === index}
              onClick={() => setIndex(dotIndex)}
            />
          ))}
        </div>
        <div className="tutorial-actions">
          {index > 0 && (
            <button type="button" className="tutorial-back" onClick={() => setIndex(index - 1)}>
              Back
            </button>
          )}
          <button
            type="button"
            className="button button-primary tutorial-next"
            onClick={() => (index === lastIndex ? onClose() : setIndex(index + 1))}
          >
            {index === lastIndex ? 'Get started' : 'Next'}
            {index === lastIndex ? <Check size={17} /> : <ChevronRight size={17} />}
          </button>
        </div>
        <p className="tutorial-swipe-hint">Swipe to move between pages</p>
      </div>
    </div>
  );
}
