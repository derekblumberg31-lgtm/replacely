---
name: Replacely
description: A wall calendar for household upkeep, laid out like a calm iPhone settings list.
colors:
  calendar-red: "#c8281d"
  calendar-red-pressed: "#a61f16"
  calendar-red-wash: "#fbe9e7"
  holiday-green: "#1d6b3a"
  due-amber: "#8a5200"
  ink: "#161514"
  ink-secondary: "#5f5b55"
  ink-tertiary: "#6c6862"
  crossed-ink: "#3d3a36"
  grid-rule: "#d6d3cc"
  paper-ground: "#f2f2ef"
  page-white: "#ffffff"
  pressed-paper: "#f6f5f2"
  fill: "#ebeae6"
  fill-strong: "#e0ded8"
  separator: "rgba(22, 21, 20, 0.08)"
  separator-strong: "rgba(22, 21, 20, 0.13)"
  scrim: "rgba(18, 17, 16, 0.4)"
  toast-ink: "#1e1d1c"
typography:
  display:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
    fontSize: "40px"
    fontWeight: 800
    lineHeight: 0.95
    fontVariation: "'wdth' 72"
  countdown-large:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
    fontSize: "64px"
    fontWeight: 700
    lineHeight: 0.9
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 75"
  countdown:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 75"
  section-head:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
    fontSize: "15px"
    fontWeight: 800
    letterSpacing: "0.05em"
    fontVariation: "'wdth' 75"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.028em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    letterSpacing: "-0.01em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.45
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.005em"
  footnote:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "10.5px"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  day-square: "1.5px"
  icon-tile: "9px"
  chip: "10px"
  group: "12px"
  button: "14px"
  alert: "16px"
  sheet: "28px"
  round: "50%"
spacing:
  hair: "4px"
  tight: "8px"
  row-y: "11px"
  inner: "12px"
  gutter: "16px"
  band-x: "20px"
  section: "22px"
  half: "26px"
components:
  band:
    backgroundColor: "{colors.calendar-red}"
    textColor: "{colors.page-white}"
    typography: "{typography.display}"
    padding: "12px 20px 14px"
    height: "84px"
  button-primary:
    backgroundColor: "{colors.calendar-red}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "48px"
  button-primary-pressed:
    backgroundColor: "{colors.calendar-red-pressed}"
    textColor: "{colors.page-white}"
  button-secondary:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "48px"
  button-done:
    backgroundColor: "{colors.holiday-green}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "48px"
  task-group:
    backgroundColor: "{colors.page-white}"
    rounded: "{rounded.group}"
  task-row:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "11px 16px"
  task-row-pressed:
    backgroundColor: "{colors.pressed-paper}"
  tab-item:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink-tertiary}"
    typography: "{typography.label}"
    height: "49px"
  tab-item-active:
    textColor: "{colors.calendar-red}"
  search-field:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.ink}"
    rounded: "13px"
    padding: "0 12px"
    height: "44px"
  segmented:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.group}"
    padding: "2px"
    height: "48px"
  segmented-active:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.icon-tile}"
  chip:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.chip}"
    padding: "0 11px"
    height: "36px"
  chip-active:
    backgroundColor: "{colors.calendar-red}"
    textColor: "{colors.page-white}"
  sheet:
    backgroundColor: "{colors.page-white}"
    rounded: "{rounded.sheet}"
  alert:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.alert}"
    width: "298px"
  toast:
    backgroundColor: "{colors.toast-ink}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.button}"
    padding: "11px 15px"
  switch-on:
    backgroundColor: "{colors.holiday-green}"
    rounded: "18px"
    width: "51px"
    height: "31px"
  day-square:
    backgroundColor: "{colors.page-white}"
    rounded: "{rounded.day-square}"
    size: "9px"
---

# Design System: Replacely

## Overview

**Creative North Star: "The Kitchen Wall Calendar"**

Replacely is a wall calendar by the fridge, printed on paper and laid out the way iPhone lays out Settings. The structure is Apple's: one large title, inset grouped lists of white rows on a light grey ground, hairline separators, a native bottom tab bar, sheets that slide up from the bottom. The material is calendar stock. A printed red band carries the month and the page title in condensed capitals. The ink is warm near-black. The rules are warm grey. Done is holiday green. Every number is printed in one condensed numeral face, the way a calendar prints its dates.

The screen stays calm. A row states each fact once: name, location, and a countdown in the largest whole unit ("3 months", "5 days", "Today", "2 days over"), right-aligned in condensed numerals. The most urgent job gets one extra element, a strip of day squares: days gone by are crossed off, today's square fills as the day passes, and days past due turn red. Red is reserved for the band, overdue, and primary actions, so overdue reads instantly.

