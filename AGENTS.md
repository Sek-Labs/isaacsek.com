# AGENTS.md - isaacsek.com

## Scope

Isaac Sek's personal website. This is a Vite static site for `https://isaacsek.com`.

## Source of Truth

- Package scripts live in `package.json`.
- Fly.io config lives in `fly.toml`.
- Canonical production app: Fly app `isaacsek-site`.
- GitHub Pages and Cloudflare Pages are not deploy targets for this repo.

## Commands

```sh
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

## Deployment

Commit, merge, and deploy completed, verified work automatically unless the request explicitly says not to deploy. Use Fly.io for app `isaacsek-site`; do not add or restore GitHub Pages deployment.

## Agent Notes

- Keep changes small and website-specific.
- Put reusable UI primitives in `Sek-Labs/sek-ui`, not this repo.
- Do not commit generated `dist/` churn unless the task explicitly requires it.
- Verify deployment-related edits against `fly.toml` and the README before changing docs.
