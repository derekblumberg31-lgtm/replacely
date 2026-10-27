import type { CSSProperties } from 'react';
import type { Filter } from '../types';
import { DAY_MS, parseDateInput } from '../lib/filters';

/** Most days one strip shows; longer jobs show their final stretch, every square still one day. */
const MAX_SQUARES = 25;

interface DayStripProps {
  filter: Pick<Filter, 'installedAt' | 'lifespanDays'>;
  now: number;
}

/**
 * The job's run as calendar day squares: days gone by are crossed off, today's square fills as the
 * day passes, and days past due are printed red.
 */
export function DayStrip({ filter, now }: DayStripProps) {
  const start = parseDateInput(filter.installedAt).getTime();
  const elapsed = Math.max(0, now - start);
  const today = Math.floor(elapsed / DAY_MS);
  const todayFill = (elapsed % DAY_MS) / DAY_MS;
  const total = Math.max(filter.lifespanDays, today + 1);
  const first = Math.max(0, total - MAX_SQUARES);

  const squares = [];
  for (let day = first; day < total; day += 1) {
    const late = day >= filter.lifespanDays;
    let state = 'is-ahead';
    if (day < today) state = late ? 'is-late' : 'is-gone';
    else if (day === today) state = late ? 'is-today is-late' : 'is-today';
    const style = day === today ? ({ '--fill': `${Math.round(todayFill * 100)}%` } as CSSProperties) : undefined;
    squares.push(<i key={day} className={state} style={style} />);
  }

  return (
    <span className={`day-strip ${first > 0 ? 'is-cut' : ''}`} aria-hidden="true">
      {squares}
    </span>
  );
}
