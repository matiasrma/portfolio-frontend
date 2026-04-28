# AGENTS.md

## Commands

```bash
npm run start     # Dev server at http://localhost:4200
npm run build    # Build to dist/
npm run build:prod   # Production build
npm run deploy   # Build + Firebase deploy
```

## Important Notes

- **No tests configured**: `npm test` is a no-op placeholder
- **Angular 21** (README.md incorrectly says v14)
- **Tailwind 4** + PostCSS used (v4 config, not v3)
- **Supabase client**: `@supabase/supabase-js` for backend
- **Firebase deploy**: Requires `FIREBASE_SERVICE_ACCOUNT_MATIASRIVAS_PORTFOLIO` secret in CI

## CI Deployment

- Push to `master` triggers Firebase Hosting auto-deploy via `.github/workflows/firebase-hosting-merge.yml`
- PRs also get preview deployments via `firebase-hosting-pull-request.yml`
- Adding new components to Administrar requires adding route to `administrar.routes.ts`

## Project Structure

- `src/app/` - Main application code
- `src/environments/` - Environment configs
- `dist/` - Build output (gitignored)