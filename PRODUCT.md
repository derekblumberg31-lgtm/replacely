# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Homeowners keeping up with recurring home maintenance (cleaning, filters, gutters, HVAC, safety checks) who lose track of when each job was last done. They use it on an iPhone, installed to the Home Screen.

## Product Purpose
Replacely keeps a live countdown to every recurring household job, so the next due task is always obvious and nothing quietly goes overdue. Success is a homeowner marking jobs done on time and trusting the list as the single record of their home's upkeep.

## Positioning
A phone-first reminder app built only for household upkeep: 45 presets with typical intervals and costs, a completion log, and spend insights, with no account and nothing to set up beyond adding tasks.

## Operating Context
Opened briefly and often: checking what's due, marking a job done right after doing it (swipe left or Done), adding a task while standing in front of the thing that needs it. Runs as a standalone Home Screen PWA, frequently with no connection.

## Capabilities and Constraints
- Tabs: Tasks, Schedule, Insights, Settings; due/overdue badge.
- Live countdowns (days to seconds) with healthy, due-soon and overdue states.
- 45 presets across ten categories; per-task name, location, last-done date, interval, cost, notes.
- Completion log, yearly and 90-day spend, six-month due-date chart.
- Four-page first-run tutorial, light/dark following the system with manual override.
- Data is stored on the device in `localStorage`; JSON export/import for moving phones. No server, account or sync today.
- Stack: React 19 + TypeScript + Vite 7 + vite-plugin-pwa. Published to Netlify via `deploy.sh` and to GitHub Pages via Actions.
- Must keep working fully offline once installed.

## Brand Commitments
- Name: Replacely.
- iPhone-native feel must be preserved: iOS-style sheets with drag-to-dismiss, native-feeling alerts, bottom tab bar, swipe gestures. Inspired by Apple system patterns, using no Apple logos or proprietary assets.

## Evidence on Hand
No testimonials, user counts, reviews or press exist. The app ships with no sample data; future work must not fabricate any of these.

## Product Principles
1. What's due next is visible at a glance; everything else is secondary.
2. Logging a finished job takes one gesture.
3. It behaves like a native iPhone app, including offline.
4. The list holds only what the user entered: no demo data, no padding.
