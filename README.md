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

## Contact form

Submissions from [`components/Contact.jsx`](components/Contact.jsx) POST to
`app/api/contact/route.js`, which validates them and appends a row to a Google
Sheet via a service account. Nothing is written client-side and no credential
reaches the browser.

### Sheet setup

1. Create a sheet and add a tab named **Enquiries**.
2. Put this header row in `A1:F1` — the column order is fixed in
   [`lib/sheets.js`](lib/sheets.js):

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | Timestamp | Name | Email | Store URL | Message | Source |

### Service account

1. In the [Google Cloud console](https://console.cloud.google.com), create (or
   pick) a project and enable the **Google Sheets API**.
2. **IAM & Admin → Service Accounts → Create service account**. No project roles
   are needed — access is granted by sharing the sheet, not by IAM.
3. On the account's **Keys** tab, **Add key → Create new key → JSON**.
4. Open the sheet, click **Share**, and share it with the service account's
   `client_email` as **Editor**. This step is what grants access; without it
   every append returns 403.
5. Copy `.env.example` to `.env.local` and fill in `client_email`,
   `private_key` and the spreadsheet id from the sheet URL.

Then confirm the whole chain before touching the form:

```bash
npm run check:sheets
```

It authenticates, opens the sheet, checks the tab name and appends one test
row — and on failure names the single setup step that caused it. Delete the
test row afterwards.

Set the same three variables in your host's environment for production. Paste
the private key with its `\n` sequences escaped, exactly as they appear in the
JSON — `lib/sheets.js` unescapes them, because a `.env` value cannot contain a
real line break.

### Spam handling

An off-screen honeypot field plus a minimum fill time; both are answered with
`200 OK` so a bot logs a success and does not probe further. A per-IP throttle
allows 5 submissions per 10 minutes — in-memory, so it is per-instance and
resets on redeploy. Swap in Upstash or similar if the form is ever targeted.
