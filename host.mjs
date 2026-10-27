#!/usr/bin/env node
/**
 * host.mjs — one file that hosts Filterly from this computer.
 *
 *   node host.mjs               build dist/ if it is missing, then serve it
 *   node host.mjs --build       force a fresh build, then serve it
 *   PORT=8080 node host.mjs     serve on a different port
 *
 * Serves the production build to this computer and to every device on the local
 * network, so an iPhone can open http://<this-computer-ip>:<port>/ in Safari and
 * add it to the Home Screen. Zero dependencies: plain Node http, no packages.
 */

import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { networkInterfaces } from 'node:os';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const dist = resolve(root, 'dist');
const indexFile = join(dist, 'index.html');
// PORT=8080 works; PORT=0 or a non-numeric value falls back to 5180.
const envPort = Number.parseInt(process.env.PORT ?? '', 10);
const basePort = Number.isInteger(envPort) && envPort > 0 && envPort < 65536 ? envPort : 5180;
const forceBuild = process.argv.includes('--build');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function build() {
  console.log('Building the production app into dist/ ...');
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const result = spawnSync(npm, ['run', 'build'], { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) {
    console.error('\nBuild failed — fix the errors above and run again.');
    process.exit(1);
  }
}

if (forceBuild || !existsSync(indexFile)) build();

if (!existsSync(indexFile)) {
  console.error(`No build found at ${indexFile}. Run: npm run build`);
  process.exit(1);
}

function serveFile(res, file, method) {
  const stat = statSync(file);
  const type = MIME[extname(file).toLowerCase()] ?? 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': stat.size,
    'Cache-Control': file === indexFile ? 'no-cache' : 'public, max-age=3600',
  });
  if (method === 'HEAD') res.end();
  else createReadStream(file).pipe(res);
}

const server = createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method Not Allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad Request');
    return;
  }
  if (pathname.endsWith('/')) pathname += 'index.html';

  const file = resolve(join(dist, pathname));
  if (file !== dist && !file.startsWith(dist + sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  try {
    if (existsSync(file) && statSync(file).isFile()) {
      serveFile(res, file, req.method);
      return;
    }
    // No file, and no extension: hand the app shell back so the PWA stays single-page.
    if (!extname(pathname)) {
      serveFile(res, indexFile, req.method);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal Server Error');
  }
});

function lanAddresses() {
  const found = [];
  for (const [name, entries] of Object.entries(networkInterfaces())) {
    for (const entry of entries ?? []) {
      if (entry.family === 'IPv4' && !entry.internal) found.push({ name, address: entry.address });
    }
  }
  // Prefer the usual Wi-Fi interface first, then any other non-internal address.
  return found.sort((a, b) => (a.name === 'en0' ? -1 : b.name === 'en0' ? 1 : 0));
}

function listen(port, attemptsLeft) {
  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && attemptsLeft > 0) {
      console.log(`Port ${port} is busy, trying ${port + 1} ...`);
      listen(port + 1, attemptsLeft - 1);
    } else {
      console.error(`Could not start the server: ${error.message}`);
      process.exit(1);
    }
  });

  server.listen(port, '0.0.0.0', async () => {
    const local = `http://localhost:${port}/`;
    const addresses = lanAddresses();

    console.log('');
    console.log('Filterly is hosted from this computer (production build, dist/).');
    console.log('');
    console.log(`  Local:   ${local}`);
    for (const { name, address } of addresses) {
      console.log(`  Network: http://${address}:${port}/  (${name})`);
    }
    if (addresses.length === 0) {
      console.log('  Network: no network interface found — check that Wi-Fi is on.');
    }
    console.log('');
    console.log('Open a Network address on the iPhone (same Wi-Fi), then');
    console.log('Safari → Share → Add to Home Screen. Stop with Ctrl+C.');
    console.log('');

    const primary = addresses[0];
    if (!primary) return;
    try {
      const mod = await import('qrcode-terminal');
      const qrcode = mod.default ?? mod;
      if (typeof qrcode.generate !== 'function') throw new Error('no generate()');
      qrcode.generate(`http://${primary.address}:${port}/`, { small: true });
      console.log(`QR: http://${primary.address}:${port}/`);
    } catch {
      console.log(`QR unavailable (dev dependencies not installed). Type: http://${primary.address}:${port}/`);
    }
    console.log('');
  });
}

listen(basePort, 10);

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    console.log('\nStopping the Filterly host.');
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 1000).unref();
  });
}
