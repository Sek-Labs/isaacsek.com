# isaacsek.com

Personal website for Isaac Sek at `https://isaacsek.com`.

## Local development

```sh
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Deployment

Canonical production target: Fly.io app `isaacsek-site`, served at `https://isaacsek.com`.

GitHub Pages and Cloudflare Pages are intentionally not deploy targets for this repo. The old GitHub Pages workflow was removed to avoid duplicate production paths.

This is a Vite static site. Build output is `dist/`.

```sh
npm run build
fly deploy
```

Before changing deployment config, verify production with:

```sh
curl -sSI https://isaacsek.com | sed -n '1,20p'
fly status -a isaacsek-site
```
