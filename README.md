# Parthraj Gohil — Cloud & DevOps Portfolio

Interactive cloud-console portfolio built with **React 18 + Vite + Tailwind CSS + Framer Motion**.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Production build

```bash
npm run build
npm run preview
```

The `dist/` folder is fully static and can be deployed to Vercel, Netlify,
Cloudflare Pages, AWS S3 + CloudFront, or any static host.

## Structure

```
├── index.html
├── public/                 # static assets (resume, favicon)
├── src/
│   ├── main.jsx            # React entry
│   ├── App.jsx             # single-page composition
│   ├── styles/index.css    # Tailwind + design tokens
│   ├── components/portfolio/  # all interactive sections
│   ├── lib/                # data & helpers
│   ├── hooks/              # custom React hooks
│   ├── utils/              # reusable utilities
│   └── assets/             # local media
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```
