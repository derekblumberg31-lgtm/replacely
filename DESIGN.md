---
name: Replacely
description: A quiet wall calendar for household upkeep, set in the calm grouped lists of an iPhone.
colors:
  brick: "#a8503c"
  brick-pressed: "#8f4232"
  brick-wash: "#f5e8e3"
  done-green: "#3d7a55"
  due-amber: "#8a5200"
  due-amber-wash: "#f8eedd"
  ink: "#2b2926"
  ink-secondary: "#6b665f"
  ink-tertiary: "#716c65"
  crossed-ink: "#9a958d"
  grid-rule: "#dedad3"
  warm-ground: "#f4f3f0"
  page-white: "#ffffff"
  pressed-paper: "#f8f7f4"
  fill: "#ecebe7"
  fill-strong: "#e0ded8"
  separator: "rgba(22, 21, 20, 0.08)"
  separator-strong: "rgba(22, 21, 20, 0.13)"
  scrim: "rgba(18, 17, 16, 0.4)"
  toast-ink: "#2f2d2a"
typography:
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  countdown-large:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "'tnum' 1"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.028em"
  countdown:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "'tnum' 1"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    letterSpacing: "-0.01em"
  section-head:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "-0.01em"
  button:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "-0.01em"
  subhead:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  footnote:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.45
  tab-label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.005em"
rounded:
  day-square: "1.5px"
  chip: "10px"
  group: "12px"
  search: "13px"
  button: "14px"
  alert: "16px"
  sheet: "28px"
  round: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  gutter: "16px"
  header: "20px"
  section: "22px"
  half: "26px"
components:
  button-primary:
    backgroundColor: "{colors.brick}"
    textColor: "{colors.page-white}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "48px"
  button-primary-pressed:
    backgroundColor: "{colors.brick-pressed}"
  button-secondary:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "48px"
  button-done:
    backgroundColor: "{colors.done-green}"
    textColor: "{colors.page-white}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    height: "48px"
  add-button:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.brick}"
    rounded: "{rounded.round}"
    size: "44px"
  add-button-pressed:
    backgroundColor: "{colors.fill-strong}"
  task-group:
    backgroundColor: "{colors.page-white}"
    rounded: "{rounded.group}"
  task-row:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "11px 16px"
  task-row-pressed:
    backgroundColor: "{colors.pressed-paper}"
  search-field:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.search}"
    padding: "0 12px"
    height: "44px"
  search-field-focus:
    backgroundColor: "{colors.page-white}"
  form-chip:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.chip}"
    padding: "0 11px"
    height: "36px"
  form-chip-active:
    backgroundColor: "{colors.brick}"
    textColor: "{colors.page-white}"
  segmented:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.group}"
    padding: "2px"
    height: "48px"
  segmented-active:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink}"
  tab-bar:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink-tertiary}"
    typography: "{typography.tab-label}"
    padding: "5px 8px"
  tab-item-active:
    textColor: "{colors.brick}"
  sheet:
    backgroundColor: "{colors.page-white}"
    rounded: "{rounded.sheet}"
  alert:
    backgroundColor: "{colors.page-white}"
    rounded: "{rounded.alert}"
    width: "298px"
  toast:
    backgroundColor: "{colors.toast-ink}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.button}"
    padding: "11px 15px"
---

# Design System: Replacely

## Overview

**Creative North Star: "The Quiet Wall Calendar"**

Replacely is the calendar by the fridge, reduced to the one thing it is good at: crossing days off until a job comes due. It is laid out the way iOS lays out Settings: a plain page title, inset grouped lists of white rows on a warm grey ground, hairline separators, a bottom tab bar, and sheets that slide up from below. The calendar survives in two places only: the countdown, set as the largest whole unit ("3 months", "5 days", "Today", "2 days over"), and a strip of tiny day squares on the single most urgent job.

Density is low and the voice is soft. Everything is the system font. Hierarchy comes from size and a narrow range of weights, never from capitals, colour blocks or ornament. There is one accent, a muted brick, and it is spent sparingly: the add button, the active tab, primary actions, selected chips and anything overdue. Neutrals are warm (a hint of yellow in every grey) and contrast is gentle: ink is a soft near-black, the page is never pure white, and dark mode is warm charcoal rather than black.

This system replaced an earlier build with a printed red header band, a condensed self-hosted numeral face and all-caps headings. Those are retired; nothing here should bring them back.

**Key Characteristics:**
- Apple grouped-list structure: plain page title, white inset groups (12px corners), hairline separators inset 16px.
- System font only, with tabular numerals for every count.
- Warm neutral palette with one muted brick accent; green only for done, amber only for due soon.
- Countdowns in the largest whole unit; the day strip only on the most urgent job.
- Flat at rest: a 1px whisper shadow under groups, real depth only for sheets, alerts and toasts.
- Quiet motion: short eased fades and scale-on-press, no bounce, all of it switched off under reduced motion.

