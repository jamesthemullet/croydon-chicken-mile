---
description: Incrementally improve unit or e2e test coverage for this Astro project
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

This is an Astro project using Vitest for unit tests and Playwright for e2e tests. Package manager is yarn.

Each invocation finds **one meaningful improvement** to make — a missing test file, an uncovered branch, or a new e2e journey — and implements it. If coverage is already solid and nothing justifiable can be added, report that clearly and stop.

---

## Step 1: Assess current state

Run the unit test suite:
```bash
yarn test 2>&1
```

Check what unit test files exist:
```bash
find src -name "*.test.ts" -o -name "*.test.tsx" 2>&1
```

Check whether Playwright is installed and what e2e specs exist:
```bash
ls node_modules/.bin/playwright 2>/dev/null && echo "installed" || echo "not installed"
find e2e -name "*.spec.ts" 2>/dev/null || echo "no e2e specs found"
```

Read the source components to understand what logic and behaviour exists but isn't yet tested:
- `src/components/RestaurantCard.astro`
- `src/components/Chicken.astro`
- `src/pages/index.astro` (if it exists)

---

## Step 2: Choose one improvement

Pick whichever gives the most value. In priority order:

**A — Set up Playwright (if not installed)**
Install it, create `playwright.config.ts`, write 2–3 initial e2e specs covering the most important journeys.

**B — Add a missing unit test file**
For any component with frontmatter logic that has no test file yet.

**C — Extend an existing unit test file**
Add cases for untested branches or edge cases in an already-tested component.

**D — Add an e2e spec (if Playwright is installed)**
Write a new `*.spec.ts` covering a user journey not yet tested.

**E — Nothing to add**
If all components are well tested and e2e covers the main journeys, report that explicitly and stop. Do not manufacture low-value tests.

State your choice and one-sentence reasoning before implementing.

---

## Step 3: Implement

### Unit tests
- Place files next to the component: `ComponentName.test.ts`
- Astro frontmatter logic (e.g. the `drumsticks` array) can be extracted and tested directly — no DOM needed
- Use `describe`, `it`, `expect` from `vitest`
- Test logic correctness, edge cases, and any derived values

### Playwright setup (if not installed)
```bash
yarn add -D @playwright/test
npx playwright install --with-deps chromium
```
Create `playwright.config.ts` pointing at `http://localhost:4321`. Add to `package.json`:
```json
"test:e2e": "playwright test"
```
Write initial specs under `e2e/`.

### E2e specs
- Place under `e2e/`, named `journey-name.spec.ts`
- Import from `@playwright/test`
- Focus on: page loads, key content visible, aria labels present, critical user paths
- The dev server must be running (`yarn dev`) for e2e tests to execute — note this in your report

---

## Step 4: Verify

Run the new tests and confirm they pass before reporting:
```bash
# Unit:
yarn test 2>&1

# E2e (requires dev server):
yarn test:e2e 2>&1
```

Fix any failures before reporting back.

---

## Step 5: Commit and open a PR

Stage and commit only the new or modified test files, then push and open a pull request targeting `main`:

```bash
git add <test files>
git commit -m "<short description of what was tested and why>"
git push -u origin HEAD
gh pr create --title "<short title>" --body "$(cat <<'EOF'
## Summary
- <what was added and why>

## Test plan
- Tests pass: `yarn test` / `yarn test:e2e`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Return the PR URL.

---

## Step 6: Report

- What you chose and why
- File(s) created or modified
- Tests added and whether they pass
- A suggested next target (or "coverage looks complete")

Keep it short — two or three sentences plus specifics.

---

## Project context

- Components: `src/components/RestaurantCard.astro` (rating/drumstick logic, badge, address), `Chicken.astro` (SVG), `Layout.astro`
- Existing unit tests: `src/components/RestaurantCard.test.ts`
- Astro dev server: `http://localhost:4321`
- Linting: `yarn lint` (Biome), type-check: `yarn ts-check`
