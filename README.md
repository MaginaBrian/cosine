# Cosine Made — Website

A multi-page React + Vite shop for Cosine Made, with a Flask API for catalog,
bag, accounts, and studio orders. Layout cues from Fear of God and Kith
(fixed nav with frosted mega-menus, campaign look grids, short footer).

The brand mark is the Marble wordmark (`frontend/src/assets/cosine-wordmark.png`).

## Run it

```bash
npm install --prefix frontend
python3 -m venv backend/.venv
backend/.venv/bin/pip install -r backend/requirements.txt
npm run api    # Flask shop API on http://127.0.0.1:5000
npm run dev    # site on http://localhost:5173 (proxies /api to Flask)
```

Open http://localhost:5173. Catalog and bag live in the Flask API, so both
processes need to be running.

```bash
npm run build
npm run preview   # serve the production build locally
```

Root `package.json` scripts (`dev`, `api`, `seed`, `build`, `lint`, `preview`)
delegate to `frontend/` or `backend/.venv`.

## CI/CD (GitHub Actions → Render)

Push or open a PR → **CI** lints/builds the frontend and smoke-tests the API.
Merge/push to `main` and CI passes → **Deploy** triggers both Render services.

```
push / PR  →  CI (frontend + backend)  →  (main only) Deploy hooks → Render
```

### One-time setup

1. Push this repo to GitHub and leave Actions enabled.
2. In Render, choose **New → Blueprint** and select the repo. Render reads `render.yaml` (API + static site, auto-deploy off).
3. Apply the blueprint and set `ADMIN_PASSWORD` when prompted.
4. For each service, open **Settings → Deploy Hook** and copy the URL:
   - `cosine-made-api` → GitHub secret `RENDER_DEPLOY_HOOK_API`
   - `cosine-made` → GitHub secret `RENDER_DEPLOY_HOOK_WEB`
5. In the GitHub repo: **Settings → Secrets and variables → Actions → New repository secret** for both hooks.

After that, every green CI run on `main` redeploys the API and the site to the commit that passed.

Workflows live in `.github/workflows/ci.yml` and `.github/workflows/deploy.yml`. The free API sleeps after about 15 minutes without a visit, then takes about a minute to wake.

## Pages

- `/` — Home: AXIS hero + look grid, Summer / Essentials campaigns, Shop by Colour, reviews, four pillars
- `/collections`, `/featured`, `/men`, `/women` — shop grids (Men / Women filterable by garment type from the nav dropdown)
- `/colour/:slug` — colour story looks + matching pieces
- `/products/:id` — product detail
- `/bag`, `/checkout` — bag and checkout (checkout requires an account)
- `/account` — sign in or create an account (JWT + bcrypt)
- `/admin` — studio order board for admin accounts only (Processing / Production / Stock / Dispatch). Moving an order to Stock matches colour, size, and quantity against warehouse inventory and reserves the pieces. Studio link appears in the footer only when signed in as admin.
- `/insiders`, `/purpose`, `/product`, `/people` — studio story pages linked from the home pillars
- `/about` — brand story lines
- `/contact` — Fear of God–style message form (also linked from the footer)
- `/privacy` — legal notices

Anyone can browse and fill a bag. Checkout requires an account, and the order
only places when every delivery field is complete.

Seed test accounts (admin + customer):

```bash
npm run seed
# or: backend/.venv/bin/python backend/seed.py
```

Defaults:

- Admin: `studio@cosinemade.com` / `StudioAdmin!`
- Customer: `amina@example.com` / `Customer1!`

Override admin with `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET` on Render.

Routing uses `react-router-dom`. Always run through `npm run dev` or
`npm run build` + `npm run preview` (or deploy with an SPA history fallback) —
opening `dist/index.html` directly will 404 on refresh.

## Structure

- `frontend/` — Vite + React site
  - `src/app/` — shell and route table
  - `src/layout/` — navbar (Marble wordmark), footer
  - `src/features/home/` — hero, campaigns, Shop by Colour, reviews, pillars
  - `src/features/catalog/` — shop grids, colour pages, catalog client
  - `src/features/product/` — piece page
  - `src/features/bag/`, `checkout/`, `account/`, `admin/` — commerce + studio
  - `src/features/studio/` — about, contact, privacy, Insiders / Purpose / Product / People
  - `src/content/images.js` — photography placeholders, colour stories, Men / Women types
  - `src/assets/cosine-wordmark.png` — Marble brand mark
- `backend/` — Flask package (`shop/`)
  - `catalog.py`, `cart.py`, `auth.py`, `checkout.py`, `orders.py`, `inventory.py`
  - `app.py` — process entry (`create_app()`); Render uses gunicorn

## Swapping in real photos & video

Imagery currently uses free Unsplash placeholders in
`frontend/src/content/images.js`. To use your own:

1. Drop files in `frontend/src/assets/`.
2. Import them at the top of `images.js`, e.g. `import overcoat from "@/assets/overcoat.jpg";`
3. Use that variable instead of the `u("photo-...")` URL.

For video, replace an `<img>` with:

```jsx
<video autoPlay muted loop playsInline>
  <source src={yourVideoFile} type="video/mp4" />
</video>
```

The home hero or a `CampaignBlock` look grid is a good first place to try this.

## Brand tokens

CSS variables at the top of `frontend/src/styles/index.css`:

- `--pearl` #FDFFFF — primary background
- `--silk` #EEE5D9 — secondary surfaces
- `--marble` #E8E4E0 — cards / separation / wordmark tone
- `--onyx` #000000 — text
- `--velvet` #222D52 — accent
- `--champagne` #D2B98A — secondary accent

Typeface stack prefers Neue Haas Grotesk / Helvetica Now, with **Switzer**
(Fontshare) as the loaded fallback.
