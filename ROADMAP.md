# Product Roadmap — Croydon Chicken Mile

The entire site is currently one page — a Leaflet map and a list of shops in `index.astro`. The
biggest lever is giving each shop its own shareable, crawlable page, the same way the site's
map already treats each one as a distinct point. Everything below is scored against four jobs:

- **Acquisition** — brings new visitors in
- **Engagement** — deepens a single visit
- **Retention** — earns a repeat visit
- **Fun** — no metric, just delight

Every feature is broken into a **PR sequence** — each step small enough for a human to review in
about 15 minutes. Genuinely atomic changes are left as one PR.

## Now (ship in weeks — reuses existing infra)

### 1. Individual shop pages — *Acquisition, Fun*
Each chicken shop gets its own URL, not just a map marker and a list entry.

1. **One PR.** Static per-shop pages under `chicken-shop/[slug].astro`, built from whatever shop
   data already backs `index.astro`'s list/map — self-contained, reuses existing content.

### 2. Share button — *Acquisition, Fun*
A one-tap share link on each shop page (depends on feature 1 existing first).

1. **One PR.** A share component using the Web Share API with a URL/text fallback, added to the
   shop page template from feature 1.

### 3. Shop structured data — *SEO, Acquisition*
LocalBusiness/Restaurant structured data on each shop page so it can surface directly in search.

1. **One PR.** A single JSON-LD block added to the shop page template — no new logic.

## Next (this quarter — more content, needs more shops written up first)

### 4. More shops — *Acquisition, Fun*
The roadmap's biggest lever beyond structure is simply more content — more shops written up in
the site's tongue-in-cheek voice.

1. **Not a PR — a content task.** Write up any chicken shops on the mile not yet covered, in the
   existing voice. Raise as a GitHub issue rather than a PR, since it's editorial writing, not
   code.

### 5. "Tourist board crossover" link — *Acquisition*
A simple outbound link/mention connecting to the standalone `croydon-tourist-board` site, if the
user wants the two connected.

1. **One PR, only once confirmed with the user** — don't assume the two sites should cross-link
   without asking first, since they're separate repos with no shared infra today.

---
*Croydon Chicken Mile — product roadmap, 2 September 2026*
