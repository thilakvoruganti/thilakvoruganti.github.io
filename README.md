# Thilak Voruganti · Portfolio

Live site: [thilakvoruganti.me](https://thilakvoruganti.me)

A production-ready personal portfolio built with React 19, React Router 7, Firebase Analytics, and SCSS/Tailwind utilities. The app focuses on performance (lazy routes, Suspense fallbacks), attribution tracking, and UX polish.

## Tech Stack
- React 19 + React Router 7 with a layout-based router (`src/app`)
- Firebase Web SDK for analytics (`src/lib/firebaseAnalytics.js`)
- Framer Motion for carousel/interaction polish
- SCSS modules + Tailwind utilities for styling
- GitHub Pages deployment via `gh-pages`

## Project Structure
```

├─ app/            # Router + root shell
├─ components/     # UI building blocks
├─ constants/      # External links & shared config
├─ context/        # Global scroll/interaction context
├─ layouts/        # Top-level layout wrappers
├─ lib/            # Firebase analytics helpers
├─ pages/          # Lazy-loaded route entries
├─ styles/         # Global SCSS + Tailwind
└─ images|json     # Static assets / content
```
Additional reference assets live under `docs/`:
- `docs/assets/` – design exports such as the Connect/Experience sections (zip)
- `docs/notes/` – import commands & scratch notes used while recreating sections

## Getting Started
1. **Install dependencies**
	```bash
	npm install
	```
2. **Configure environment** — copy `.env.example` (create one) or set the variables below in `.env.local`:
	| Variable | Description |
	| --- | --- |
	| `REACT_APP_FIREBASE_API_KEY` | Firebase API key |
	| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Auth domain |
	| `REACT_APP_FIREBASE_PROJECT_ID` | Project ID |
	| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Storage bucket |
	| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
	| `REACT_APP_FIREBASE_APP_ID` | App ID |
	| `REACT_APP_FIREBASE_MEASUREMENT_ID` | GA4 measurement ID |
3. **Run locally**
	```bash
	npm start
	```
	The app runs on `http://localhost:3000` with hot reload.

## NPM Scripts
| Command | Description |
| --- | --- |
| `npm start` | Start CRA dev server |
| `npm run build` | Production build (used for GitHub Pages) |
| `npm run lint` / `npm run lint:fix` | ESLint with `react-app` + Prettier rules |
| `npm run format` / `npm run format:check` | Prettier for JS/SCSS/CSS/JSON/MD |
| `npm run deploy` | Build + push `build/` to the GitHub Pages repo |

## Analytics
- `initAnalytics()` (called in `src/index.js`) bootstraps Firebase only when production env + keys exist.
- `trackEntrySource()` logs a `portfolio_entry` event once per session, capturing `source`, `utm_*`, referrer, and landing path.
- CTA, nav, and social clicks emit semantic events (e.g., `nav_resume_click`, `project_ec_click`) to map engagement funnels.

## Deployment
1. Run `npm run lint && npm run build` locally or via CI.
2. Deploy to GitHub Pages either via the `deploy` script or an Actions workflow (see `.github/workflows/ci.yml`).
3. Ensure DNS points `thilakvoruganti.me` to GitHub Pages; `public/CNAME` keeps the custom domain active.

## Contributing / Notes
- Use the provided Prettier + ESLint configs before opening PRs.
- Reference assets/notes live under `docs/` to keep the repository root lean while preserving design context.
- Feel free to open issues for bugs or UX improvements.
