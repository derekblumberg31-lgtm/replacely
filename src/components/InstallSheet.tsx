import { Sheet } from './Sheet';
import { Check, CircleCheck, Info, Share } from './Icons';

interface InstallSheetProps {
  installed: boolean;
  onClose: () => void;
}

export function InstallSheet({ installed, onClose }: InstallSheetProps) {
  return (
    <Sheet
      title="Home Screen"
      onClose={onClose}
      trailing={
        <button type="button" className="sheet-action is-strong" onClick={onClose}>
          Done
        </button>
      }
    >
      <div className="install-hero">
        <img
          className="install-app-icon"
          src={`${import.meta.env.BASE_URL}icons/icon-192.png`}
          alt="Replacely app icon"
        />
        <h2>{installed ? 'Replacely is installed' : 'Install Replacely'}</h2>
        <p>
          {installed
            ? 'You’re using Replacely from your Home Screen. Your tasks stay on this device and the interface runs full screen.'
            : 'Add Replacely to your iPhone Home Screen for a full-screen app with your tasks always a tap away.'}
        </p>
      </div>

      {installed ? (
        <div className="install-done">
          <CircleCheck size={22} />
          <span>
            <strong>Installed on this device</strong>
            <small>Open it from the Home Screen whenever you need it.</small>
          </span>
        </div>
      ) : (
        <ol className="install-steps">
          <li>
            <span className="install-step-number">1</span>
            <span>
              <strong>Open Replacely in Safari</strong>
              <small>Add to Home Screen is handled by Safari on iPhone.</small>
            </span>
          </li>
          <li>
            <span className="install-step-number">2</span>
            <span>
              <strong>Tap the Share button</strong>
              <small>
                <Share size={14} />
                It’s the square with an arrow coming out, in the Safari toolbar.
              </small>
            </span>
          </li>
          <li>
            <span className="install-step-number">3</span>
            <span>
              <strong>Choose Add to Home Screen</strong>
              <small>Scroll the share sheet if you don’t see it, then tap Add.</small>
            </span>
          </li>
          <li>
            <span className="install-step-number">4</span>
            <span>
              <strong>Open it from the Home Screen</strong>
              <small>Replacely opens full screen, without browser toolbars.</small>
            </span>
          </li>
        </ol>
      )}

      <div className="install-note">
        <span className="install-note-icon">
          <Info size={17} />
        </span>
        <div>
          <strong>About offline use</strong>
          <p>
            A Home Screen app works offline only when Replacely is served over HTTPS. A plain local address such as
            <code> http://192.168.x.x </code>
            installs as a web clip, but it still needs your Mac and the same Wi-Fi to open. See the included iPhone
            guide for an HTTPS option.
          </p>
        </div>
      </div>

      <div className="install-note is-quiet">
        <span className="install-note-icon">
          <Check size={17} />
        </span>
        <div>
          <strong>Everything stays local</strong>
          <p>There is no account and no cloud sync. Export a backup from Settings before clearing Safari data.</p>
        </div>
      </div>
    </Sheet>
  );
}
