# Trevor Lee Personal Website

Production-ready personal website for Trevor Lee built with Next.js App Router, TypeScript, and MUI.

## Stack
- Next.js (App Router) + React + TypeScript
- Material UI (MUI v5)
- Static export (`output: 'export'`) for AWS S3 + CloudFront
- Optional GA4 via `@next/third-parties/google`

## Features
- 4 pages: Home, About, CISSP Study Log, Contact
- Japandi-inspired light theme with responsive navigation and mobile drawer
- SEO metadata per page, Open Graph, Twitter card metadata
- `robots.txt` and `sitemap.xml`
- Accessible heading structure and keyboard-focus styling
- CISSP study log with JSON-backed entries, filters, domain mapping, and chapter coverage grid

## Installation
1. Install dependencies:

```bash
npm install
```

## Run Locally
```bash
npm run dev
```

Open `http://localhost:3000`.

## Add CISSP Study Entries
Edit:
- `src/data/cisspLog.json`

Entry schema:

```ts
{
  id: string;
  date: string; // YYYY-MM-DD
  chapters: number[];
  notes: string;
  tags?: string[];
  minutesStudied?: number;
}
```

After editing entries, rebuild and redeploy.

## Set Google Analytics (GA4)
GA loads only if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.

Create `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

If unset, GA is not injected.

## Static Build
```bash
npm run build
```

This generates static output in:
- `out/`

## Deploy to AWS S3 + CloudFront

### 1) S3 static hosting
- Create an S3 bucket for the site.
- Upload the contents of `out/`.
- Enable static website hosting.
- Set index document to `index.html`.

### 2) CloudFront distribution
- Use the S3 website endpoint as origin (or S3 origin + OAC/OAI based on your setup).
- Set default root object: `index.html`.

### 3) Custom error responses (required for deep links)
Configure:
- `403` -> `/index.html` with response code `200`
- `404` -> `/index.html` with response code `200`

This prevents refresh/deep-link failures for routes like `/about`.

### 4) Domain + HTTPS
- Attach ACM certificate for `trevorlee.ca` (and `www` if needed).
- Point DNS to CloudFront.

## Scripts
- `npm run dev` - local development
- `npm run build` - production static build
- `npm run start` - Next start (not required for S3 static hosting)
- `npm run lint` - lint checks
- `npm run typecheck` - TypeScript check
