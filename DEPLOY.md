# GitHub Pages Deploy Notes

This package intentionally excludes:

- node_modules
- .next
- .env.local
- src/app/api

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. In GitHub, open Settings -> Pages.
3. Set Source to "GitHub Actions".
4. Push to the main branch.

The included workflow builds the static site into `out/` and deploys it automatically.

This package is configured for:

```text
https://wennyzg.github.io/miao-su/
```

The workflow uses:

```bash
NEXT_PUBLIC_BASE_PATH=/miao-su
GITHUB_PAGES=true
npm run build
```

## Manual Build

```bash
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/miao-su npm run build
```

Upload the generated `out/` folder to GitHub Pages.

Keep `.nojekyll` in the published root. GitHub Pages needs it to serve Next.js files under `_next/`.

No Tencent Cloud environment variables are required. Emotion analysis runs entirely in the browser.
