# CLAUDE.md - Developer Guide

This guide outlines common development commands, test commands, and coding standards for the Wannasingh Portfolio project.

## Development Commands

* **Start Development Server**: `npm run dev`
* **Build Project**: `npm run build`
* **Start Production Server**: `npm run start`
* **Format Code**: `npm run format` (Runs Prettier)
* **Lint Code**: `npm run lint` (Runs ESLint)

## Testing Commands

* **Run All Tests**: `npm test` (Runs Jest)
* **Run Tests in Watch Mode**: `npm run test:watch`
* **Generate Test Coverage**: `npm run test:coverage`
* **Test Local Storage Bucket Connection**: `npm run test:bucket` (Validates Cloudflare R2 bucket credentials)

## Coding Standards & Rules

* **Database Client Usage**: 
  * Do **NOT** use `supabase` packages or clients.
  * Use the query builder client `db` imported from `@/app/lib/api-client`.
  * Use the admin client `dbAdmin` imported from `@/app/lib/admin-client`.
* **Asset Loading**: Always wrap dynamic project, profile, and media URLs in `resolveImageUrl` (from `@/app/lib/storage-utils`) to leverage the same-origin asset proxy under `/media-assets/` and avoid CORS issues.
* **Typing**: Enforce strict TypeScript typing. Avoid using `any`; define explicit interfaces in `api-client.ts` or corresponding TS files.
* **Component Styling**: Styled using Vanilla CSS inside dynamic Tailwind CSS frameworks.
