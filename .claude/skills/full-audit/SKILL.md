---
name: full-audit
description: Run a full audit of the Croydon Chicken Mile website (Astro static site, no backend) covering test coverage (unit + e2e gaps), accessibility, performance, SEO, responsive/UX, security, code quality (typing, duplication, bad patterns, dead code), and content/feature accuracy. Appends new findings to a persistent AUDIT.md checklist in the repo (existing checked-off items are preserved). Use when the user asks to audit, review the health of, or find improvements for the whole site — not for reviewing a single PR/diff (use /code-review for that).
---

# Full site audit

Produces a holistic health report for the Croydon Chicken Mile site: a single-page **Astro**
static site (TypeScript, no backend/API, no database) that lists Croydon's fried chicken shops,
deployed to Vercel at `croydonchickenmile.co.uk`. This is NOT a PR/diff review — lint
(`yarn lint` / Biome), type-checking (`yarn ts-check` / `astro check`), unit tests (`yarn test` /
Vitest), e2e tests (`yarn test:e2e` / Playwright), a homepage axe a11y check, and dead-code/unused
dependency detection (`yarn knip`) are already enforced as CI gates on every PR (see
`.github/workflows/ci.yml`), so **do not re-check whether the app lints/type-checks/builds/passes
existing tests/has knip violations — it already does**. This audit looks at things no single PR's
gates catch: coverage gaps in flows nobody's written a spec for, a11y beyond the one axe run on
`/`, performance/SEO/security concerns that don't have automated checks at all, cross-cutting
visual/UX quality, and code quality patterns that a passing lint/knip run doesn't guarantee (e.g.
duplicated markup across `.astro` components, or unsafe `any` casts — see category 8).

## When to run this

User asks to "audit the site", "find ways to improve the website", "do a full review of the
app", or similar whole-site requests. If they ask about a single PR or the current diff, use
`/code-review` instead.

## Output

Findings live in a single persistent file at the repo root: **`AUDIT.md`**. This is not a
one-off report — it's a living checklist that accumulates across runs. Each run **appends**,
never replaces:

- `AUDIT.md` has one `## <n>. <Category>` section per category below, in the same order, each
  containing a flat markdown checklist (`- [ ] finding text (found: YYYY-MM-DD)`).
