# MapLibre Demo — Climate Risk Dashboard

**MapLibre Demo** is a small practice project built while preparing for a React job interview whose posting emphasized React, TypeScript, Redux + Redux-Saga, Next.js App Router, REST API integration, and mapping/geospatial UI — specifically Mapbox-family skills. With no prior Mapbox experience, it uses [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) (the open-source Mapbox GL fork) together with [OpenFreeMap](https://openfreemap.org/) vector tiles as a free, tokenless stand-in for Mapbox. The app itself is a "Climate Risk Dashboard": a [Next.js](https://nextjs.org) (App Router, TypeScript) page showing a map next to a sidebar list of climate risk points (flood/wildfire/heat/drought, each with a 1-10 risk score) — selecting a point from either the list or a map marker flies the map to it, opens a popup with its details, and highlights the matching row. Data loads through [Redux Toolkit](https://redux-toolkit.js.org) + [Redux-Saga](https://redux-saga.js.org) against a mock REST endpoint, and styling is plain CSS — no Tailwind, no CSS modules. There's no automated test suite yet.

## Local setup

```bash
git clone <repo-url>
cd maplibre-demo
npm install
npm run dev   # http://localhost:3000
```

No `.env` file is needed — OpenFreeMap tiles are free and require no API key or token. Requires Node.js 20.9+ (Next.js 16's stated minimum); the project doesn't pin an exact version itself (no `.nvmrc`/`engines` field), so treat that as a sensible default rather than an enforced requirement.

## Project structure

- `src/app` — App Router entry: `layout.tsx` (wraps the tree in `StoreProvider`), `page.tsx` (renders `Dashboard`), `globals.css`.
- `src/components` — `Dashboard` (page layout, dispatches the initial fetch), `MapView` (MapLibre map instance, markers, popups), `RiskList` (sidebar), `StoreProvider` (client component wrapping the app in react-redux's `Provider`).
- `src/store` — `store.ts` (`configureStore` with the saga middleware, thunk disabled), `riskSlice.ts` (state + reducers), `riskSaga.ts` (watcher saga), `hooks.ts` (typed `useAppDispatch`/`useAppSelector`).
- `src/api/riskApi.ts` — mock async "REST" call standing in for a real backend endpoint.
- `src/types.ts` — shared `RiskPoint`/`RiskType` types.
- `public/maplibre-gl-worker.mjs` — see **Known issues / gotchas** below.

## Data flow: Redux Toolkit + Redux-Saga

This is the main thing the project exists to practice, so it's worth spelling out the full round trip:

1. On mount, `Dashboard` dispatches `fetchRiskPointsRequested()`.
2. `riskSaga`'s `takeEvery(fetchRiskPointsRequested.type, ...)` watcher intercepts it and calls `fetchRiskPoints()` (`src/api/riskApi.ts`) via saga's `call()` effect — a mocked async function with a 600ms `setTimeout` delay simulating a `GET /api/risk-points` call, so the loading state is actually visible.
3. On success the saga dispatches `fetchRiskPointsSucceeded(points)`; on failure, `fetchRiskPointsFailed(message)`.
4. The `riskSlice` reducer updates `status`/`points`/`error` accordingly. Note that the reducers only hold state — the saga is the only place `fetchRiskPoints()` itself gets called; `configureStore` disables the default thunk middleware (`{ thunk: false }`) since saga owns all async work here.
5. `RiskList` and `MapView` read `points`/`status`/`selectedId` via the typed `useAppSelector`. Selecting a point — from the list or from a map marker click — dispatches `riskPointSelected(id)`; `MapView`'s effect on `[selectedId, points]` flies the map to that point and opens its popup, while `RiskList` highlights the matching row.

## Known issues / gotchas

MapLibre GL JS ships a web worker (`maplibre-gl-worker.mjs`, inside the package's `dist/`) that it needs to load tiles and render markers. Neither Vite nor Next.js/Turbopack can bundle that worker automatically, and the failure is silent — no build error, just a blank map and "Worker failed to load" in the browser console.

The fix applied here: `node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs` was copied into `public/maplibre-gl-worker.mjs`, and `MapView.tsx` calls `setWorkerUrl('/maplibre-gl-worker.mjs')` before constructing the `Map` instance. If `maplibre-gl` is ever upgraded, re-copy that file from the new version's `node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs` — the copy in `public/` and the installed package version must match, or markers and tiles will silently stop loading again.

## Commands

```bash
npm run dev                      # start the dev server at http://localhost:3000
npm run build && npm run start   # production build, then serve it
npm run lint                     # ESLint
```
