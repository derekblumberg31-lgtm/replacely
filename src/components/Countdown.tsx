import { splitDuration } from '../lib/filters';

interface CountdownProps {
  ms: number;
  className?: string;
  showSeconds?: boolean;
  label?: string;
}

export function Countdown({ ms, className = '', showSeconds = true, label }: CountdownProps) {
  const { days, hours, minutes, seconds } = splitDuration(ms);
  const accessible =
    label ??
    `${days} days, ${hours} hours, ${minutes} minutes${showSeconds ? `, ${seconds} seconds` : ''}`;

  return (
    <span className={`countdown ${className}`.trim()} aria-label={accessible}>
      <span className="countdown-part">
        <span className="countdown-number">{days}</span>
        <span className="countdown-unit">d</span>
      </span>
      <span className="countdown-part">
        <span className="countdown-number">{String(hours).padStart(2, '0')}</span>
        <span className="countdown-unit">h</span>
      </span>
      <span className="countdown-part">
        <span className="countdown-number">{String(minutes).padStart(2, '0')}</span>
        <span className="countdown-unit">m</span>
      </span>
      {showSeconds && (
        <span className="countdown-part">
          <span className="countdown-number">{String(seconds).padStart(2, '0')}</span>
          <span className="countdown-unit">s</span>
        </span>
      )}
    </span>
  );
}
