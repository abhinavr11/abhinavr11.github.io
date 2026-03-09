# website

This repo is configured to deploy the frontend app in `frontend/` to GitHub Pages.

## What is already configured

- GitHub Pages workflow: `.github/workflows/deploy-pages.yml`
- CRA build base URL: `frontend/package.json` uses
  `"homepage": "https://abhinavr11.github.io/website"`
- SPA deep-link support for Pages refreshes:
  - `frontend/public/404.html`
  - redirect handling script in `frontend/public/index.html`

## Deploy to GitHub Pages

1. Push this repository to GitHub (default branch: `main`).
2. In GitHub, open `Settings -> Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to `main` (or run the `Deploy GitHub Pages` workflow manually).

Your site will be published at:

- `https://abhinavr11.github.io/website`

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

If you change GitHub username/repository name, update `frontend/package.json` `homepage` accordingly.
