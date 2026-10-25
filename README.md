# GIZKIDESIGNS — Next.js migration (Option A, in progress)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What is included
- Home, Projects, Services and About pages with text transcribed from the live Framer site.
- Reusable header, footer, service cards and project cards.
- Original logo and several original Framer-hosted image URLs, rather than generated SVG placeholders.
- Mobile navigation, responsive layouts, and a looping gallery.

## Important fidelity limitations
This is **not a verified pixel-perfect export**. The source Framer design file and rendered screenshots were not available to measure precise geometry, fonts, colors or motion. Some project images are currently reused because the complete asset-to-project mapping could not be verified. External project details, booking URL and Behance URL should be verified. Image files are hotlinked to `framerusercontent.com`; for full independence, download assets you own and replace their URLs with `/images/...` paths. Do not delete your Framer site until this is done.

## Files to customize
- `src/data/site.ts`: brand links, images, projects and services.
- `src/app/globals.css`: global styling.
- `src/app/{page,about/page,services/page,projects/page}.tsx`: page content.

## Production

```bash
npm run build
npm start
```
