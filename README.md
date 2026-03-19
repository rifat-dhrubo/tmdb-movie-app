<div align="center">

# Cine

<p align="center">
  A personal movie curation app with the tone of a film journal. Search, discover, and save films with warm editorial minimalism.
</p>

[![Live Demo](https://img.shields.io/badge/Live_Demo-movies.rifathossain.dev-F16E5B)](https://movies.rifathossain.dev)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF7F50?logo=reactrouter&logoColor=white)](https://tanstack.com/router)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

## Overview

**Cine** is a personal movie watchlist application built around discovery, curation, and mood. It uses TMDB for movie data, Firebase for authentication and watchlist persistence, and the TanStack stack for routing, server state, and SSR-ready application structure.

The product intentionally avoids the feel of a generic streaming dashboard. Its visual language leans on warm editorial minimalism: serif-led hierarchy, restrained chrome, soft surfaces, and motion that supports atmosphere without getting in the way.

## Demo Video

- Google Drive: `[Add demo video link here]`

### Key Features

- **Editorial home page** with a cinematic hero, trending picks, and popular shelves
- **Search experience** with debounced query input, year filtering, and infinite results
- **Discover flow** with genre filters, year filtering, and multiple sort modes
- **Movie detail pages** with overview, metadata, cast, crew, and related titles
- **Cast detail pages** with biography and department-grouped filmography
- **Personal watchlist** with live Firebase-backed persistence and multiple view modes
- **Authentication flows** for sign up, sign in, forgot password, and password reset

## Architecture & Philosophy

### Feature-Based Structure

The codebase is organized by feature instead of file type so components, hooks, and data logic stay close to the user flow they support.

```text
src/
├── features/              # Domain features
│   ├── auth/              # Firebase auth flows and context
│   ├── cast-detail/       # Person detail pages
│   ├── discover/          # Discovery filters and results
│   ├── home/              # Landing page sections and shelves
│   ├── movie-detail/      # Movie detail experience
│   ├── search/            # Search UI and data hooks
│   └── watchlist/         # Watchlist persistence and presentation
├── components/            # Shared site, movie, and UI primitives
├── routes/                # File-based TanStack Router routes
├── generated/             # Orval-generated TMDB clients and icon types
├── services/              # API client configuration
├── integrations/          # Query and theme integration helpers
└── lib/                   # Shared utilities and config
```

### Design Direction

The UI system follows a warm editorial approach

- **Typography**: `DM Serif Display` for editorial hierarchy, `DM Sans` for UI and body text
- **Color**: cream backgrounds, inky text, coral accents, and warm muted neutrals
- **Chrome**: low-contrast borders that feel like paper edges instead of hard scaffolding
- **Motion**: sparse, calm transitions with a few expressive moments like the home hero cascade

### State Strategy

- **Server state** lives in **TanStack Query**
- **Filter and sort state** lives in the URL through **TanStack Router** search params
- **Authentication state** is managed with React context around Firebase Auth
- **Watchlist sync** is backed by Firestore subscriptions for live updates

## Application Areas

| Route              | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| `/`                | Home page with hero, trending shelf, and popular shelf |
| `/search`          | Search movies by keyword with year refinement          |
| `/discover`        | Explore movies by genre, year, and sort order          |
| `/movies/$movieId` | View movie details, credits, and related titles        |
| `/cast/$castId`    | View cast details and filmography                      |
| `/watchlist`       | Manage a saved personal collection                     |
| `/sign-in`         | Sign in with email and password                        |
| `/sign-up`         | Create an account                                      |
| `/forgot-password` | Request a password reset                               |
| `/reset-password`  | Complete a password reset                              |

## Tech Stack

| Layer          | Technology                    | Why it is used                                    |
| -------------- | ----------------------------- | ------------------------------------------------- |
| App framework  | TanStack Start                | SSR-ready React application structure             |
| Routing        | TanStack Router               | Type-safe file-based routing and URL state        |
| Data fetching  | TanStack Query                | Caching, async state, prefetching, and pagination |
| API generation | Orval                         | Generated TMDB types and React Query hooks        |
| HTTP client    | Axios + `qs`                  | Typed requests and query param serialization      |
| Authentication | Firebase Auth                 | Email/password auth flows                         |
| Persistence    | Firestore                     | Per-user watchlist storage and live sync          |
| Styling        | Tailwind CSS v4               | Utility-first styling and design tokens           |
| UI primitives  | Radix UI + shadcn/ui patterns | Accessible, composable building blocks            |
| Animation      | Motion                        | Purposeful transitions and reveal effects         |
| Client state   | Zustand                       | Lightweight client-side state where needed        |
| Build tooling  | Vite                          | Fast local development and production bundling    |
| Deployment     | Cloudflare Workers + Wrangler | Edge deployment for the TanStack Start app        |

## TMDB API Integration

Cine uses **Orval** to generate its API layer directly from the TMDB OpenAPI specification.

### How It Works

1. `orval.config.mjs` points to the TMDB OpenAPI source
2. `pnpm run generate` pulls the schema and generates clients into `src/generated/tmdb/`
3. The generated output includes types, request helpers, and React Query hooks
4. `src/services/tmdb-api-client.ts` provides the shared Axios client and API key handling

### Example Generated Hooks

```ts
useMovieDetails(movieId);
useMovieCredits(movieId);
useMovieSimilar(movieId);
useSearchMovie(params);
useDiscoverMovie(params);
useTrendingMovies(undefined, 'week');
usePersonDetails(personId);
usePersonMovieCredits(personId);
```

This keeps the UI layer strongly typed and close to the shape of the upstream API.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- pnpm 9 or newer

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd tmdb-movie-app
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a local environment file:

   ```bash
   cp .env.example .env.local
   ```

   Then replace the placeholder values in `.env.local` with your own credentials.

### Required Environment Variables

The app validates environment variables in `src/env.ts`.

```bash
VITE_PUBLIC_FIREBASE_API_KEY=
VITE_PUBLIC_FIREBASE_AUTH_DOMAIN=
VITE_PUBLIC_FIREBASE_PROJECT_ID=
VITE_PUBLIC_FIREBASE_STORAGE_BUCKET=
VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
VITE_PUBLIC_FIREBASE_APP_ID=
VITE_TMDB_API_KEY=
VITE_PUBLIC_SITE_URL=http://localhost:3000
VITE_PUBLIC_DEFAULT_OG_IMAGE=http://localhost:3000/og-image.svg
```

Optional variables:

- `VITE_APP_TITLE`
- `SERVER_URL`

### Running Locally

```bash
pnpm run dev
```

The app runs at `http://localhost:3000`.

## Available Scripts

| Script                | Description                                    |
| --------------------- | ---------------------------------------------- |
| `pnpm run dev`        | Start the local Vite development server        |
| `pnpm run build`      | Create the production build and run TypeScript |
| `pnpm run serve`      | Preview the production build locally           |
| `pnpm run deploy`     | Build and deploy to Cloudflare Workers         |
| `pnpm run test`       | Run the Vitest suite                           |
| `pnpm run lint`       | Run ESLint                                     |
| `pnpm run lint:fix`   | Fix ESLint and Prettier issues where possible  |
| `pnpm run format`     | Run Prettier                                   |
| `pnpm run type:check` | Run TypeScript without emitting files          |
| `pnpm run check`      | Run formatting and lint fixes together         |
| `pnpm run generate`   | Regenerate TMDB client code through Orval      |
| `pnpm run cf-typegen` | Regenerate Wrangler and Cloudflare types       |
| `pnpm run commit`     | Open Commitizen for conventional commits       |

## Workflows

### Release

The repository includes a semantic release workflow in `.github/workflows/release.yml`.

- Runs on pushes to `main`
- Uses commit history to determine version bumps
- Publishes changelog and GitHub release metadata automatically

### Deployment

Deployment is configured for **Cloudflare Workers** via `wrangler.jsonc`.

- Worker name: `tmdb-movie-app`
- Custom domain: `movies.rifathossain.dev`
- Entry point: `@tanstack/react-start/server-entry`

Deploy manually with:

```bash
pnpm run deploy
```

## Notes

- The project includes Vitest configuration, though the current codebase does not yet include a test suite
- SVG icons are generated into a sprite and hashed during build for better caching
- Route, loading, and error states are customized to match the app's editorial tone

## License

MIT