- **Before writing anything**, read the current `AUDIT.md` in full (create it from the template
  below if it doesn't exist yet).
- For each category, compare this run's findings against what's already listed in that section:
  - If a finding already exists (same issue, same file/route — wording may differ slightly),
    **do not duplicate it**. Leave the existing line untouched.
  - If an existing unchecked item no longer reproduces (verify, don't assume — re-check it),
    check it off and add `(resolved: YYYY-MM-DD, verified during audit)` rather than deleting
    the line, so there's a record.
  - **Never touch a line that's already checked off (`- [x]`)** — those are the user's own
    record of completed work. Leave them exactly as-is, in place.
  - Genuinely new findings get appended to the bottom of that section's list as new `- [ ]`
    items, dated.
- Add a line to the `## Run log` section at the top with today's date and a one-line summary
  (e.g. "2026-08-30 — 4 new findings (2 a11y, 1 security, 1 code quality), 1 item resolved").
- Do not renumber, reorder, or rewrite prose outside the checklists — this file is meant to be
  readable as a diff over time.

Do not modify application code during the audit unless the user explicitly asks you to fix
something after seeing the report — this skill is read-only/diagnostic aside from editing
`AUDIT.md` itself.

### AUDIT.md template (use this structure if the file doesn't exist yet)

```markdown
# Site Audit

Living checklist maintained by the `/full-audit` skill. Findings are appended, never rewritten;
check an item off (`- [x]`) once you've fixed it and it won't be touched again. Re-running the
audit adds new findings to the bottom of each section and leaves checked items alone.

## Run log

- YYYY-MM-DD — initial audit

## 1. Test coverage — unit gaps and e2e

## 2. Accessibility

## 3. Performance

## 4. SEO / metadata

## 5. Responsive / UX

## 6. Security

## 7. Content & feature accuracy

## 8. Code quality
```

## How to run it

Fan out the categories below as parallel forks or a general-purpose subagent per category (they
are independent and read-heavy — keep the raw output out of your main context). Have each one
**report findings back as text**, not write to `AUDIT.md` directly — only you should touch that
file, in a single merge pass at the end, so the dedup/checked-item rules above are applied
consistently in one place. Categories needing the browser (a11y/perf/responsive/e2e-walkthrough)
should run together in one browser-driving pass since they all need the site running.

Before starting, check whether a dev server is already running; if not, start it yourself with
`yarn dev` (Astro dev server, port 4321) for the duration of the audit, and stop it when done
unless the user is already running it. There is no backend process to manage — this is a static
site.

### 1. Test coverage — unit gaps and e2e

- Run `yarn test` (Vitest) and note whether coverage reporting is configured at all
  (`vitest.config.ts`) — if not, treat "no coverage reporting" as a finding, then manually assess
  which non-trivial logic is untested. Current unit coverage is thin: `src/tests/index.test.ts`
  covers the map-marker derivation logic, and `src/components/RestaurantCard.test.ts` covers the
  card component — check whether `LeafletMap.astro`, `WheelOfFortune.astro`, and `Chicken.astro`
  have any logic (client-side scripts, data transforms) that should have unit coverage but
  doesn't.
- **E2e coverage**: Playwright specs already exist under `e2e/` (homepage, about, footer, map,
  restaurant-cards, seo, a11y) and run in CI — don't re-list what they already cover. Re-verify,
  don't assume, then look for gaps such as:
  - The "Wheel of Fortune" feature (`WheelOfFortune.astro`) — is there any e2e spec exercising
    it (spin interaction, result display, keyboard operability)? As of writing there is none.
  - Nav/scroll-link coverage beyond the single "The Mile" link tested in `homepage.spec.ts`.
  - Broken-image / missing-data fallback behavior for restaurant cards beyond the one
    placeholder-image case already tested.
  For each gap, report whether it currently has any coverage (unit or e2e) and recommend a
  specific new spec file/test name rather than a vague "add more e2e tests".

### 2. Accessibility

- The only automated a11y check in CI is `@axe-core/playwright` against the homepage
  (`e2e/a11y.spec.ts`) — treat that as already covered, and look for what it can't catch:
  interactive-state issues (axe only inspects DOM at analyze time, not mid-interaction).
- Manual/interactive checks via `claude-in-chrome`: keyboard operability of the Wheel of Fortune,
  keyboard/focus behavior of Leaflet map markers and popups, focus order through the nav ->
  sections -> footer, color contrast on badges (`.badge`) and stat numbers, whether the map
  region and restaurant list have appropriate ARIA roles/labels for screen readers.
- Confirm the `accented` dev dependency (an accessibility outline/dev-tool package) isn't
  something that should also be wired into CI, or is unused entirely (cross-reference with
  category 8's dead-code check).

### 3. Performance

- Lighthouse performance score and Core Web Vitals (LCP, CLS, INP) against both the local
  `yarn preview` build and the live deployment at `https://croydonchickenmile.co.uk`.
- Astro build output: bundle size of client-side JS (Leaflet is the heaviest dependency — check
  it's only loaded when the map scrolls into view, not eagerly on page load), image weight in
  `public/images/`, whether images use modern formats/responsive `srcset` via Astro's image
  tooling, render-blocking resources (fonts, CSS).
- Since this is a static site on Vercel there's no server response time to check — skip
  backend-style checks entirely.

### 4. SEO / metadata

- `e2e/seo.spec.ts` already asserts title, meta description, canonical URL, Open Graph tags,
  Twitter card tags, and JSON-LD structured data presence/shape — don't re-report what's already
  tested and passing. Look instead at what isn't asserted: sitemap.xml content (generated via
  `@astrojs/sitemap`) actually being valid and reachable at `/sitemap-index.xml`, `robots.txt`
  content (`public/robots.txt`) referencing the sitemap correctly, semantic heading structure
  (single `<h1>`, logical `<h2>`/`<h3>` nesting across sections), and whether JSON-LD data (16
  `FoodEstablishment` items) matches what Google's Rich Results Test would accept.

### 5. Responsive / UX

- Screenshot the homepage at ~375px and ~1280px via `claude-in-chrome`, paying particular
  attention to the map section, restaurant card grid, and Wheel of Fortune (these are the most
  layout-complex parts of an otherwise simple single page) — look for anything that's drifted
  from a per-PR spot check.
- Console errors on load/scroll (`read_console_messages`), especially around Leaflet's lazy
  init and the wheel's canvas/animation code, broken image links, dead-end states (e.g. a
  restaurant card with no address or coordinates).

### 6. Security

- This is a static site with no auth, sessions, or server-side secrets — skip anything
  session/CORS/backend related.
- `vercel.json` already sets CSP, HSTS, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, and Permissions-Policy — verify these headers are actually present on the
  live deployed response (not just declared in config), and that the CSP's allow-list
  (`*.tile.openstreetmap.org`, `va.vercel-scripts.com`, `vercel.live`, Google Fonts) is still
  accurate and not broader than what the site actually uses.
- Dependency vulnerabilities: `yarn audit`, or check Renovate's open PR backlog (`renovate.json`
  is configured) for any long-stale security-relevant updates.
- Confirm no API keys, tokens, or analytics IDs are hardcoded client-side beyond what's expected
  to be public (e.g. Vercel Web Analytics is expected to be client-visible).

### 7. Content & feature accuracy

There's no `ROADMAP.md` in this repo, so this category checks the site's own claims about
itself rather than a roadmap doc:

- Cross-check hardcoded stats in the About section (`e2e/about.spec.ts` pins "16" chicken shops,
  "1" glorious mile, "0" regrets) against the actual restaurant data source — if a restaurant is
  added/removed, do these numbers get updated in the same PR, or could they silently drift out
  of sync? Flag if the count isn't derived from the data at build/render time.
- Cross-check README.md's description of the tech stack and commands table against
  `package.json` scripts and actual dependencies — flag anything listed that's stale (e.g. a
  command that no longer exists, a tool mentioned but removed).
