# Croydon Chicken Mile

A tongue-in-cheek guide to Croydon's finest fried chicken establishments. Built with Astro.

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:4321](http://localhost:4321).

## Commands

| Command | Description |
|---|---|
| `yarn dev` | Start dev server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn lint` | Run Biome linter |
| `yarn lint:fix` | Auto-fix lint issues |
| `yarn lint:errors` | Run Biome linter, filtered to errors only |
| `yarn ts-check` | TypeScript check via Astro |
| `yarn test` | Run unit tests |
| `yarn test:watch` | Run tests in watch mode |
| `yarn test:e2e` | Run Playwright end-to-end tests |
| `yarn knip` | Find unused files, dependencies, and exports |

## Tech

- [Astro](https://astro.build) — static site framework
- [Biome](https://biomejs.dev) — linting & formatting
- [Vitest](https://vitest.dev) — unit testing
- [Playwright](https://playwright.dev) — end-to-end testing
- [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) — accessibility testing
- [Leaflet](https://leafletjs.com) — interactive map
- [@astrojs/vercel](https://docs.astro.build/en/guides/integrations-guide/vercel/) — Vercel deployment adapter
- [@vercel/analytics](https://vercel.com/docs/analytics) — analytics
- [Knip](https://knip.dev) — unused files, dependencies, and exports
