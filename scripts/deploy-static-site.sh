#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: $0 <s3-bucket-name> [cloudfront-distribution-id]"
  exit 1
fi

BUCKET="$1"
DISTRIBUTION_ID="${2:-}"

if [[ ! -d "out" ]]; then
  echo "Build output not found. Run: npm run build"
  exit 1
fi

echo "Syncing all files with baseline cache..."
aws s3 sync out "s3://${BUCKET}" --delete --cache-control "public,max-age=3600"

echo "Applying no-cache policy to HTML and metadata files..."
aws s3 cp out "s3://${BUCKET}" \
  --recursive \
  --exclude "*" \
  --include "*.html" \
  --include "*.xml" \
  --include "*.txt" \
  --cache-control "public,max-age=0,must-revalidate"

echo "Applying long-lived immutable cache policy to hashed Next.js assets..."
aws s3 cp out/_next/static "s3://${BUCKET}/_next/static" \
  --recursive \
  --cache-control "public,max-age=31536000,immutable"

echo "Applying long-lived cache policy to static media assets..."
aws s3 cp out "s3://${BUCKET}" \
  --recursive \
  --exclude "*" \
  --include "*.webp" \
  --include "*.jpg" \
  --include "*.jpeg" \
  --include "*.png" \
  --include "*.svg" \
  --include "*.woff2" \
  --include "*.woff" \
  --cache-control "public,max-age=2592000,stale-while-revalidate=86400"

if [[ -n "${DISTRIBUTION_ID}" ]]; then
  echo "Creating CloudFront invalidation..."
  aws cloudfront create-invalidation --distribution-id "${DISTRIBUTION_ID}" --paths "/*"
fi

echo "Deploy complete."