- Spot-check a sample of restaurant entries (address, badge claims like "4am" late-night) for
  plausibility/staleness if there's any indication data hasn't been reviewed recently.

### 8. Code quality

A passing lint/type-check/knip run only proves the code compiles cleanly, has no unused
exports Knip can detect, and satisfies Biome's rule set — not that it's precisely typed,
non-duplicated, or free of subtler dead weight. That's what this category covers.

- **Typing** — explicit `any`, unsafe `as Type` casts, missing/loose types on props interfaces
  in `.astro` components' frontmatter, non-null assertions (`!`) that could be a proper guard,
  loosely-typed restaurant/data shapes that should be a shared `interface`/`type` instead of
  inline object shapes repeated per file.
- **Code duplication** — repeated markup or logic across `src/components/*.astro` files (e.g.
  card layout patterns, badge rendering), restaurant data or coordinate values duplicated
  between components instead of sourced from one place, near-identical Playwright spec
  boilerplate across `e2e/*.spec.ts` files that could share a helper/fixture.
- **Bad patterns** — inline `<script>` blocks in `.astro` files doing non-trivial logic that
  would be clearer (and testable) as an imported TS module, magic numbers/strings (e.g.
  restaurant counts, coordinates, timeouts) that should be named constants, inline `style=`
  attributes that should be CSS classes, large inline functions obscuring intent.
- **Dead code** — Knip already runs in CI and catches unused exports/files/dependencies, so
  don't re-run it as a "finding" on its own; instead look for what Knip categorically can't
  catch — unused CSS classes/selectors left behind after markup changes, commented-out code
  blocks, leftover fixture/sample data no longer referenced by any component or test.

## Notes

- This is a personal/small project — keep findings proportionate. Don't recommend enterprise-
  scale tooling (e.g. a full visual-regression pipeline) as a "blocker"; note it as a "nice to
  have" instead unless it's actually broken for a real user.
- Cite every finding with a route, file:line, or screenshot — no vague "could be improved"
  entries.
- **Every checklist item must be independently reviewable as one small PR** — same spirit as
  this repo's CI enforcing small, focused changes. If a finding is actually a bundle of
  unrelated or large changes (e.g. "add e2e coverage for the Wheel of Fortune", "improve
  accessibility across the site", "audit all restaurant data"), split it into several separate
  `- [ ]` lines, each scoped to a single reviewable change (e.g. one line per new spec, one line
  per a11y fix, one line per stale data item). Never write a checklist item a reviewer couldn't
  approve or reject on its own without also weighing in on unrelated changes bundled into it.
