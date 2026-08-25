# The Pixel Build

Marketing landing page for **The Pixel Build** — an ecommerce technical partner for Shopify / Shopify Plus brands.

Single-page site; every CTA points at the contact section (book a discovery call).

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- React 19
- CSS Modules — no CSS framework, no runtime styling library

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |

## Structure

```
app/           App Router entry — layout, page, global styles
components/    Section + UI components, each with a co-located .module.css
lib/           content.js (all page copy/data) and hooks.js
public/        Static assets (logos)
```

Page copy and data live in [`lib/content.js`](lib/content.js) — edit there rather than in the components.

## Deployment

Deployed on [Vercel](https://vercel.com). No environment variables are required.
