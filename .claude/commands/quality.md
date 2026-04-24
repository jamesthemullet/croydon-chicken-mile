---
description: Incrementally improve code quality for this Astro project
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

You are running an incremental code quality improvement session for this Astro / TypeScript static site.

## Stack
- Astro with TypeScript strict mode (`tsconfig.json` extends `astro/tsconfigs/strict`)
- Frontmatter TypeScript in `.astro` files — `Props` interfaces, typed destructuring
- Scoped `<style>` blocks in Astro components (no CSS-in-JS)
- Biome for linting (`yarn lint` / `yarn lint:fix`)
- Source files: `src/components/`, `src/layouts/`, `src/pages/`

## What to do each invocation

### Step 1 — Pick a category

Use the current second of the clock (or any arbitrary signal) to pick **one** of these four categories. Vary the selection — do not always pick the same one:

1. **Strict typing** — look for: missing `Props` interface on a component, implicit `any` in frontmatter logic, missing return types on frontmatter functions, unsafe type assertions, props not destructured with types
2. **Inline styles** — look for: `style=` attributes on elements where a named CSS class already exists or should exist, magic colour or spacing values inlined directly on elements rather than using the CSS custom properties defined in `Layout.astro` (e.g. `--red`, `--yellow`, `--dark`, `--cream`, `--brown`, `--orange`, `--white`, `--yellow-light`, `--red-dark`)
3. **Accessibility** — look for: interactive elements missing `aria-label`, images or decorative elements missing `aria-hidden`, missing `role` attributes, low-contrast or visually-only content not conveyed to screen readers, landmark regions not labelled
4. **Dead code / stale placeholders** — look for: commented-out code blocks, placeholder text or `<div>` stubs that should be removed or implemented, unused CSS selectors, imports not referenced in the template

### Step 2 — Find the best candidate

Read the relevant source files in `src/components/`, `src/layouts/`, and `src/pages/`. Identify the **single clearest, most impactful** instance of the chosen category. Prefer issues that:
- Are in frequently-rendered files (e.g. `RestaurantCard.astro` renders 8 times)
- Have an unambiguous fix
- Won't require changes across many files

### Step 3 — Fix it

Make the fix. Keep scope tight — one issue, one or two files. Do not refactor beyond what is needed to address the specific finding.

After fixing, run the linter to confirm no new errors are introduced:
```bash
yarn lint 2>&1
```

If linting fails, fix the issue before reporting.

### Step 4 — Report

Output exactly this structure:

```
## Quality improvement

**Category:** <chosen category name>
**File:** <path:line>
**Issue:** <one sentence describing the problem>
**Fix:** <what was changed and why>
**Next suggestion:** <the next candidate worth tackling in this category, with file path>
```

## Known project patterns

- **CSS custom properties:** Colours and key values are defined as CSS custom properties in `src/layouts/Layout.astro` (`--red`, `--yellow`, `--dark`, `--cream`, `--brown`, `--orange`, `--white`, `--yellow-light`, `--red-dark`) — inline hex/rgb values that duplicate these are a smell
- **Scoped styles:** Each Astro component has a `<style>` block for its own scoped CSS — component-level styles should live there, not as `style=` attributes
- **Astro `class:list`:** Already used in `RestaurantCard.astro` for conditional classes — prefer this over inline `style=` for toggling visual states
- **`aria-hidden="true"`** is correctly used on the hero stripes and ticker in `index.astro` — this is intentional and not a finding
- **Placeholder content:** The map section and restaurant data in `index.astro` are intentional placeholders — do not flag the placeholder text itself, only structural/code issues around it
- **Biome rules:** `noUnusedVariables` and `noUnusedImports` are turned off in `biome.json` — dead import findings must be verified manually, not just assumed from linter silence
