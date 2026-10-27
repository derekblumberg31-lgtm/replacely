---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

## Scope

Replacely app shell and every tab (Tasks, Schedule, Insights, Settings), sheets, tutorial. Mode: Operate. Mobile-first PWA on iPhone, installed to the Home Screen, often offline.

## Audience and task

Homeowners glancing at what's due, marking a job done right after doing it, adding a task in front of the thing that needs it. Constraints: iPhone-native sheets, gestures and tab bar stay; must work fully offline (fonts self-hosted).

## User feedback (binding)

The previous build felt busy and overwhelming; make it calmer and more Apple-like. Countdowns show the largest unit only ("3 months", "2 weeks", "5 days", "Today", "2 days over"), never hours, minutes or seconds. Cost info is valued and stays.

## Direction contract

THESIS: Every job counts down the way you cross days off the wall calendar by the fridge, inside a calm Apple-grade layout. Refuses the category default of dark glass cards with mint accents, progress rings and live second-by-second timers.

OWN-WORLD: Apple's structure (large title, inset grouped lists, generous white space, native controls) printed on calendar stock: neutral light-grey ground, white groups, printed calendar red (#d42a1f family) owning the header band and overdue state, near-black ink, warm grey rules, holiday green for done. One condensed numeral face (Archivo, narrow widths) for every count, system SF for all text. Dark mode is the same calendar on charcoal stock, red kept. No glass, no cards-as-structure, no metric tiles.

STORY: The homeowner sees at once what is overdue and what is due this month, trusts the count, and swipes or taps once to mark a job done.

FIRST VIEWPORT: Red header band: month and year small, page title large in condensed caps, add button at right. One quiet summary line on the paper (task count, due this month, yearly cost). "This month" grouped list: the most urgent job first with its day strip (days X'd off, today's square filling), then plain rows with name, location and the largest-unit countdown right-aligned in condensed numerals. "Later" grouped list below. Native bottom tab bar.

FORM: Kitchen Wall Calendar, candidate 4 of 7 (seed:0029028735a41445), calmed per user feedback. Raises kept: one fixed day-square size; two hard halves with right-aligned tabular counts; each fact once per row; one numeral face at fixed sizes; today's square fills live. The day strip appears only on the most urgent job.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance


## User brief (binding, 2026-10-27; overrides earlier visual choices where they conflict)

Calm, refined, Apple-grade restraint. System font only (SF Pro). Clear hierarchy without oversized or shouting headlines; no all-caps labels, no excessive bolding. Short, natural copy. Warm neutrals, soft grays and one subtle accent; gentle contrast, no harsh black/white or saturated colour. Spacious, consistently aligned layouts; soft borders, subtle shadows, restrained blur. No unnecessary badges, gradients, icons or decoration; no dashboard panels. Quiet, tactile, obvious controls. Subtle transitions, no bounce. Accessible contrast, readable sizes, visible focus, reduced-motion support. Every element earns its place.
