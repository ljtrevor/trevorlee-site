# Trevor Lee Personal Website

Production-ready personal site built with Next.js App Router, React, TypeScript, and MUI.

## Stack
- Next.js 15 (App Router)
- React 18 + TypeScript
- MUI v5 + Emotion
- Static export for deployment (`output: 'export'`)
- Optional GA4 via `@next/third-parties/google`

## Routes
- `/` Home
- `/about` About
- `/cissp-study-log` CISSP Study Log
- `/contact` Contact

## Key Production Characteristics
- Static export enabled in `next.config.js`
- SEO metadata configured globally + per route
- `robots.txt` and `sitemap.xml` generated via App Router metadata routes
- Next font optimization with `next/font/google` (Plus Jakarta Sans + Noto Sans JP)
- Optional Google Analytics injection via env var
- Theme mode pre-hydration script to reduce flash and hydration mismatch risk
- Accessibility improvements including reduced motion support and mobile nav ARIA state

## Local Development
### Prerequisites
- Node.js 20+
- npm

### Install
```bash
npm install
```

### Run
```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts
- `npm run dev` Start dev server
- `npm run build` Create production build + static export (`out/`)
- `npm run start` Run Next production server (not required for S3 static hosting)
- `npm run lint` Run ESLint
- `npm run typecheck` Run TypeScript checks (`tsc --noEmit`)

## Environment Variables
Create `.env.local` as needed.

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

- If set, GA4 is loaded.
- If unset, no GA script is injected.

## CISSP Study Log Data
Edit entries in:
- `src/data/cisspLog.json`

After updates, rebuild and redeploy.

## Build Output
```bash
npm run build
```

Static artifacts are generated in:
- `out/`

## Deployment (AWS S3 + CloudFront)
1. Create S3 bucket and upload contents of `out/`.
2. Configure CloudFront with S3 origin and default root object `index.html`.
3. Add custom error responses for App Router deep links:
   - `403 -> /index.html` (response `200`)
   - `404 -> /index.html` (response `200`)
4. Attach ACM certificate and point DNS to CloudFront.

## Validation Before Deploy
```bash
npm run lint
npm run typecheck
npm run build
```

## Troubleshooting
### `next/font/google` fetch failures during build
In restricted network environments, Google font downloads can fail during `npm run build`.
- Verify outbound access in CI/deploy environment.
- Re-run build in a network with access to Google Fonts endpoints.

