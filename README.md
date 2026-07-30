# Parthraj Gohil — Cloud & DevOps Portfolio

React 18 + JavaScript (JSX) + Vite + Tailwind CSS + Framer Motion. No TypeScript.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Static output lands in `dist/` — deploy to Vercel, Netlify, Cloudflare Pages or S3 + CloudFront.

## Add your photo

Drop a square image at `public/profile.jpg`. Until then the hero shows an animated monogram fallback.

## Structure

```
public/           favicon, resume PDF, profile.jpg
src/
  assets/logos/   original PNG brand & certification logos
  components/portfolio/  all sections (Nav, HeroDashboard, Terminal, ...)
  hooks/          use-theme (light/dark), use-mobile
  lib/            portfolio-data.js, logos.js, utils.js
  pages/Home.jsx  page composition
  styles/index.css design tokens + Tailwind
```

## Theme

Light/dark toggle in the navbar. Preference is saved to `localStorage` under `portfolio-theme`, defaulting to the OS setting.
