# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Travel-history tracker: users record trips abroad and the app reports how many days
they've spent away from or at home, plus a world map of visited countries.

## Commands

```bash
npm run dev              # dev server
npm run build            # tsc --noEmit then vite build (type errors fail the build)
npm run lint             # eslint, --max-warnings 0 (warnings fail)
npm run test             # vitest watch mode
npm run test:ci          # vitest single run — use this, `npm test` never exits
npm run coverage
npm run format           # prettier

npx vitest run src/common/utils/date.test.ts   # single file
npx vitest run -t 'name of test'               # single test by name
```

Node >= 22.22 is required (see `engines`).

## Setup

Firebase credentials come from environment variables. `cp .env.example .env` and fill
in the six `VITE_FIREBASE_*` values, or the app cannot initialize. `.env` is gitignored
and must stay that way — never inline credentials into `firebaseConfig.ts`.

## Architecture

**Routing is where auth happens.** `src/app/router/Router.tsx` defines a
`createBrowserRouter` tree whose root loader calls `await user.init()`, then redirects to
`/signin` when unauthenticated; the `/signin` loader does the inverse. Route components
are all `React.lazy`. Consequences worth knowing:

- `user.init()` is memoized in `UserDb` so both loaders can await it without re-running.
  Do not move it back to module scope — a top-level `await` there breaks the production
  build (unsupported by the browser target).
- Routes with async loaders need a `hydrateFallbackElement`, or React Router warns.
- The root loader's return value is the user record, read via `useLoaderData()` in
  `App.tsx` and pushed into Redux there. `getUser()` can resolve `undefined`, so that
  path is guarded.

**Data layer** is three stacked classes in `src/common/services/db/`:
`Firestore` (generic document access, owns the `FIREBASE_APP` singleton) → `Authentication`
(popup OAuth via Google/GitHub) → `UserDb` (the app-level API, exported as a singleton
`user` instance). Feature code talks to `UserDb`, not to Firebase directly.

**Redux** (`src/app/store/`) holds two slices. Always use the typed `useAppDispatch` /
`useAppSelector` from `@/app/store`, never the raw react-redux hooks.

- `userSlice` — plain user profile.
- `tripsSlice` — an `createEntityAdapter` with a `sortComparer` that keeps trips in
  chronological order by `from`; rows with an empty `from` (freshly added) sort last.
  Because of this, `selectAll`/`selectIds` are already sorted, and so is what `saveTrips`
  persists. Note `saveTrips` writes to Firestore as a side effect inside the reducer.

**Derived travel data** lives in the `User` class (`src/common/utils/user.ts`), a pure
projection over profile + trips. It reconstructs a gap-free timeline — inserting implicit
"at home" intervals between trips — and exposes `isAtHome`, `daysFromLastTrip`,
`daysFromLastTravel`, `currentLocation`. Compute it during render (`useMemo`), not into
state via an effect; `react-hooks/set-state-in-effect` is an error here.

**World map** renders inline `<path>` elements from
`src/features/Statistic/components/World/data.ts` — a generated ~820KB single-line file of
SVG path data, produced by `convertSvgWorldToJsonNodeScript.js` at the repo root. Country
fill opacity scales with days spent there. Treat `data.ts` as a build artifact; don't
hand-edit or reformat it.

## Conventions

- Import via the `@/` alias (→ `src/`). Feature directories are **capitalized**
  (`@/features/Home`, `@/features/Trips`) — lowercase paths resolve on macOS but break
  the Linux CI build with `TS1261`.
- Features live in `src/features/<Name>/` with a barrel `index.tsx`, the component, a
  `.scss` file, and `store/` for slice + selectors. Shared code sits in `src/common/`.
- SCSS uses `@use`, not the deprecated `@import`. Palette is inline hex, not variables:
  `#cb72aa` accent, `#717790` slate, `#f6f5f7` background.
- ESLint is flat config (`eslint.config.js`). `eslint-plugin-react-hooks` v7 ships the
  React Compiler rules at error severity, so effect/purity violations block the lint.
- Vitest config is separate (`vitest.config.ts`) and merges `vite.config.ts`.
- TypeScript is pinned to 5.x on purpose — typescript-eslint cannot consume TS 7's API.
