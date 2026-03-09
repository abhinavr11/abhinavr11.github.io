# website

This repo is configured to deploy the frontend app in `frontend/` to GitHub Pages.

## What is already configured

- GitHub Pages workflow: `.github/workflows/deploy-pages.yml`
- CRA build base URL: `frontend/package.json` uses
  `"homepage": "https://abhinavr11.github.io"`
- SPA deep-link support for Pages refreshes:
  - `frontend/public/404.html`
  - redirect handling script in `frontend/public/index.html`

## Deploy to GitHub Pages

1. Push this repository to GitHub (default branch: `main`).
2. In GitHub, open `Settings -> Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to `main` (or run the `Deploy GitHub Pages` workflow manually).

Important:

- To publish at the root URL `https://abhinavr11.github.io`, the repository name must be exactly `abhinavr11.github.io`.
- If this repository is named `website`, GitHub Pages will publish at `https://abhinavr11.github.io/website` instead.

Your site will be published at:

- `https://abhinavr11.github.io`

## Local development

```bash
cd frontend
npm install
npm start
```

## Local production build

```bash
cd frontend
npm run build
```

If you change GitHub username/domain/repository setup, update `frontend/package.json` `homepage` accordingly.
