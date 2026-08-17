# Cosine Made — Website

A multi-page React + Vite site for Cosine Made — real routes for each
section, built from the brand's creative brief (color system, typography
direction, design principles) with layout cues from thebar.africa and
fearofgod.com (fixed nav with category dropdowns, dedicated shop pages).

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview   # serve the production build locally
```

## Pages

- `/` — Home: hero, marquee, Men/Women chooser, About teaser, Craft, Lookbook
- `/men`, `/women`, `/kids` — full product grids, filterable by garment type
  (the same types shown in the nav dropdown when you hover Men / Women / Kids)
- `/featured` — a small curated pull across the catalog
- `/collections` — the full catalog in one place with All / Men / Women tabs
- `/about` — the brand story, as its own page
- `/contact` — studio contact details

Routing is handled by `react-router-dom`. Because this is a client-side
router, always run it through `npm run dev` or `npm run build` + `npm run
preview` (or deploy behind a server with an SPA history fallback) — don't
just open `dist/index.html` directly in the browser, or the sub-pages will
404 on refresh.

## Structure

- `src/pages/` — one file per route
- `src/components/Navbar.jsx` — nav bar with hover dropdowns for Men/Women/Kids,
  built from the `MEN_TYPES` / `WOMEN_TYPES` / `KIDS_TYPES` lists in
  `src/data/images.js`
- `src/components/ProductGrid.jsx` + `CategoryFilter.jsx` — shared by the
  Men/Women/Kids/Featured pages
- `src/components/Slider.jsx` — the draggable slider used on the Collections
  page and the homepage Lookbook
- `src/data/images.js` — every product, price, and image URL, in one place

## Swapping in real photos & video

All imagery currently comes from free Unsplash stock photos as placeholders,
listed in `src/data/images.js`. To use your own:

1. Drop your files in `src/assets/` (create the folder if it doesn't exist).
2. Import them at the top of `src/data/images.js`, e.g.
   `import overcoat from "../assets/overcoat.jpg";`
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

Defined as CSS variables at the top of `src/index.css`:

- `--pearl` #FDFFFF — primary background
- `--silk` #EEE5D9 — secondary surfaces
- `--marble` #E8E4E0 — cards / separation
- `--onyx` #000000 — text
- `--velvet` #222D52 — accent
- `--champagne` #D2B98A — secondary accent

Typeface: **Switzer** (a free grotesk in the same family as Neue Haas
Grotesk / Helvetica Now, which the brief calls for), loaded from Fontshare.
# cosine
