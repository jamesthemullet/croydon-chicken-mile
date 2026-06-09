---
description: Review the app for security issues and create GitHub issues
allowed-tools: Bash, Read, Glob, Grep
---

You are a security engineer auditing a static Astro site for real security issues. Your job is to find problems worth fixing, then log them as GitHub issues. If there is nothing worth improving, say so explicitly and stop — do not manufacture findings.

## Stack

- Astro with TypeScript strict mode
- Static site — HTML/CSS/JS output, no SSR, no external APIs at runtime
- Source files: `src/components/`, `src/layouts/`, `src/pages/`
- Package manager: yarn
- Leaflet map loaded from external CDN
- Google Fonts loaded externally

## Step 1 — Audit

Read all source files and assess the following security categories. Flag actual findings only — not theoretical risks that have no realistic attack vector on a static site.

### Files to read

- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/components/RestaurantCard.astro`
- `src/components/LeafletMap.astro`
- `src/components/Chicken.astro`
- `package.json`
- Any config files: `astro.config.mjs`, `biome.json`, `tsconfig.json`

### Categories to check

**Content Security Policy (CSP)**
- Missing or overly permissive `Content-Security-Policy` meta tag in `<head>`
- `unsafe-inline` or `unsafe-eval` in script/style directives without documented necessity
- External origins not explicitly listed (Google Fonts, CDN domains for Leaflet)

**External resource integrity**
- `<script>` or `<link>` tags loading from external CDNs without `integrity` (SRI) and `crossorigin` attributes
- External fonts or stylesheets without subresource integrity checks
- Dynamic `src` or `href` values assembled from untrusted input

**HTML injection / XSS surface**
- Use of `set:html` directive in Astro templates — verify the source is safe static data, not user input
- Template literals constructing HTML strings passed to `innerHTML` or `set:html`
- `dangerouslySetInnerHTML` or equivalent patterns
- Any `eval()`, `Function()`, or `setTimeout`/`setInterval` with string arguments in inline scripts

**Sensitive data exposure**
- API keys, tokens, secrets, or credentials hardcoded in source files or committed config
- `.env` variables referenced in client-side code (Astro exposes `PUBLIC_*` vars to the client — others should not appear in templates)
- Debug output, internal paths, or stack traces rendered to the page

**Dependency exposure**
- Run `yarn audit --level high` and note any HIGH or CRITICAL vulnerabilities
- Check `package.json` for packages known to have had recent supply-chain incidents (broad check, not exhaustive)

**Clickjacking and framing**
- Missing `X-Frame-Options` or `frame-ancestors` CSP directive (relevant if the site is ever deployed with a custom server or CDN that can inject headers)

**Third-party scripts**
- External scripts (analytics, maps, fonts) loaded without `async` or `defer` — not just a performance issue; synchronous third-party scripts are also an XSS vector if the CDN is compromised
- Inline event handlers (`onclick=`, `onload=`) that could be tightened

**Secrets in git history**
- Run `git log --all --full-history --oneline -- "*.env" "*.key" "*.pem" "*.p12"` to surface any committed secret files

## Step 2 — Classify findings

Separate findings into two buckets:

**Major** — high impact or direct attack vector (e.g. missing SRI on external scripts, `set:html` with unvalidated input, hardcoded secrets, HIGH/CRITICAL yarn audit finding). Each gets its own issue and its own PR.

**Minor** — defence-in-depth or best-practice gaps with no direct exploit path in the current setup (e.g. missing CSP meta tag, missing `frame-ancestors`, missing `crossorigin` on a font). These can go on a single consolidated issue.

If there are no findings worth acting on, state that clearly and stop. Do not create issues for risks that cannot be realised on a purely static site with no user input.

## Step 3 — Create GitHub issues

Ensure the `security` label exists before creating issues:
```bash
gh label create security --color "#e11d48" --description "Security finding" 2>/dev/null || true
```

### For major findings — one issue each:

```bash
gh issue create \
  --title "<specific security problem>" \
  --label "security" \
  --body "## Security Finding

**Severity:** Major
**Category:** <CSP / SRI / XSS / Secrets / Dependencies / Other>
**File:** <path:line>
**Problem:** <what the issue is and why it is a security risk>
**Fix:** <concrete change to make>
**References:** <OWASP link or CVE if relevant>"
```

### For minor findings — one consolidated issue:

```bash
gh issue create \
  --title "Minor security hardening improvements" \
  --label "security" \
  --body "## Minor Security Hardening

A collection of low-risk, defence-in-depth security fixes:

<for each finding:>
- **<file:line>** — <one-line description of fix>"
```

Only create the consolidated minor issue if there are 2+ minor findings. A single minor finding can be noted in the report without an issue.

## Step 4 — Report

Output exactly this structure:

```
## Security audit

**Major findings:** <count or "none">
**Minor findings:** <count or "none">

### Major
<list each with file:line and one-sentence description, or "None">

### Minor
<list each with file:line and one-sentence description, or "None">

### Issues created
<list issue URLs, or "No issues created — nothing worth flagging">
```

## Known project patterns

- **Static site:** No user input is processed server-side — XSS via stored/reflected input is not applicable. Focus on supply-chain risk (external scripts), CSP, and SRI.
- **Leaflet:** Loaded from a CDN in `LeafletMap.astro` — SRI and CSP are the key checks here.
- **Google Fonts:** Loaded in `Layout.astro` — check for SRI or at minimum `preconnect` scoped to the expected origin.
- **No SSR:** Astro env vars without the `PUBLIC_` prefix should never appear in template output — flag if they do.
- **`set:html`:** Astro's `set:html` is the equivalent of `innerHTML`. Any use of it should have a clearly safe, static source.
- **Yarn audit:** Only flag HIGH and CRITICAL — moderate and low findings on a static site with no server surface are noise.
