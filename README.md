# Trevor Lee Personal Website

Personal site built with Next.js App Router, React, and TypeScript. Pages are plain CSS; MUI is used only on the CISSP study log.

## Stack
- Next.js 15 (App Router)
- React 18 + TypeScript
- Plain CSS with design tokens in `src/app/globals.css`
- MUI v5 + Emotion (CISSP study log page only)
- Static export for deployment (`output: 'export'`)

## Routes
- `/` Home
- `/about` About
- `/cissp-study-log` CISSP Study Log
- `/contact` Contact

## Key Production Characteristics
- Static export enabled in `next.config.js`
- SEO metadata configured globally + per route
- `robots.txt` and `sitemap.xml` generated via App Router metadata routes
- Self-hosted fonts via `next/font/local` (Bricolage Grotesque and Source Serif 4, both SIL Open Font License, in `src/fonts/`)
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

## Editing content
Career content (selected work, roles, education, tools) lives in one file:
- `src/data/profile.ts`

Site name, description, and links:
- `src/components/siteConfig.ts`

Colours are CSS variables in `src/app/globals.css`. The MUI theme in `src/theme/theme.ts` mirrors them for the study log page, so change both together.

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

### Recommended deploy command (with cache policies)
Use the included script to apply cache headers that improve Lighthouse performance:

```bash
./scripts/deploy-static-site.sh <s3-bucket-name> [cloudfront-distribution-id]
```

What it sets:
- `/_next/static/*`: `public,max-age=31536000,immutable`
- `*.html`, `*.xml`, `*.txt`: `public,max-age=0,must-revalidate`
- other files: `public,max-age=3600`

## Validation Before Deploy
```bash
npm run lint
npm run typecheck
npm run build
```
