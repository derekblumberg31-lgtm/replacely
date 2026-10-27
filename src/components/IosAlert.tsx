import { useId, type ReactNode } from 'react';

interface IosAlertProps {
  title: string;
  message: ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
  cancelLabel?: string;
}

export function IosAlert({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
  destructive = false,
  cancelLabel = 'Cancel',
}: IosAlertProps) {
  const titleId = useId();

  return (
    <div className="alert-overlay" onClick={onCancel}>
      <div
        className="ios-alert"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="alert-content">
          <h2 id={titleId}>{title}</h2>
          <div className="alert-message">{message}</div>
        </div>
        <div className="alert-actions">
          <button type="button" className="alert-button cancel" onClick={onCancel} autoFocus>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`alert-button ${destructive ? 'destructive' : 'confirm'}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