## Colors

Warm paper neutrals carry the whole interface; a single muted brick does the pointing, and two quiet status hues report state.

### Primary
- **Muted Brick** (#a8503c): The one accent. Add button glyph, active tab, primary buttons, selected interval chips, sheet text actions, focus rings, caret, search focus border. Also the overdue colour: an overdue countdown, the overdue section label, late day squares and the tab badge count all use it, so "late" reads as the accent rather than as an alarm. 5.4:1 on white, 4.9:1 on the ground.
- **Pressed Brick** (#8f4232): Primary button while pressed. Never a resting fill.
- **Brick Wash** (#f5e8e3): Text selection, the search field's 3px focus halo, error fields, the destructive row's pressed state.

### Secondary
- **Done Green** (#3d7a55): Completion only. The swipe-left Done action, the Done button, the switch when on, the check beside an enabled setting. White text on it is 5.1:1.

### Tertiary
- **Due Amber** (#8a5200): Due soon only, used as the small dot on the Tasks tab when nothing is overdue but something is close. Its wash (#f8eedd) is reserved for the same state.

### Neutral
- **Soft Ink** (#2b2926): Primary text, task names, the countdown number, today's day-square frame and fill. 13:1 on the ground; deliberately not black.
- **Warm Graphite** (#6b665f): Secondary text: locations, group headings, summary line, countdown units, form labels.
- **Warm Pewter** (#716c65): Tertiary text: footnotes, hints, placeholders, inactive tab items, chevrons. Passes 4.5:1 on both ground and white.
- **Crossed Ink** (#9a958d): The X on crossed-off day squares and the bars in Insights charts. Graphic only; never body text on white (3:1).
- **Grid Rule** (#dedad3): Outlines of future day squares and the cut mark when a strip is truncated.
- **Warm Ground** (#f4f3f0): The page behind every group, the header's translucent fill, and the PWA theme and background colour.
- **Page White** (#ffffff): Group, row, sheet, alert and tab bar surfaces.
- **Pressed Paper** (#f8f7f4): A task row under the finger.
- **Fill / Fill Strong** (#ecebe7 / #e0ded8): Neutral control fills: search, secondary button, segmented track, chips, add button; Fill Strong for pressed states, the off switch and the search clear button.
- **Separators** (8% and 13% ink): Hairlines (0.5px) between rows, under the tab bar and above alert buttons.
- **Scrim** (40% ink): Behind sheets (with 4px blur) and alerts (6px blur).

**Dark mode** is the same calendar on warm charcoal, switched by `data-theme="dark"` on the root (set from the system preference, or a manual override in Settings). Counterparts: ground #171716, surface #21201e, pressed #252422, fill #2b2a28 / #363431, ink #ebe9e4, secondary #aaa59d, tertiary #9a958d, crossed ink #8f8a82, grid #45423e, brick lifts to #df8f7b (pressed #e9a593, wash 14% brick) with near-black #1c0503 text on brick fills, green #7cbf96 with #0c2614 text, amber #f0a640, tab bar #1d1c1b, toast inverts to #e6e4df with dark text, scrim 62% black, segmented active #55524d with white text.

### Named Rules
**The One Brick Rule.** Brick is the only accent, and it marks either the next thing to tap or something overdue. If a screen shows brick on more than a handful of elements, something is decorating.

**The Status Hue Rule.** Green means done, amber means due soon, brick means overdue. None of them is ever used for decoration, category colour or emphasis.

**The No Pure Extremes Rule.** Text is #2b2926, never #000; the page is #f4f3f0, never #fff. Pure white is a surface colour, not a background.

## Typography

**Display Font:** none; the system font (SF Pro on iPhone) does everything.
**Body Font:** -apple-system, BlinkMacSystemFont, 'SF Pro Text', with 'Segoe UI', Roboto, Helvetica, Arial fallbacks.
**Label/Mono Font:** system font for labels; ui-monospace / SF Mono only for inline code in help text.

**Character:** One family, set the way iOS sets it: slightly negative tracking at text sizes, tabular figures wherever numbers line up, and weights kept between regular and bold. It reads as native and asks for no attention.

### Hierarchy
- **Headline** (700, 28px, 1.15, -0.02em): The page title in the header ("Tasks", "Schedule", "Insights", "Settings"). The only large text on a page.
- **Countdown Large** (600, 40px, 1, tabular): The countdown at the top of a task's detail sheet; its unit sits beside it at 17px.
- **Title** (700, 21px, 1.18, -0.028em): The task name heading a detail sheet. Empty-state headings sit just below at 20px/700.
- **Countdown** (600, 20px, 1, tabular): The right-aligned countdown in every task and schedule row. Its unit follows at 15px/500 in Warm Graphite; word-only states ("Today") use the number style in ink.
- **Body** (400, 17px, -0.01em): Task names in rows and form input values. Detail list rows use 15px.
- **Section Head** (600, 15px, -0.01em, Warm Graphite): Group headings above each list ("This month", "Later", "Appearance"), sentence case.
- **Button** (600, 15px, -0.01em): Buttons. Sheet text actions use 15px at 500, the confirming one at 650.
- **Subhead** (400, 13px, 1.4): Locations under task names, form labels, the summary line (13.5px), setting descriptions.
- **Footnote** (400, 12px, 1.45, Warm Pewter): Hints, chart captions, settings footnotes.
- **Tab Label** (600, 10px): Bottom tab bar labels only, matching the iOS tab bar.

### Named Rules
**The Sentence Case Rule.** No text is uppercased, letter-spaced into a label, or set in a second face. Section heads are sentence case at 15px semibold.

**The Tabular Count Rule.** Every number that can change (countdowns, counts, costs, chart values) uses tabular figures so the right edge of a list never jitters.

**The One Big Line Rule.** Each screen has one large line: the page title, or on a detail sheet the countdown. Nothing else goes above 21px.

## Layout

A single centred column, max 700px wide inside an app frame capped at 820px. On wider screens (840px and up) the frame floats on a slightly darker ground (#e4e3df, dark #0a0a09) with a hairline and a soft 80px shadow, like a phone on a desk.

Structure from top to bottom: a translucent header (ground at 88% with saturate 160% and 16px blur) holding the page title left and the 44px round add button right, padded 20px with a 64px minimum height plus the top safe area; a scrolling page with a 16px side gutter; the bottom tab bar on white with a hairline top border and the bottom safe area.

Rhythm is iOS grouped-list spacing: one quiet summary line under the header, 12px to the first group, 26px between the "This month" and "Later" halves, 20–22px between sections elsewhere, 8px between a section head and its group. Task rows are padded 11px by 16px; settings rows 10px by 14px at 58px tall; schedule rows 60px tall. Separators start 16px in from the left in task and detail lists.

Responsive: sheets are bottom-anchored on phones and become centred 28px-radius dialogs at 720px and up; small phones (359px and below, 340px and below) and short screens (700px tall and below) tighten sizes and the tutorial art.

**The Two Halves Rule.** The task list is always split into "This month" and "Later", each its own white group, with the most urgent job first. Do not add a third tier, a dashboard summary or metric tiles above them.

## Elevation & Depth

Flat by default, with tonal layering doing most of the work: white groups on a warm grey ground, a pressed-paper tint under the finger. Groups carry only a 1px whisper shadow. Real shadows are reserved for things that float over the page: sheets, alerts, toasts and the desktop frame. Blur is used three times only: the header (16px), the scrim behind sheets (4px) and behind alerts (6px, with the alert itself at 94% surface and a 28px backdrop blur).

### Shadow Vocabulary
- **Group whisper** (`box-shadow: 0 1px 2px rgba(22, 21, 20, 0.04)`; dark `0 1px 1px rgba(0, 0, 0, 0.4)`): Task groups, inset groups, detail lists, empty states.
- **Segment lift** (`box-shadow: 0 1px 2px rgba(22, 21, 20, 0.09), 0 0 0 0.5px rgba(22, 21, 20, 0.04)`): The selected segment in a segmented control.
- **Sheet** (`box-shadow: 0 -18px 60px rgba(22, 21, 20, 0.22)`): Bottom sheets.
- **Alert** (`box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32)`): Centred alerts.
- **Toast** (`box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24)`): The toast above the tab bar.
- **Switch knob** (`box-shadow: 0 2px 5px rgba(0, 0, 0, 0.22)`): The white thumb of the iOS switch.

### Named Rules
**The Float-Only Shadow Rule.** A surface gets more than the group whisper only if it floats above the page and can be dismissed. Rows, groups and buttons in the page stay flat.

## Shapes

Soft, consistent, iOS-sized corners. Groups are 12px; buttons 14px; the search field 13px; chips 10px; segmented tracks 12px with 9px segments; alerts 16px; sheets 28px on the top corners (all four on wide screens). Round things are fully round: the add button, the switch, the grabber pill. Borders are hairlines (0.5px) or nothing; separators are inset lines, not boxes. The one small hard shape is the day square: 9px with 1.5px corners, so the strip reads as printed calendar cells rather than dots.

## Components

### Buttons
Quiet and tactile: soft fills, no outlines, a slight press-in.
- **Shape:** gently rounded (14px), 48px tall, 18px side padding; block buttons fill the width.
- **Primary:** Muted Brick fill with white text. Used for the one main action of a sheet or empty state ("Mark done", "Add task").
- **Pressed / Focus:** scales to 0.975 over 0.16s and darkens to Pressed Brick; keyboard focus shows a 2px brick outline offset 2px.
- **Secondary:** Fill background with ink text, same shape.
- **Done:** Done Green with white text, for confirming a completion.
- **Text button:** 13px Warm Graphite, no fill, fades to 65% opacity when pressed.
- **Add button:** 44px circle in Fill with a brick plus glyph, top right of the header; scales to 0.94 and deepens to Fill Strong when pressed.

### Chips
- **Style:** interval presets in the task form; 36px tall, 10px corners, Fill background, 13px/550 Warm Graphite, tabular figures.
- **State:** the selected chip turns Muted Brick with white text. No outlined or icon variants.

### Cards / Containers
Containers are grouped lists, not cards.
- **Corner Style:** 12px.
- **Background:** Page White on Warm Ground.
- **Shadow Strategy:** group whisper only (see Elevation & Depth).
- **Border:** schedule, settings and form groups add a 0.5px separator border; task groups do not.
- **Internal Padding:** rows carry the padding (11px 16px); groups have none, so separators can run to the edge.

### Inputs / Fields
- **Style:** form fields live inside a white group as borderless rows: 13px label above, 17px value, a hairline between fields inset 14px. The search field is a 44px Fill capsule (13px corners) with a magnifier glyph.
- **Focus:** form inputs get a 1.5px brick underline; the search field turns white with a brick border and a 3px Brick Wash halo.
- **Error:** brick underline and a 13px brick message below the field.

### Navigation
- **Tab bar:** four equal items (Tasks, Schedule, Insights, Settings), 24px stroke glyphs (1.8 stroke) over 10px labels, 49px minimum height. Inactive items are Warm Pewter, the active item Muted Brick. Pressing scales to 0.95.
- **Badge:** the Tasks tab shows a 17px brick count when anything is overdue, or an 8px amber dot when something is due soon. It is the only badge in the app.
- **Header:** no band, no colour fill: just the translucent ground, the page title and the add button (hidden on Settings).

### Sheets and Alerts
- **Sheet:** slides up over 0.42s on cubic-bezier(0.22, 1, 0.25, 1), white, 28px top corners, a 37 by 5px grabber, drag to dismiss. The bar is a three-column grid: brick text action left, 15px/650 title centred, brick action right.
- **Alert:** 298px wide, 16px corners, centred title (16.5px/650) and message (12.5px), buttons split by hairlines; destructive buttons are brick. Enters from 0.92 scale over 0.28s.
- **Toast:** dark warm capsule (inverted in dark mode) above the tab bar, 12.5px text, with a check or warning glyph tinted green or red.

### Countdown and Day Strip (signature)
The countdown is a number plus unit in the largest whole unit only, never hours, minutes or seconds. Overdue countdowns turn brick and read "2 days over". The day strip appears only on the most urgent task row and in the detail sheet: up to 25 squares of 9px with 3px gaps. Past days are crossed with a Crossed Ink X, future days are Grid Rule outlines, today is an ink-framed square whose fill grows through the day (capped at 75%), and days past due fill brick. A longer run starts with a short grey cut mark.

## Do's and Don'ts

### Do:
- **Do** build every screen from white inset groups (12px) on Warm Ground (#f4f3f0) with 0.5px separators inset 16px.
- **Do** use the system font for everything, with tabular figures for any number.
- **Do** keep brick (#a8503c light, #df8f7b dark) for the next action and for overdue, and nothing else.
- **Do** show countdowns in the largest whole unit ("3 months", "5 days", "Today", "2 days over").
- **Do** keep the day strip to the single most urgent job and the detail sheet.
- **Do** keep controls at 44px or larger, with a visible 2px brick focus outline.
- **Do** keep motion to short eased fades and press-scales on the standard and settle curves, and let reduced motion switch it all off.

### Don't:
- **Don't** bring back the red header band, a coloured title bar, or any full-width colour block behind the title.
- **Don't** add a second typeface, a condensed numeral face, or self-hosted fonts.
- **Don't** uppercase or letter-space text into labels; headings stay sentence case.
- **Don't** use saturated reds, mint, neon or gradients; the old calendar red (#c8281d) is retired.
- **Don't** add decorative icons, icon tiles beside rows, status pills or extra badges; glyphs appear only where they are the control (tabs, add, search, swipe Done).
- **Don't** add dashboard panels, metric tiles, progress rings or live seconds-ticking timers.
- **Don't** use pure black text or a pure white page background.
- **Don't** give in-page rows or groups more than the 1px group whisper shadow, and don't use bounce or overshoot easing.
