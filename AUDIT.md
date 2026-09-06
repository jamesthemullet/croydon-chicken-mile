# Site Audit

Living checklist maintained by the `/full-audit` skill. Findings are appended, never rewritten;
check an item off (`- [x]`) once you've fixed it and it won't be touched again. Re-running the
audit adds new findings to the bottom of each section and leaves checked items alone.

## Run log

- 2026-09-01 — initial audit: 34 findings (8 test coverage, 7 accessibility, 2 performance, 2 SEO, 2 responsive/UX, 3 security, 7 content accuracy, 11 code quality — note some findings span more than one item; totals are approximate)

## 1. Test coverage — unit gaps and e2e

- [ ] No coverage reporting configured for Vitest — `vitest.config.ts` has no `test.coverage` block, so no coverage % is ever produced. Add a `test.coverage` block (provider `v8`), `@vitest/coverage-v8` devDependency, and a `test:coverage` script. (found: 2026-09-01)
- [ ] `WheelOfFortune.astro`'s spin logic has zero unit coverage — extract and unit-test the target-angle calculation (`spin()`, `WheelOfFortune.astro:134-168`) and result-text formatting in a new `src/components/WheelOfFortune.test.ts`. (found: 2026-09-01)
- [ ] `WheelOfFortune.astro` has zero e2e coverage — no spec exercises spin interaction, result display, or keyboard operability. Add `e2e/wheel-of-fortune.spec.ts` covering: open modal via `#oracle-trigger`, click `#spin-btn`, wait for `#result-card` to populate, verify `#spin-btn` disabled mid-spin, verify Escape/backdrop-click close the modal. (found: 2026-09-01)
- [ ] The nav "About" link (`nav a[href="#about"]`) is never clicked in any e2e spec — only "The Mile" link is tested in `e2e/homepage.spec.ts:15-19`. Add a test clicking it and asserting the About heading scrolls into view. (found: 2026-09-01)
- [ ] The hero CTA button (`<a href="#the-mile" class="cta-btn">`, `index.astro:208`) is never clicked in any e2e spec. Add a test clicking it and asserting scroll to `#the-mile`. (found: 2026-09-01)
- [ ] No test covers a restaurant card whose `image` prop is set but the URL fails to load (only the "no image at all" placeholder case is tested, `e2e/restaurant-cards.spec.ts:39-44`); `RestaurantCard.astro` also has no `onerror` fallback for this case at all. Decide whether to add an `onerror` fallback plus a matching e2e test with a broken image URL. (found: 2026-09-01)
- [ ] No unit test covers the Google Maps `href` construction (`encodeURIComponent` of name+address) in `RestaurantCard.astro:30`. Add a unit test asserting correct escaping (spaces, apostrophes as in "Sam's"). (found: 2026-09-01)
- [ ] `LeafletMap.astro:31-34`'s marker/center/zoom parsing-with-fallback logic (`JSON.parse` of `data-markers`/`data-center`, `parseInt` of `data-zoom`) has no unit tests. Extract and add `src/components/LeafletMap.test.ts` covering malformed JSON / missing dataset attributes. (found: 2026-09-01)

## 2. Accessibility

- [ ] Leaflet map markers have no accessible name — `LeafletMap.astro` builds markers with `L.divIcon({ html: "🍗", ... })`, so all 16 markers expose as unlabeled buttons to screen readers (keyboard Tab+Enter to open a popup does work). Add `aria-label`/`alt` per marker (e.g. via `L.marker(..., {alt: name})` or labelled divIcon markup). (found: 2026-09-01)
- [ ] Wheel of Fortune modal (`WheelOfFortune.astro`) has `role="dialog" aria-modal="true"` but no focus trap — confirmed Tab from inside the open modal moves focus to a background nav link, scrolling the page behind the still-open dialog. Move focus into the dialog on open and trap Tab/Shift+Tab within it; restore focus to the trigger on close. (found: 2026-09-01)
- [x] Wheel of Fortune spin result isn't announced to screen readers — `showResult()` just unhides `#result-card` with no `aria-live`/`role="status"`. Add `aria-live="polite"` to `#result-card`. (found: 2026-09-01) (resolved: 2026-09-03)
- [ ] `.stat-label` text fails WCAG AA contrast — measured `rgb(255,248,238)` on `rgb(232,33,10)` at 13.6px/700 weight = 4.28:1 (needs 4.5:1 for non-large text). Lighten the label color or darken the card background. (found: 2026-09-01)
- [ ] `.stat-number` contrast is borderline — `rgb(255,208,0)` on `rgb(232,33,10)` at 56px/400 weight = 3.07:1, just above the 3:1 large-text minimum with almost no margin. Consider nudging the palette for more headroom. (found: 2026-09-01)
- [ ] The `accented` a11y dev-tool devDependency is gated behind `PUBLIC_ENABLE_ACCENTED`, which is never set anywhere in the repo (no `.env*`, CI config, or script sets it) — it currently does nothing in dev or CI. Either wire the env var into the dev script or drop the dependency. (found: 2026-09-01)

