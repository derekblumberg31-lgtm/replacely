import { countdownParts, type FilterInfo } from '../lib/filters';

interface CountdownProps {
  info: FilterInfo;
  className?: string;
}

/** The days left in the largest whole unit, set in the calendar numeral face. */
export function Countdown({ info, className = '' }: CountdownProps) {
  const parts = countdownParts(info);
  const classes = ['countdown', parts.overdue ? 'is-overdue' : '', parts.value === null ? 'is-word' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} aria-label={parts.label}>
      {parts.value !== null && <span className="countdown-number">{parts.value}</span>}
      <span className="countdown-unit">{parts.unit}</span>
    </span>
  );
}
