# AGENTS.md — Weight Tracker PWA

Offline-first weight-tracking PWA: React 19 + Vite 8, no backend. All data lives
in the browser's IndexedDB (`weight-tracker` DB, `entries` store). Entrypoints:
`index.html` → `src/main.jsx` → `src/App.jsx`. Logic lives in `src/db.js` (storage)
and `src/csv.js` (import/export); UI in `src/components/`.

## Commands
- `npm run dev` / `make dev` — Vite dev server at http://localhost:5173
- `npm run build` / `make build` — output to `dist/` (`dist/` and `node_modules/` are gitignored)
- `npm run preview` / `make preview` (alias `serve`) — serve the production build
- `make deploy` — builds then publishes `dist/` to the `gh-pages` branch via
  `npx gh-pages` (fetched on demand). Requires the repo's GitHub Pages source set
  to the **gh-pages branch (root)**. There is no CI; deploy is manual.
- `make audit` — `npm audit`. No lint, typecheck, or test targets exist.

## Gotchas
- **No automated tests.** Verify changes via `npm run build` + manual smoke test
  (add entry, toggle chart/table, export CSV, re-import). README still claims a
  test strategy section but there is none.
- **CSV import replaces all data:** `handleImport` in `src/App.jsx:64` calls
  `clearAll()` before loading, so existing entries are wiped. Export first to keep
  them. Format is `datetime,weight,unit`; the header row is optional.
- **`vite.config.js` uses `base: './'`** (relative paths) so the built app works
  under the GitHub Pages subpath `/weight-log/`. Do not switch to an absolute base
  unless you also change the hosting setup.
- **README is stale** on the stack: it says React 18 / Vite 5. Trust
  `package.json` — it is React 19.2 / Vite 8.
- Requires **Node 18+**.
- Storage is single-user, per-browser; there is no sync or accounts.
- App uses `React.StrictMode`; last selected view persists in `localStorage`
  under key `wt-view`.
