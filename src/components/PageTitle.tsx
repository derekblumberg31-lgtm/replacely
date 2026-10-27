import type { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  aside?: ReactNode;
}

export function PageTitle({ title, subtitle, aside }: PageTitleProps) {
  return (
    <header className="page-title">
      <div className="page-title-main">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {aside && <div className="page-title-aside">{aside}</div>}
    </header>
  );
}