## 3. Performance

- [ ] Leaflet's JS/CSS bundle loads eagerly via static top-level `import L from "leaflet"` / `import "leaflet/dist/leaflet.css"` in `LeafletMap.astro`, even though map *initialization* is correctly deferred via `IntersectionObserver`. The library bytes still download on every page load. Move the import inside the observer callback as a dynamic `await import("leaflet")`. (found: 2026-09-01)
- [ ] Restaurant photos in `public/images/` are unoptimized raw `.jpg` files (548KB–763KB each: `poor-boys-boxpark.jpg`, `raps-boxpark.jpg`, `rios-piri-piri.jpg`, `sams.jpg`) rendered at only 400×140 in `RestaurantCard.astro` — roughly 10-20x larger than needed, no webp/avif, no `astro:assets`/`<Image>` usage. Compress or convert to webp. (found: 2026-09-01)

## 4. SEO / metadata

- [ ] JSON-LD `FoodEstablishment` items (`index.astro:161-183`) are missing fields Google's Local Business guidelines recommend: `image` (data already has `r.image`, just not included in the schema), `servesCuisine`, `url`, `telephone`, `priceRange`, `@id`. Extend the JSON-LD mapping to include at least `image` and `servesCuisine: r.specialty`. Note: as a single-page `ItemList` of businesses rather than one `LocalBusiness` per page, this markup is unlikely to produce a visible Search rich-result regardless — flag if per-restaurant pages become a future goal. (found: 2026-09-01)
- [ ] `og:url` is not asserted in `e2e/seo.spec.ts` (only `og:title`, `og:description`, `og:image`, `og:locale` are checked). Add an assertion that `og:url` equals `https://croydonchickenmile.co.uk/`. (found: 2026-09-01)

## 5. Responsive / UX

- [ ] `#chicken-map` has a fixed `height: 560px` with no mobile override — the only sitewide `@media (max-width: 768px)` block (in `index.astro`) doesn't touch it. On a short phone viewport this could occupy most/all of the visible screen. Add a reduced-height rule under the existing breakpoint. (found: 2026-09-01)
- [ ] `.about-stats` (`grid-template-columns: 1fr 1fr`) isn't covered by the sitewide `@media (max-width: 768px)` block either, unlike `.about-inner`/`.footer-inner` which do collapse to one column there — likely fine at typical widths but unverified on narrow phones; worth a manual check. (found: 2026-09-01)

## 6. Security

