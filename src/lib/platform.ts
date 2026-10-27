import type { ResolvedTheme } from '../types';

type StandaloneNavigator = Navigator & { standalone?: boolean };

export function isIos(): boolean {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as StandaloneNavigator).standalone === true
  );
}

export function systemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function supportsLocalNotifications(): boolean {
  if (typeof window === 'undefined') return false;
  if (isIos()) return false;
  return 'Notification' in window;
}
