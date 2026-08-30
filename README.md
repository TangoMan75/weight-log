![GitHub language](https://img.shields.io/github/languages/top/tangoman75/weight-log)
![GitHub license](https://img.shields.io/github/license/tangoman75/weight-log)
[![GitHub release](https://img.shields.io/github/v/release/tangoman75/weight-log?sort=semver)](https://github.com/tangoman75/weight-log/releases/)
[![GitHub release date](https://img.shields.io/github/release-date/tangoman75/weight-log)](https://github.com/tangoman75/weight-log/releases/)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/tangoman75/weight-log)
![GitHub stars](https://img.shields.io/github/stars/tangoman75/weight-log)
![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Ftangoman75%2Fweight-log&labelColor=%23697689&countColor=%2337d67a&style=flat)

Weight Tracker
===

![Weight Tracker](./public/favicon.svg)

A minimal, offline-first weight tracking PWA.
----------------

Weight Tracker is a small, fast, installable web app that lets one person record
their daily weight and watch the trend over time. It runs entirely in the
browser, stores data locally with IndexedDB, works offline, and never asks for
an account. Log a new entry in a single tap, review progress as a line chart or
a table, and move your data in and out freely via CSV.

🌐 Live Demo
-------------

- [https://tangoman75.github.io/weight-log/](https://tangoman75.github.io/weight-log/)

🚀 Features
-----------

### ⚡ Tracking & Logging

1. **Quick add:** Tap the `+` button to open a dialog pre-filled with the current
   date/time and a focused weight field — logging takes seconds.
2. **Units that fit you:** Record each entry in `kg` or `lb`; the chart and table
   label themselves with the unit of your data.
3. **Delete & reset:** Remove individual entries or clear all history with a
   confirmation guard so you never lose data by accident.

### ⚡ Visualization

1. **Chart view:** A Chart.js line chart plots weight (y-axis) against date
   (x-axis) so trends are easy to read at a glance.
2. **Table view:** A plain, sortable-by-date listing of every entry with inline
   delete controls.
3. **View persistence:** Your last selected view (chart or table) is remembered
   via `localStorage`.

### ⚡ Data Portability & Offline

1. **CSV export:** Download all entries as `weight-YYYY-MM-DD.csv` for backup or
   analysis in a spreadsheet.
2. **CSV import:** Load prior history from a CSV file (`datetime,weight,unit`);
   invalid rows are skipped and reported.
3. **Offline-first PWA:** A service worker (via `vite-plugin-pwa`) caches the app
   so it launches and works without a network connection.

📦 Installation
--------------

Requirements: **Node.js 18+** and **npm**.

1. **Clone the repository:** `git clone git@github.com:tangoman75/weight-log.git && cd weight-log`.
2. **Install dependencies:** `npm install` (or `make install`).
3. **Start the dev server:** `npm run dev` (or `make dev`) — the app opens at
   `http://localhost:5173`.

🛠️ Usage
--------

1. **Log a weight:** Open the app and tap the `+` button, type your weight, pick
   `kg`/`lb`, then **Save**.
2. **Review progress:** Switch between **Chart** and **Table** using the toggle in
   the header.
3. **Manage data:** Use **Import CSV** / **Export CSV** in the footer to move
   data, or **Clear all** to reset.

🖇️ Dependencies / Requirements
------------------------------

**Weight Tracker** is built with the following stack:

1. **React 18** + **react-dom** — UI rendering.
2. **Vite 5** + **@vitejs/plugin-react** — dev server and production bundling.
3. **vite-plugin-pwa** — service worker / installable PWA.
4. **Chart.js** + **react-chartjs-2** — the trend line chart.
5. **idb** — Promise-based wrapper around IndexedDB for local storage.
6. **@picocss/pico** — minimal, class-light CSS baseline.

🐞 Troubleshoot
--------------

1. **Blank chart or "No entries yet":** This is expected until you add at least
   one entry — tap `+` to log your first weight.
2. **Changes not showing after a deploy:** The service worker may be serving a
   cached version; hard-reload or unregister the worker in your browser's
   Application > Service Workers panel.
3. **CSV import reports "Import failed":** Ensure the file uses the
   `datetime,weight,unit` column order (a header row is optional) and that each
   row has a valid date and numeric weight.

🧪 Testing Strategy
------------------

No automated test suite is configured yet. Verify changes manually:

1. **Build check:** Run `npm run build` (or `make build`) and confirm `dist/`
   is produced without errors.
2. **Manual smoke test:** Run `npm run dev`, add an entry, toggle views, export
   CSV, then re-import it and confirm the data round-trips.
3. **Dependency audit:** Run `make audit` (or `npm audit`) to surface known
   vulnerabilities in dependencies.

🐛 Limitations
--------------

1. ⚠️ **Single user:** There are no profiles or accounts — one dataset per
   browser/device.
2. ⚠️ **No cloud sync:** Data lives only in the device's IndexedDB; there is no
   cross-device backup beyond manual CSV export.
3. ⚠️ **Import replaces all data:** Importing a CSV clears existing entries before
   loading the new file, so export first if you want to keep the old data.

📝 Notes
--------

The production build is published to GitHub Pages via the `gh-pages` branch
(`make deploy`). Set the repository's Pages source to the `gh-pages` branch
(root) to enable the live demo.

🤝 Contributing
--------------

Thank you for your interest in contributing to **Weight Tracker**.

Please review the [code of conduct](./CODE_OF_CONDUCT.md) and
[contribution guidelines](./CONTRIBUTING.md) before starting to work on any
features.

If you want to open an issue, please check first if it was not
[reported already](https://github.com/tangoman75/weight-log/issues) before
creating a new one.

📜 License
----------

Copyrights (c) 2026 "Matthias Morin" <mat@tangoman.io>

[![License](https://img.shields.io/badge/Licence-MIT-green.svg)](LICENSE)
Distributed under the MIT license.

If you like **Weight Tracker** please star, follow or tweet:

[![GitHub stars](https://img.shields.io/github/stars/tangoman75/weight-log?style=social)](https://github.com/tangoman75/weight-log/stargazers)
[![GitHub followers](https://img.shields.io/github/followers/tangoman75?style=social)](https://github.com/tangoman75)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Ftangoman75%2Fweight-log)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Ftangoman75%2Fweight-log)

🙏 Acknowledgements
-------------------

- **pico.css:** For the clean, minimal CSS baseline.
- **Chart.js / react-chartjs-2:** For the weight trend visualization.
- **idb:** For the ergonomic IndexedDB wrapper.
- **Vite & vite-plugin-pwa:** For the fast build tooling and offline PWA support.

👋 Let's Build Your Next Project Together !
-------------------------------------------

Clean code. Clear communication.

From first sketch to final launch, I've got your back.

[![tangoman.io](https://img.shields.io/badge/✉️%20Get%20in%20touch%20now%20!-FD9400?style=for-the-badge)](https://tangoman.io)
