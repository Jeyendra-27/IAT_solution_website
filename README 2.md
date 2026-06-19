# IAT Technologies — Next.js (App Router)

The original 7-page static site converted to a production Next.js app (JavaScript,
App Router, plain CSS — no Tailwind). The design, layout, animations and
responsive behaviour are preserved; the original CSS is reused as-is (scoped per
route), and the imperative DOM scripts are reimplemented with React hooks/state.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
# production:
npm run build && npm start
```

## Add your images

No image assets were included. Drop them into `public/` at these exact paths
(the code already points here):

```
public/images/iatt-logo.png            # navbar + footer logo
public/images/placeholder-desktop.png  # web & e-commerce marquee
public/images/Clients/…                # 13 home-page client logos (see public/images/README.txt)
```

Filenames are case-sensitive and must match exactly (including the space in
`logo (1).png` and the double extension `Solara.png.webp`). Until the files are
added you'll see broken-image icons in those spots — nothing else is affected.
Fonts load from Google Fonts via a `<link>` in `src/app/layout.js`, so no font
files are needed.

## How it's organised

- `src/app/layout.js` — root layout: `<html>`/`<body>`, Google Fonts, and the
  shared `Navbar` (persists across routes).
- `src/app/page.js` + `src/app/<route>/page.js` — one route per original HTML file.
- `src/app/globals.css` — only the truly shared styles (reset, design tokens,
  base body, navbar/footer chrome).
- `src/app/<route>/<route>.css` — each page's original CSS, scoped under
  `.route-<name>` / `html.route-<name>` and with keyframes namespaced so the
  seven pages never collide.
- `src/components/` — reusable pieces (GridCanvas, SlideDeck, Navbar, Footer,
  ContactForm, and the home widgets).
- `src/hooks/` — shared behaviour (route class, slide-deck engine, scroll reveal,
  count-up).
- `src/lib/` — verbatim slide/SVG markup extracted from the originals.

## Route map

| Original file        | Route            |
|----------------------|------------------|
| index.html           | `/`              |
| about.html           | `/about`         |
| services.html        | `/services`      |
| solutions.html       | `/solutions`     |
| ai-solutions.html    | `/ai-solutions`  |
| web-ecommerce.html   | `/web-ecommerce` |
| contact.html         | `/contact`       |
