import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import qrcode from 'qrcode-terminal';

const PORT = 5180;

// Base path for the build. Local hosting uses '/', a GitHub Pages project site
// uses '/<repo>/' (set BASE_PATH in the deploy workflow).
const rawBase = process.env.BASE_PATH ?? '/';
const BASE = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const at = (path: string) => `${BASE}${path.replace(/^\//, '')}`;

function printIphoneQr(networkUrls: string[]) {
  const url = networkUrls[0];
  if (!url) return;
  console.log(`\n  \x1b[36mOpen on iPhone (same Wi-Fi):\x1b[0m ${url}\n`);
  qrcode.generate(url, { small: true });
  console.log('  If Safari cannot connect, allow Node through the macOS firewall.\n');
}

function iphoneQr(): Plugin {
  return {
    name: 'filterly-iphone-qr',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        setTimeout(() => printIphoneQr(server.resolvedUrls?.network ?? []), 150);
      });
    },
    configurePreviewServer(server) {
      server.httpServer?.once('listening', () => {
        setTimeout(() => printIphoneQr(server.resolvedUrls?.network ?? []), 150);
      });
    },
  };
}

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    iphoneQr(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      includeAssets: ['icons/favicon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        id: BASE,
        name: 'Replacely — Household Reminders',
        short_name: 'Replacely',
        description:
          'Household reminders with a live countdown: cleaning, maintenance, filters, gutters and safety checks, each with a location, history and cost.',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        orientation: 'portrait',
        lang: 'en',
        categories: ['utilities', 'lifestyle'],
        background_color: '#f2f2ef',
        theme_color: '#c8281d',
        icons: [
          { src: at('icons/icon-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: at('icons/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: at('icons/maskable-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest,woff2}'],
        navigateFallback: at('index.html'),
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  server: {
    host: true,
    port: PORT,
  },
  preview: {
    host: true,
    port: PORT,
  },
});