- [ ] CSP's `script-src` and `style-src` both include `'unsafe-inline'` (`vercel.json:13`), significantly weakening XSS protection with no nonce/hash-based alternative in place. Evaluate moving to nonces/hashes for inline scripts and styles. (found: 2026-09-01)
- [ ] Live response includes `Access-Control-Allow-Origin: *`, which isn't declared anywhere in `vercel.json` — likely a Vercel platform default for static assets given there are no API routes, but worth confirming it isn't exposing anything unintended. (found: 2026-09-01)
- [ ] `package.json` has no `license` field (flagged by `yarn audit`'s warning output) — minor packaging hygiene gap, not a vulnerability. (found: 2026-09-01)

## 7. Content & feature accuracy

- [x] The "16 Chicken Shops" stat (`index.astro:255`) is a hardcoded literal, not derived from `restaurants.length` — currently correct but will silently drift if a restaurant is added/removed. Render `{restaurants.length}` instead. (found: 2026-09-01) (resolved: 2026-09-01)
- [ ] `e2e/about.spec.ts:14-19` asserts the stat text equals the hardcoded string `"16"`, duplicating (and only coincidentally matching) the separate drift-safe test at `about.spec.ts:21-29` that compares the stat against the actual rendered card count. Remove the hardcoded-value test in favor of the dynamic-comparison one. (found: 2026-09-01)
- [ ] `README.md`'s tech stack section (`README.md:27-31`) omits Playwright, `@axe-core/playwright`, Leaflet, `@astrojs/vercel`, `@vercel/analytics`, and Knip, despite all being real dependencies with meaningful roles in the project. Update the tech stack list. (found: 2026-09-01)
- [ ] `README.md`'s commands table (`README.md:16-25`) omits `test:e2e`, `knip`, and `lint:errors`, all of which exist in `package.json`. Add rows for them. (found: 2026-09-01)
- [ ] Sam's "4am close on Fri/Sat" badge claim (`index.astro:34`) has no data-freshness mechanism or source citation in the repo — worth periodically reverifying against the real business, since it's a specific, checkable claim. (found: 2026-09-01)
- [ ] Dave's Hot Chicken (`index.astro:47-54`) is the only restaurant entry with no `image` field — worth sourcing a photo if the placeholder is unintentional. (found: 2026-09-01)
- [ ] Only 4 of the 16 restaurant entries have real photos (the rest use the CSS placeholder) — a content-completeness gap worth flagging to the site owner if more photos become available. (found: 2026-09-01)

## 8. Code quality

- [ ] `src/components/RestaurantCard.test.ts:1-29` unit-tests a `makeDrumsticks(rating)` function that doesn't exist in `RestaurantCard.astro` — the component's `Props` interface has no `rating` field and there's no drumstick markup anywhere. This is a passing test for code that was removed or never shipped; Knip won't catch it since the file is still referenced. Delete the test, or wire the real function into the component if drumstick ratings are a planned feature. (found: 2026-09-01)
- [ ] `src/tests/index.test.ts:4-12` reimplements the `mapMarkers` filter/map logic from `index.astro:145-152` as local copies rather than importing the real logic, so the test can silently drift from production behavior. Extract the derivation into an importable helper (e.g. `src/lib/restaurants.ts`) used by both `index.astro` and the test. (found: 2026-09-01)
- [ ] `RestaurantCard.astro`, `WheelOfFortune.astro`, and `LeafletMap.astro` each independently declare their own overlapping restaurant-shaped interface (`Props`, `Restaurant`, `Marker`) instead of sharing one type; there's no `src/types.ts`. Add a shared `Restaurant` interface and derive the others from it via `Pick<...>`. (found: 2026-09-01)
- [ ] `WheelOfFortune.astro` declares the same `Restaurant` interface twice — once in the Astro frontmatter (lines 2-5) and again verbatim inside the `<script>` block (lines 33-36), since the two run in separate compilation contexts. Extract to `src/types.ts` and `import type` it in the script block. (found: 2026-09-01)
- [ ] `WheelOfFortune.astro:39-48` and `LeafletMap.astro:29` cast `document.getElementById`/`querySelector` results with `as HTMLElement`/etc. (and `canvas.getContext('2d')!`) with no runtime null check, so a future markup rename fails silently or throws an unhelpful error at a later call site. Add a small `getEl<T>(id): T` helper that throws a clear error if the element is missing. (found: 2026-09-01)
- [ ] `WheelOfFortune.astro:32-190` (~160 lines) embeds all wheel-drawing, easing/animation, and spin-outcome logic inline in a `<script>` block, making it untestable without string duplication (see the `RestaurantCard.test.ts` phantom-test finding above). Extract pure functions (`computeTargetAngle`, `drawWheel`, `pickWinnerIndex`) to an importable `src/lib/wheel.ts`, keeping only DOM wiring inline. (found: 2026-09-01)
- [ ] The restaurant count (`16`) is hardcoded as a magic literal across `e2e/homepage.spec.ts:24`, `e2e/about.spec.ts:18`, `e2e/map.spec.ts:32`, `e2e/restaurant-cards.spec.ts:9`, and `e2e/seo.spec.ts:66`, instead of being derived from a shared data source the specs can import. Export the restaurant list (or its length) from a shared module for these specs to reference. (found: 2026-09-01)
- [x] `index.astro:329-331` has commented-out markup (a `<p class="small-muted">` referencing "Croydon Tourist Board") left in the production file. Remove it or restore it. (found: 2026-09-01) (resolved: 2026-09-01)
- [ ] The `.footer-left` class is used in markup at `index.astro:314` but has no matching CSS rule anywhere in the file's `<style>` block (only `.footer-right`/`.footer-inner` are styled). Add an explicit rule if styling was intended, or drop the class if vestigial. (found: 2026-09-01)
- [ ] The 16-entry `restaurants` array (`index.astro:8-143`) has no declared type — TS infers a wide shape per object with no compile-time guarantee of consistent fields (e.g. a typo'd `latt:` would silently produce `undefined` at runtime). Give it an explicit `Restaurant[]` type once the shared interface from the duplication finding above exists. (found: 2026-09-01)
- [ ] `index.astro:145-152` filters `r.lat && r.lng` then immediately re-asserts `r.lat as number, r.lng as number` in the same expression — the filter and the cast are two independent sources of truth about "has coordinates." Replace with a typed narrowing helper as part of the `mapMarkers` extraction above. (found: 2026-09-01)
