---
description: Review the app for performance improvements and create GitHub issues
allowed-tools: Bash, Read, Glob, Grep
---

You are a performance engineer auditing a static Astro site for real-world performance gains. Your job is to find issues worth fixing, then log them as GitHub issues. If there is nothing worth improving, say so explicitly and stop — do not manufacture findings.

## Stack

- Astro 4 with TypeScript strict mode
- Static site — HTML/CSS/JS output, no SSR, no external APIs at runtime
- Source files: `src/components/`, `src/layouts/`, `src/pages/`
- Package manager: yarn

## Step 1 — Audit

Read all source files and assess the following performance categories. For each, note actual findings — not hypotheticals.

### Categories to check

**Images**
- `<img>` tags missing `loading="lazy"` (below-the-fold images)
- `<img>` tags missing explicit `width` and `height` (causes layout shift / CLS)
- Images using formats that could be WebP or AVIF
- Large inline SVGs that could be extracted and reused

**CSS**
- Render-blocking stylesheets in `<head>` that could be deferred or inlined
- Unused CSS custom properties or large unused style blocks
- Animations or transitions that force layout (avoid animating `width`, `height`, `top`, `left` — prefer `transform` and `opacity`)
- Missing `will-change` hints on animated elements where appropriate

**JavaScript**
- `<script>` tags without `defer` or `async` in `<head>`
- Inline scripts doing expensive DOM work on page load
- Event listeners not removed when components unmount (memory leaks)
- Large inlined scripts that could be split or deferred

**Fonts**
- Google Fonts or external font loads missing `preconnect` or `dns-prefetch` hints
- Font loading not using `font-display: swap` or similar
- Missing `<link rel="preload">` for above-the-fold fonts

**Network / Document**
- Missing `<meta>` viewport tag
- Missing `<link rel="preconnect">` for third-party origins (analytics, CDN)
- No resource hints for critical assets

**Rendering**
- Elements that repaint heavily (e.g. animated gradients, box-shadow animations)
- Ticker/marquee elements using `animation` — check for `transform: translateX` vs layout-triggering properties
- Scroll-related JS without `passive: true` event listener option

Read these files specifically:
- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/components/RestaurantCard.astro`
- `src/components/Chicken.astro`
- `src/components/LeafletMap.astro` (if present)

## Step 2 — Classify findings

Separate findings into two buckets:

**Minor** — low-effort, low-risk, small gains (e.g. adding `loading="lazy"`, adding `defer`, fixing `font-display`). These can go on a single consolidated issue.

**Significant** — higher effort or higher impact (e.g. layout shift from missing image dimensions, render-blocking resources, animation performance affecting 60fps). Each gets its own issue.

If there are no findings worth acting on, state that clearly and stop. Do not create issues for theoretical or negligible problems.

## Step 3 — Create GitHub issues

### For significant findings — one issue each:

```bash
gh issue create \
  --title "<specific performance problem>" \
  --label "performance" \
  --body "## Performance Finding

**Category:** <Images / CSS / JavaScript / Fonts / Network / Rendering>
**File:** <path:line>
**Problem:** <what the issue is and why it affects performance>
**Fix:** <concrete change to make>
**Expected gain:** <what improves — LCP, CLS, FID, paint time, etc.>"
```

### For minor findings — one consolidated issue:

```bash
gh issue create \
  --title "Minor performance improvements" \
  --label "performance" \
  --body "## Minor Performance Improvements

A collection of small, low-risk performance fixes:

<for each finding:>
- **<file:line>** — <one-line description of fix>"
```

Only create the consolidated issue if there are 2+ minor findings. A single minor finding can be noted in the report but does not need its own issue.

## Step 4 — Report

Output exactly this structure:

```
## Performance audit

**Significant findings:** <count or "none">
**Minor findings:** <count or "none">

### Significant
<list each with file:line and one-sentence description, or "None">

### Minor
<list each with file:line and one-sentence description, or "None">

### Issues created
<list issue URLs, or "No issues created — nothing worth flagging">
```

## Known project patterns

- **Ticker animation:** The scrolling ticker in `index.astro` uses CSS animation — check it animates `transform` not `left`/`margin`
- **Chicken SVG:** `Chicken.astro` is an inline SVG — if it appears many times it could be a `<use>` reference instead
- **Leaflet map:** `LeafletMap.astro` loads Leaflet (external JS/CSS) — check for preconnect hints and whether it defers load
- **Google Fonts:** Likely loaded in `Layout.astro` — verify `preconnect` and `font-display: swap`
- **Restaurant cards:** `RestaurantCard.astro` renders 8+ times — any per-card inefficiency multiplies
- **Static site:** No SSR, so TTFB is typically excellent — focus on client-side paint metrics (LCP, CLS, FID/INP)
