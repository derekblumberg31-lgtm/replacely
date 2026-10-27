# Filterly — setup

Everything needed to get Filterly running on this computer and on an iPhone. No accounts, no API keys,
no environment variables.

## What you need

- **Node.js 20.19+ or 22.12+** (check: `node -v`). Vite 7 will not run on older versions.
- **npm** (ships with Node; check: `npm -v`).
- A **Mac** and an **iPhone** on the **same Wi-Fi network** (not a guest network).
- Nothing else. Filterly has no backend, no database and no secrets.

## 1. Install

```bash
npm install
```

## 2. Run it on this computer

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5180/`). The terminal also prints a QR code.

## 3. Host it so the iPhone can open it

`host.mjs` is a single, dependency-free file that hosts the production build from this computer for
every device on your network:

```bash
npm run host          # builds dist/ if it is missing, then serves it
npm run host -- --build   # force a fresh build first
PORT=8080 node host.mjs   # use a different port
```

It prints two addresses:

```text
Local:   http://localhost:5180/
Network: http://192.168.7.185:5180/
```

Use the **Network** address on the iPhone. Stop the server with `Ctrl+C`.

## 4. Open it on the iPhone

1. Same Wi-Fi as this computer, VPN/Private Relay off.
2. Open **Camera**, scan the QR code printed in the terminal, and tap the banner — or type the Network
   URL into **Safari**.
3. Wait for it to load (the four-page guide appears the first time).
4. Tap **Share → Add to Home Screen → Add**.
5. Open **Filterly** from the Home Screen. It runs full screen.

Never type `localhost` or `127.0.0.1` on the phone — those point at the iPhone itself.

## 5. Full setup

```bash
npm run icons         # regenerate PWA icons from public/icons/app-icon.svg
npm run typecheck     # tsc --noEmit
npm run build         # typecheck + production build into dist/
npm run preview       # serve dist/ on localhost
npm run preview:iphone # serve dist/ on the whole network
```

## Offline use

An `http://192.168.x.x` install needs this computer running, because iOS only allows service workers
(offline caching) on **HTTPS**. For a copy that opens with the computer off and no internet: run
`npm run build`, upload the contents of `dist/` to any HTTPS static host (drag it onto
<https://app.netlify.com/drop>), then install from that URL in Safari. The first open caches the app.
Full walkthrough: [IPHONE.md](IPHONE.md#offline-use-after-installation).

## Troubleshooting

| Problem | Fix |
| --- | --- |
| iPhone cannot connect | Same Wi-Fi (not guest), VPN off, use `http://<computer-ip>:5180`, allow node through the macOS firewall. |
| QR does not scan | Type the Network URL by hand; terminal QR fonts vary. |
| "Add to Home Screen" missing | Use Safari, not Chrome or an in-app browser. |
| App works but no offline | Plain LAN HTTP cannot register a service worker; use an HTTPS host (above). |
| Filters disappeared | Data is stored per address (`http://192.168.x.x` and `https://…` are separate). Reopen the same address, or import a backup from **Settings → Your data**. |
| Node version error | Upgrade to Node 20.19+ or 22.12+. |

More: [IPHONE.md](IPHONE.md) (full iPhone walkthrough and every troubleshooting case) and
[README.md](README.md) (what the app does).

## Files

| Path | Purpose |
| --- | --- |
| `SETUP.md` | This guide. |
| `host.mjs` | One-file local host for the built app. |
| `README.md` | Feature overview and project layout. |
| `IPHONE.md` | iPhone install, HTTPS/offline, troubleshooting. |
| `vite.config.ts` | Dev host, QR output, PWA manifest, service worker. |
| `scripts/generate-icons.mjs` | Renders the PWA and Apple touch icons. |
