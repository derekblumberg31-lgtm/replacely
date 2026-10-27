# Filterly

A local-first filter lifespan tracker built for the phone. Add every filter in and around your home —
HVAC and air purifier filters, fridge and whole-house water cartridges, pool and hot tub cartridges, car
cabin filters, vacuum HEPA filters, and anything custom — and Filterly keeps a live countdown to each
replacement.

Filterly is a **mobile-first PWA**: it installs from Safari to the iPhone Home Screen, runs full screen,
and keeps every filter in `localStorage`. There is no account, server or sync. The interface is inspired
by familiar Apple system patterns but uses no Apple logos or proprietary assets.

**Live:** <https://derekblumberg31-lgtm.github.io/filterly/> — open it in iPhone Safari, then
**Share → Add to Home Screen**. It is served over HTTPS, so the Home Screen app caches itself and opens
with no computer and no internet.

Source: <https://github.com/derekblumberg31-lgtm/filterly>

## What's inside

- **Live countdowns** — days, hours, minutes and seconds, with healthy, due-soon and overdue states.
- **Filter details** — type (21 presets with typical lifespan and cost), room or location, install date,
  lifespan, cost and notes.
- **Replacement log** — mark a filter replaced to reset the countdown and record how long the previous
  one ran.
- **Four mobile tabs** — Filters, Schedule, Insights and Settings, with a due/overdue badge.
- **Swipe to replace** — swipe a filter card left, or use the Replace button on the card.
- **iOS-style sheets** — drag a sheet down to dismiss, tap the backdrop to close, and use native-feeling
  alerts for destructive actions.
- **First-run tutorial** — a four-page swipeable guide, replayable from Settings.
- **Light and dark mode** — follows the system by default, with a manual override.
- **Insights** — yearly spend, next-90-days cost and a six-month replacement chart.
- **Backup and restore** — JSON export/import for moving to a new phone.
- **Offline app shell** — a production build registers a service worker and caches its assets (HTTPS only).
- **No sample data** — the app starts empty; everything you see is yours.

## Run it on your Mac

**New here? Start with [SETUP.md](SETUP.md)** — the step-by-step setup guide, including `host.mjs`, a
single dependency-free file that hosts the production build from this computer so an iPhone can open it:

```bash
npm install
npm run host     # builds if needed, serves dist/ on your network, prints a QR code
```

Requires **Node.js 20.19+ or 22.12+** (Vite 7) and npm. No Xcode, Apple Developer account or native
build is needed.

```bash
npm install
npm run dev
```

Open the local URL Vite prints, or scan the QR code in the terminal.

```bash
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build locally
npm run icons      # regenerate PWA icons from public/icons/app-icon.svg
```

## Run it on an iPhone

1. Put the iPhone and Mac on the **same Wi-Fi network**.
2. Start the server with `npm run dev:iphone` (or `npm run dev`).
3. Scan the QR code printed in the terminal with the iPhone Camera, or open the printed network URL
   (`http://<your-mac-ip>:5180/`) in **Safari**.
4. In Safari, tap **Share → Add to Home Screen → Add**. Filterly opens full screen from the Home Screen.

The dev server prints the QR and the network URL automatically. Full walkthrough, HTTPS/offline setup
and troubleshooting: **[IPHONE.md](IPHONE.md)**.

### Offline use — the honest version

iOS Safari only allows service workers (the part that makes a web app work offline) on **HTTPS**.
A plain `http://192.168.x.x` address is fine for using Filterly on your Wi-Fi and for adding it to the
Home Screen, but it cannot cache itself for offline use, and it needs the Mac running.

For **true offline** use, serve the production `dist/` folder from any static host with HTTPS — for
example a Netlify Drop or Cloudflare Pages deployment at a domain root — then open that URL in Safari and
add it to the Home Screen. The first load caches the app; after that it opens with no network and no Mac.
See [IPHONE.md](IPHONE.md#offline-use-after-installation) for a step-by-step route.

## Environment variables

**None are required.** The app has no API keys, accounts or backend. Everything is local. The production
service worker and PWA manifest are generated at build time.

## Data and privacy

Filters, settings and history live in `localStorage` under `filterly:v2`, scoped to the exact origin you
opened (the `http://192.168.x.x` address and an `https://` deployment are separate installs). Nothing is
sent anywhere. Clearing Safari website data removes the filters, so use **Settings → Your data → Export
backup** first. Import the JSON on the new device through the same settings page.

Browser reminders are optional on desktop browsers. They are checked when the app opens, at most once a
day, and require notification permission plus HTTPS. iOS web apps cannot schedule local alerts, so
Filterly shows due and overdue badges instead. All countdowns work with or without notifications.

## Project layout

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | App shell, state, sheets, reminders, tutorial trigger |
| `src/pages/` | Filters, Schedule, Insights and Settings screens |
| `src/components/` | Filter cards, sheets, alerts, tutorial, install guide, nav |
| `src/lib/filters.ts` | Countdown and lifespan math |
| `src/lib/storage.ts` | Versioned `localStorage`, backup/restore, legacy migration |
| `src/lib/platform.ts` | Standalone/theme/notification detection |
| `src/styles.css` | Mobile-first design tokens and responsive layout |
| `vite.config.ts` | Dev host, iPhone QR output, PWA manifest and service worker |
| `host.mjs` | One-file local host for the built app (`npm run host`) |
| `SETUP.md` | Step-by-step setup guide |
| `scripts/generate-icons.mjs` | Renders the PWA and Apple touch icons |

## Notes

- The app is designed for portrait phones, with a wider centered column on desktop.
- Inputs use a 16px font size so iOS Safari does not zoom when a field is focused.
- Safe-area insets handle the iPhone notch, home indicator and standalone status bar.
- Filterly is an independent project, not affiliated with Apple Inc.
