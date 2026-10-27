#!/bin/sh
# Publish Replacely to https://replacely-derek.netlify.app
# Builds dist/ (typecheck + Vite + service worker) and deploys it. Installed phones pick up the
# new version the next time Replacely is opened online.
# First time on a new Mac: npx netlify-cli login
set -e
cd "$(dirname "$0")"
SITE=replacely-derek
[ -d node_modules ] || npm install
npm run build
if ! npx --yes netlify-cli sites:list --json | grep -q "\"name\": *\"$SITE\""; then
  npx --yes netlify-cli sites:create --name "$SITE"
fi
npx --yes netlify-cli deploy --prod --no-build --dir dist --site "$SITE"
echo "Published to https://$SITE.netlify.app"