Dark mode is the same calendar printed on charcoal stock. The red band deepens, accents lighten so they stay legible, and the structure does not change. The build rejects the category default: no dark glass cards, no mint accents, no progress rings, no metric tiles, no second-by-second timers.

**Key Characteristics:**
- Apple inset grouped lists (12px corners) of white rows on a light warm-grey ground, divided by hairline separators.
- A solid printed-red header band with condensed capital titles, and no glass.
- One condensed numeral face (Archivo, 72-75% width) for every count; system SF for all text.
- Countdowns show the largest whole unit only, never hours, minutes or seconds.
- The day strip appears on the most urgent job only.
- Light and dark are one calendar on two paper stocks.

## Colors

A printed-paper palette: one calendar red, one holiday green, warm neutral inks and greys, and no decorative hues.

### Primary
- **Calendar Red** (#c8281d): The printed header band, the active tab, primary buttons, active chips, focus rings, the text caret, and every overdue state (countdown, section label, late day squares, tab badge). In dark mode the band becomes #9e2117 and the accent becomes #ff6a5c, which keeps text readable on charcoal.
- **Calendar Red, Pressed** (#a61f16): The pressed state of the primary button only.
- **Calendar Red Wash** (#fbe9e7): Text selection, the focus halo around a focused search field, the accent icon tile, and the round empty-state medallion.

### Secondary
- **Holiday Green** (#1d6b3a): Completion only. The swipe-to-mark-done action, the Done button, a switch that is on, and confirmation checks. Never decorative. Dark mode uses #57c27f with near-black text (#0c2614).

### Tertiary
- **Due Amber** (#8a5200): The due-soon state only, in status text and the due tab badge. Dark: #f0a640.

### Neutral
- **Ink** (#161514): Primary text, task names, countdown numerals, and the outlined frame of today's square.
- **Secondary Ink** (#5f5b55): Locations, units next to numerals, summary lines, and secondary values.
- **Tertiary Ink** (#6c6862): Inactive tabs, footnotes, placeholders, and chevrons.
- **Crossed Ink** (#3d3a36): The X on days gone by, plus every chart bar and category dot on Insights. Charts are printed in ink, not in colors.
- **Grid Rule** (#d6d3cc): Outlines of days still ahead, and chart baselines.
- **Paper Ground** (#f2f2ef): The page behind every grouped list.
- **Page White** (#ffffff): Grouped lists, rows, sheets, the tab bar, and alerts.
- **Pressed Paper** (#f6f5f2): A task row while it is pressed.
- **Fill** (#ebeae6) / **Fill Strong** (#e0ded8): Search field, segmented track, chips, secondary buttons, neutral icon tiles; Fill Strong is the off switch and pressed icon buttons.
- **Separator** / **Separator Strong** (8% and 13% ink): 0.5px hairlines between rows and around groups, the tab bar's top rule, and the sheet grabber.

### Named Rules
**The Printed Red Rule.** Red means one of three things: the band, overdue, or the one primary action on screen. A red element that is none of these is a bug.

**The Green Is Done Rule.** Holiday green appears only once a job is done or a setting is on. Nothing else is printed green.

**The Ink Charts Rule.** Insights charts are drawn in Crossed Ink on Fill tracks. Categories are told apart by their labels, not by hue.

## Typography

**Display / Numeral Font:** Archivo variable (self-hosted, `public/fonts/archivo-latin-var.woff2`, weights 500-800, widths 62-100%), with SF Pro Display as fallback
**Body Font:** System SF (`-apple-system, BlinkMacSystemFont, 'SF Pro Text'`), with Segoe UI, Roboto, Helvetica, Arial

**Character:** The numerals and section heads look like dates printed on a calendar: condensed, heavy, and set in tabular figures. Everything you read as a sentence uses the phone's own system font, so the app feels native.

### Hierarchy
- **Display** (Archivo 800, 72% width, 40px, line-height 0.95, uppercase): The page title in the red band, and the day number on the empty-state calendar page.
- **Countdown Large** (Archivo 700, 75% width, 64px, line-height 0.9, tabular): The single countdown at the top of the detail sheet.
- **Countdown** (Archivo 700, 75% width, 26px, line-height 1, tabular): The right-aligned countdown on every row, and the large figures in Insights' cost list. The unit follows in system text (13px, 500, Secondary Ink); words like "Today" are set in the numeral face.
- **Section Head** (Archivo 800, 75% width, 15px, 0.05em tracking, uppercase): Labels over grouped lists ("This month", "Later", schedule months, form sections, Insights sections). It turns red for an overdue section.
- **Headline** (SF 700, 21px, line-height 1.18, -0.028em): The task name in the detail sheet; empty-state headings use 20px.
- **Title** (SF 400, 17px, -0.01em): Task names in rows and text typed into form fields.
- **Body** (SF 400, 15px, line-height 1.45): Detail values, sheet actions, button labels (600), and empty-state copy (max 310px wide).
- **Caption** (SF 400, 13px): Row locations, the band's month line (600, 80% white), the summary line (13.5px, tabular).
- **Label** (SF 600, 10px): Tab bar labels and badges.
- **Footnote** (SF 400, 10.5px, line-height 1.45): The on-device storage note, settings footnotes, and the footnotes under charts.

### Named Rules
**The One Numeral Face Rule.** Every count, date number and section head uses Archivo at one of the fixed sizes above (64, 40, 26 or 15px) and a width of 72-75%. Sentences never use Archivo, and numbers never use SF at display size.

**The Largest Unit Rule.** A countdown shows one number and one unit, the largest whole unit that fits. It never shows hours, minutes or seconds, and it never ticks live.

## Layout

The layout is a single column for phones. The app shell is at most 820px wide; page content is capped at 700px (`--page-max`) and centred. Pages have a 16px side gutter (14px below 360px wide). The red band respects the top safe area: at least 84px tall, padded 12px top, 20px sides, 14px bottom, with the text bottom-aligned and the 44px round add button on the right. The tab bar sits at the bottom with the bottom safe area added to its 4px padding.

The vertical rhythm is set by grouped lists. A section head sits 8px above its group. The Tasks halves ("This month", "Later") are 26px apart; settings and form sections are 22px apart; schedule sections are 20px apart. Rows are padded 11px by 16px with a 42px minimum line height. Settings rows are at least 58px tall and schedule rows at least 60px. Row separators start 16px in from the left edge, the way iOS insets them.

Countdowns are pinned to the right edge of the row, so the numbers line up in a column down each group. Names and locations truncate with an ellipsis instead of wrapping.

Responsive behaviour: from 840px wide, the shell floats on a darker ground (#e4e3df, dark #0a0a09) with a hairline outline and a soft drop shadow. From 720px, sheets become centred panels (rounded all round, 85dvh max) instead of bottom sheets. Below 360px and below 700px tall, sizes tighten and the tutorial's art shrinks.

## Elevation & Depth

Depth comes from tone, not shadow. White groups sit on the grey paper ground with a barely-there shadow (`0 1px 2px` at 4% ink) and, on most groups, a 0.5px hairline. The only real elevation belongs to things that float above the page: sheets, alerts, toasts and the off-screen shell frame. Translucency is limited to the system modal layer: the sheet scrim blurs 4px, and the alert is 94% opaque over a 28px blur, the way iOS alerts are. No content surface is glass.

### Shadow Vocabulary
- **Group rest** (`box-shadow: 0 1px 2px rgba(22, 21, 20, 0.04)`; dark `0 1px 1px rgba(0, 0, 0, 0.4)`): Every grouped list and the empty state.
- **Sheet** (`box-shadow: 0 -18px 60px rgba(10, 15, 22, 0.22)`): The bottom sheet, cast upward.
- **Alert** (`box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32)`): The centred native-style alert.
- **Toast** (`box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24)`): The dark confirmation toast above the tab bar.
- **Switch knob** (`box-shadow: 0 2px 5px rgba(0, 0, 0, 0.22)`): The white knob of a switch.

### Named Rules
**The Paper Not Glass Rule.** Content surfaces are opaque paper. Blur and translucency belong only to the scrim and the alert, the two places iOS itself uses them.

## Shapes

The shapes follow iOS: continuous medium corners on groups and controls, full circles for round buttons and badges, and one deliberately sharp shape. Grouped lists, the segmented track and the search field use 12-13px corners. Buttons and toasts use 14px. Chips use 10px. Icon tiles and segment thumbs use 9px. Alerts use 16px. Sheets have 28px top corners, and 28px all round when centred. The day squares are the exception: tiny 9px squares with 1.5px corners and a 3px gap. They are calendar cells, not pills. Today's square is a 1.5px ink frame with its progress drawn inside it, never filling the frame. Borders are 0.5px hairlines throughout. Icons are 24-unit line drawings with a 1.8 stroke and round caps and joins.

**The Fixed Square Rule.** Every day square is 9px with 1.5px corners in every context. A strip shows at most 25 squares; a longer job shows its last stretch, starting with a short grey dash.

## Components

### Buttons
- **Shape:** Gently rounded (14px), 48px tall, padded 0 18px, 15px SF 600 with -0.01em tracking.
- **Primary:** Calendar Red with white text. Pressed: Calendar Red Pressed, scaled to 0.975.
- **Secondary:** Fill background with Ink text.
- **Done:** Holiday Green with white text. Pressed: 92% brightness.
- **Text button:** Secondary Ink, 13px 500, 40px tall; fades to 65% opacity when pressed.
- **Add button (band):** A 44px circle of 16% white on the red band; pressed, it goes to 28% white and scales to 0.92.

### Chips
- **Style:** Fill background, Secondary Ink text, 10px corners, 36px tall, 11.5px SF 550 in tabular figures. Used for interval and preset choices in the task form.
- **State:** When selected, the chip turns Calendar Red with white text.

### Cards / Containers
- **Corner Style:** 12px (`--radius-group`).
- **Background:** Page White on Paper Ground.
- **Shadow Strategy:** Group rest only (see Elevation & Depth).
- **Border:** A 0.5px Separator hairline on schedule, settings and form groups.
- **Internal Padding:** Rows padded 11-12px by 14-16px; hairlines between rows inset 14-16px from the left.

### Inputs / Fields
- **Style:** Form fields sit inside a grouped list with no box of their own. A field has an 11.5px Secondary Ink label, then a 17px text input on a transparent background.
- **Focus:** A 1.5px Calendar Red underline drawn inside the field, plus a red caret.
- **Error:** The underline turns red; when the field is focused, a 3px Calendar Red Wash halo is added.
- **Search:** A 44px Fill-coloured field with 13px corners. While focused it turns Page White with a red 1px border and a 3px wash halo.

### Navigation
- **Band:** The printed red header holds the month and year (13px, 600, 80% white) above the page title in Display.
- **Tab bar:** Page White with a 0.5px top rule and four equal tabs, each at least 49px tall, with a 25px icon over a 10px label. Inactive tabs are Tertiary Ink; the active tab is Calendar Red and its icon pops (0.9 to 1.06 to 1, 0.34s settle curve). A red badge marks overdue jobs; an amber badge or dot marks jobs due soon.
- **Segmented control:** A 48px Fill track with 2px padding. The selected thumb is white with 9px corners and a hairline shadow.

### Task Row
The core row is a pressable white row: the name (Title) and location (Caption) on the left, the Countdown on the right. Swiping left reveals an 88px Holiday Green "Done" action underneath. Pressing turns the row Pressed Paper. The most urgent row in "This month" is the featured row: it adds the day strip 10px below and 14px of bottom padding.

### Day Strip
A line of 9px day squares with a 3px gap. Days ahead are outlined in Grid Rule. Days gone are crossed with a Crossed Ink X. Today is an Ink frame whose fill grows with the hour, up to 75% of the inside. Days past due are solid Calendar Red, and if today is past due, its frame and fill are red too. It appears on the featured task row and in the detail sheet only.

### Sheets and Alerts
- **Sheet:** Page White, 28px top corners, a 37 by 5px grabber, a three-column bar (cancel, 15px 650 title, red action), and drag to dismiss. It slides in over 0.42s with `cubic-bezier(0.22, 1, 0.25, 1)` above a scrim of 40% ink blurred 4px.
- **Alert:** 298px wide with 16px corners. It has a 16.5px 650 title and a 12.5px message, then a row of red 16px buttons split by hairlines; destructive buttons are red at 650. It scales in from 0.92.
- **Toast:** Toast Ink, 14px corners, 12.5px 500 white text, centred 76px above the bottom safe area.

### Empty State
A white group (12px corners) holding a small torn-off calendar page: 76 by 84px, 10px corners, a 22px red band, and the day "1" in Display. Below it are a 20px 700 heading, 15px Secondary Ink copy and stacked buttons.

## Do's and Don'ts

### Do:
- **Do** print counts in Archivo at 72-75% width and the fixed sizes (64 / 40 / 26 / 15px), in tabular figures.
- **Do** keep each fact once per row: name, location, countdown. Nothing else.
- **Do** reserve Calendar Red (#c8281d) for the band, overdue states and the single primary action.
- **Do** use Holiday Green (#1d6b3a) only for done and on states.
- **Do** build every new list as an inset grouped list: Page White, 12px corners, 0.5px hairlines inset 16px, on Paper Ground.
- **Do** keep touch targets at least 44px, and honour `prefers-reduced-motion` (every transition collapses to near zero).
- **Do** keep the light and dark themes structurally identical; only the paper stock changes.

### Don't:
- **Don't** show hours, minutes or seconds in a countdown, or make it tick live.
- **Don't** add progress rings, metric tiles, or cards used as page structure.
- **Don't** put blur or translucency on content surfaces; it belongs to the scrim and the alert only.
- **Don't** colour-code categories or chart series; charts are printed in Crossed Ink.
- **Don't** show the day strip on more than the most urgent job (the detail sheet excepted).
- **Don't** set sentences, labels or body copy in Archivo, or display numerals in SF.
- **Don't** use mint or teal accents anywhere.
