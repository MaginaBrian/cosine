# Cosine Made — Website

A multi-page React + Vite site for Cosine Made — real routes for each
section, built from the brand's creative brief (color system, typography
direction, design principles) with layout cues from thebar.africa and
fearofgod.com (fixed nav with category dropdowns, dedicated shop pages).

## Run it

```bash
npm install --prefix frontend
python3 -m venv backend/.venv
backend/.venv/bin/pip install -r backend/requirements.txt
npm run api    # Flask shop API on http://127.0.0.1:5000
npm run dev    # site on http://localhost:5173 (proxies /api to Flask)
```

Then open the printed local URL (usually http://localhost:5173).
The catalog and bag live in the Flask API, so both processes need to be running.

To build for production:

```bash
npm run build
npm run preview   # serve the production build locally
```

Both commands run from the repo root and delegate to `frontend/`.

## Deploy on Render

`render.yaml` is a Render Blueprint with two native services: a free Python web service for the Flask API and a static site for the Vite build. No Docker image is involved. The free API sleeps after about 15 minutes without a visit, then takes about a minute to wake. The site is built with the API URL, and the API accepts the bag cookie from that site.

GitHub Actions (`.github/workflows/ci.yml`) lints and builds the frontend and smoke-tests the API. The blueprint deploys only after those checks pass.

1. Push this repo to GitHub and leave Actions enabled.
2. In Render, choose **New → Blueprint** and select the repo. Render reads `render.yaml`.
3. Apply the blueprint. The service URL is on the Render dashboard.

Connect the GitHub repo itself, not a public clone URL. Render only sees the Actions checks, and only deploys after they pass, when the repo is linked through GitHub.

## Pages

- `/` — Home: hero, marquee, Men/Women chooser, About teaser, Craft, Lookbook
- `/men`, `/women`, `/kids` — full product grids, filterable by garment type
  (the same types shown in the nav dropdown when you hover Men / Women / Kids)
- `/featured` — a small curated pull across the catalog
- `/collections` — the full catalog in one place with All / Men / Women tabs
- `/about` — the brand story, as its own page
- `/contact` — studio contact details (also linked from the footer)
- `/account` — sign in or create an account (JWT + bcrypt)
- `/admin` — studio order list for admin accounts (Processing / Production / Stock / Dispatch)

Anyone can browse and fill a bag. Checkout requires an account, and the order
only places when every delivery field is complete.

Default studio admin locally: `studio@cosinemade.com` / `cosine-studio`.
Override with `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET` on Render.

Routing is handled by `react-router-dom`. Because this is a client-side
router, always run it through `npm run dev` or `npm run build` + `npm run
preview` (or deploy behind a server with an SPA history fallback) — don't
just open `dist/index.html` directly in the browser, or the sub-pages will
404 on refresh.

## Structure

The repo is two modules. Root `package.json` only starts them.

- `frontend/` — the Vite + React site
  - `src/app/` — shell and route table
  - `src/layout/` — navbar, footer, emblem
  - `src/features/home/` — homepage sections
  - `src/features/catalog/` — shop grids and the catalog API client
  - `src/features/product/` — the piece page
  - `src/features/bag/` — bag page and cart client
  - `src/features/studio/` — about and contact
  - `src/content/images.js` — brand photography and the Men / Women / Kids type lists
- `backend/shop/` — the Flask package
  - `catalog.py` — products and `/api/products`
  - `cart.py` — the session bag and `/api/cart`
  - `app.py` — process entry that calls `create_app()`

## Swapping in real photos & video

All imagery currently comes from free Unsplash stock photos as placeholders,
listed in `frontend/src/content/images.js`. To use your own:

1. Drop your files in `frontend/src/assets/`.
2. Import them at the top of `frontend/src/content/images.js`, e.g.
   `import overcoat from "@/assets/overcoat.jpg";`
3. Use that variable instead of the `u("photo-...")` URL.

For video, replace an `<img>` tag with:

```jsx
<video autoPlay muted loop playsInline>
  <source src={yourVideoFile} type="video/mp4" />
</video>
```

The `Craft.jsx` hero media block on the homepage is a good first place to
try this — the surrounding layout works with either an image or a video.

## Brand tokens

Defined as CSS variables at the top of `frontend/src/styles/index.css`:

- `--pearl` #FDFFFF — primary background
- `--silk` #EEE5D9 — secondary surfaces
- `--marble` #E8E4E0 — cards / separation
- `--onyx` #000000 — text
- `--velvet` #222D52 — accent
- `--champagne` #D2B98A — secondary accent

Typeface: **Switzer** (a free grotesk in the same family as Neue Haas
Grotesk / Helvetica Now, which the brief calls for), loaded from Fontshare.
# cosine
