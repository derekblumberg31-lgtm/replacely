import type { ReactNode } from 'react';

interface PageTitleProps {
  /** One quiet line under the header band; the band carries the page title itself. */
  subtitle?: string;
  aside?: ReactNode;
}

export function PageTitle({ subtitle, aside }: PageTitleProps) {
  if (!subtitle && !aside) return null;
  return (
    <div className="page-summary">
      {subtitle && <p>{subtitle}</p>}
      {aside && <div className="page-summary-aside">{aside}</div>}
    </div>
  );
}
