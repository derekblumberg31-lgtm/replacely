import type { ReactNode } from 'react';

interface EmptyStateProps {
  art?: ReactNode;
  title: string;
  body: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  compact?: boolean;
}

export function EmptyState({
  art,
  title,
  body,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  compact = false,
}: EmptyStateProps) {
  return (
    <section className={`empty-state ${compact ? 'is-compact' : ''}`}>
      {art && <div className="empty-art">{art}</div>}
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="empty-actions">
        <button type="button" className="button button-primary button-block" onClick={onPrimary}>
          {primaryLabel}
        </button>
        {secondaryLabel && onSecondary && (
          <button type="button" className="button button-secondary button-block" onClick={onSecondary}>
            {secondaryLabel}
          </button>
        )}
      </div>
    </section>
  );
}
