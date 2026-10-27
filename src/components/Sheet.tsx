import { useId, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { X } from './Icons';

interface SheetProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  footer?: ReactNode;
  tall?: boolean;
  elevated?: boolean;
}

export function Sheet({
  title,
  onClose,
  children,
  leading,
  trailing,
  footer,
  tall = false,
  elevated = false,
}: SheetProps) {
  const titleId = useId();
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef<number | null>(null);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    startY.current = event.clientY;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (startY.current === null) return;
    setDragY(Math.max(0, event.clientY - startY.current));
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (startY.current === null) return;
    const shouldClose = dragY > 110;
    startY.current = null;
    setDragging(false);
    setDragY(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (shouldClose) onClose();
  }

  return (
    <div className={`sheet-overlay ${elevated ? 'is-elevated' : ''}`} onClick={onClose}>
      <section
        className={`sheet ${tall ? 'is-tall' : ''} ${dragging ? 'is-dragging' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={dragY > 0 ? { transform: `translateY(${dragY}px)` } : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="sheet-grab-area"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <span className="sheet-grabber" aria-hidden="true" />
        </div>

        <header className="sheet-bar">
          <div className="sheet-side">{leading}</div>
          <h2 id={titleId} className="sheet-title">
            {title}
          </h2>
          <div className="sheet-side sheet-side-end">
            {trailing ?? (
              <button type="button" className="sheet-icon-button" onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            )}
          </div>
        </header>

        <div className="sheet-scroll">{children}</div>
        {footer && <div className="sheet-footer">{footer}</div>}
      </section>
    </div>
  );
}
