---
description: Audit and incrementally improve accessibility for this Astro project
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

You are running an incremental accessibility improvement session for this Astro / TypeScript static site.

## Stack
- Astro with TypeScript strict mode (`tsconfig.json` extends `astro/tsconfigs/strict`)
- Scoped `<style>` blocks in Astro components (no CSS-in-JS)
- Biome for linting (`yarn lint` / `yarn lint:fix`)
- Source files: `src/components/`, `src/layouts/`, `src/pages/`

## What to do each invocation

### Step 1 — Pick a category

Use the current second of the clock (or any arbitrary signal) to pick **one** of these five categories. Vary the selection — do not always pick the same one:

1. **Keyboard navigation** — look for: missing `focus` styles on interactive elements, no skip-to-main-content link, tab order issues, interactive elements that are not keyboard-reachable, missing `:focus-visible` outlines
2. **Screen reader support** — look for: decorative emoji or icons not wrapped in `aria-hidden="true"`, emoji used as content without a text alternative, missing `aria-label` on icon-only controls, images with empty or missing `alt` attributes, `<div>`/`<span>` click targets that should be `<button>` or `<a>`
3. **ARIA and semantic HTML** — look for: landmark regions that lack labels (`aria-labelledby` / `aria-label` on `<section>`, `<nav>`, `<header>`), missing `role` attributes where a semantic element would be clearer, incorrect nesting of heading levels (h1 → h2 → h3 skipped), form inputs without associated `<label>`
4. **Colour contrast** — look for: light text on light backgrounds, low-contrast secondary text (e.g. `color: #888`, `color: #999`, `color: #666`), ghost/muted elements that may fail WCAG AA 4.5:1 ratio for normal text or 3:1 for large text. Use the CSS custom properties in `Layout.astro` as your reference palette.
5. **Motion and reduced-motion** — look for: CSS animations or transitions with no `@media (prefers-reduced-motion: reduce)` override, JS-driven animations not gated on `window.matchMedia`, autoplaying marquee/ticker elements with no pause mechanism

### Step 2 — Find the best candidate

Read the relevant source files in `src/components/`, `src/layouts/`, and `src/pages/`. Identify the **single clearest, most impactful** accessibility issue in the chosen category. Prefer issues that:
- Affect frequently-rendered elements (e.g. `RestaurantCard.astro` renders 16 times)
- Are unambiguous WCAG 2.1 AA failures
- Can be fixed without restructuring many files

### Step 3 — Fix it

Make the fix. Keep scope tight — one issue, one or two files. Do not refactor beyond what is needed.

After fixing, run the linter to confirm no new errors:
```bash
yarn lint 2>&1
```

If linting fails, fix the issue before reporting.

### Step 4 — Report

Output exactly this structure:

```
## Accessibility improvement

**Category:** <chosen category name>
**WCAG criterion:** <e.g. 1.1.1 Non-text Content, 2.4.3 Focus Order, 1.4.3 Contrast>
**File:** <path:line>
**Issue:** <one sentence describing the problem and why it fails accessibility>
**Fix:** <what was changed and why>
**Next suggestion:** <the next candidate worth tackling in this category, with file path>
```

## Known project patterns

- **Decorative stripes and ticker:** `aria-hidden="true"` is already set on `.hero-bg-stripes` and `.hero-ticker` in `index.astro` — do not flag these
- **Emoji in content:** Emoji used as visual flair (e.g. 🍗 in the ticker) are already hidden; emoji used as meaningful content (e.g. 📍 address pin, drumstick ratings) must be wrapped with `aria-hidden="true"` and accompanied by visible or visually-hidden text
- **`Chicken.astro`:** This is an inline SVG mascot — it should carry a descriptive `aria-label` and `role="img"` when it appears as meaningful content; `aria-hidden="true"` when purely decorative (e.g. the footer instance)
- **Nav logo:** The `.nav-logo` span (`🍗 CCM`) is a brand mark, not a link — it does not need an `aria-label` unless it becomes interactive
- **Colour palette reference:** Custom properties are defined in `src/layouts/Layout.astro` — `--red: #E8210A`, `--yellow: #FFD000`, `--dark: #1C0A00`, `--cream: #FFF8EE`, `--brown: #3D1C00`. Use these when assessing contrast ratios.
- **Skip link:** There is currently no skip-to-main-content link — this is a valid finding under category 1 (Keyboard navigation), WCAG 2.4.1
- **Reduced-motion:** The `bob` animation on `.hero-chicken` and the `ticker` animation currently have no `prefers-reduced-motion` override — this is a valid finding under category 5
- **Landmark labels:** `<section id="about">`, `<section id="the-mile">`, and `.map-section` are unlabelled landmark regions — screen readers announce them without descriptive names, which is a valid finding under category 3
- **Biome rules:** `noUnusedVariables` and `noUnusedImports` are off in `biome.json` — dead import findings must be verified manually
