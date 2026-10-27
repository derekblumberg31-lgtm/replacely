import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if (import.meta.env.PROD && 'serviceWorker' in navigator && window.isSecureContext) {
  void import('virtual:pwa-register')
    .then(({ registerSW }) => registerSW({ immediate: true }))
    .catch(() => {
      // The app still works online without the offline cache.
    });
}

if ('storage' in navigator && 'persist' in navigator.storage) {
  void navigator.storage.persist().catch(() => {
    // Persistence is best-effort, especially in Safari.
  });
}
