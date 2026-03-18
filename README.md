# Nerdstate

Nerdstate is a retro-themed game dashboard built with Vue 3.

This project started as a love letter to classic gaming and a space to organize, explore, and celebrate timeless titles. The goal is not only to build a solid app, but also to grow an open project where more people can collaborate, share ideas, and shape what comes next.

## 🎯 Mission

- Preserve the spirit of classic games through a modern web experience.
- Build a clean, maintainable foundation that can evolve over time.
- Create a collaborative project where contributors can have real impact.

## 🚀 Vision

Today, Nerdstate includes:

- A public landing page
- Authentication with Supabase
- A protected dashboard with games and library sections

In the future, I want to expand with:

- Richer game metadata and discovery experiences
- Community-driven features and quality-of-life tools
- Better personalization and profile capabilities
- More test coverage and stronger developer tooling

If you want to help build that future, you are welcome here.

## 🧰 Tech Stack

- Vue 3 + TypeScript
- Vite 7
- Tailwind CSS 4
- Pinia (state management)
- Vue Router
- Supabase (`@supabase/supabase-js`)
- Vitest + Vue Test Utils
- ESLint + OXlint + Prettier

## ✅ Requirements

- Bun (recommended package manager/runtime)
- Node.js `^20.19.0 || >=22.12.0` (for compatibility with tooling)

## ⚡ Getting Started

1. Install dependencies:

   ```sh
   bun install
   ```

2. Create `.env.local` in the project root:

   ```sh
   SUPABASE_URL=your-project-url
   SUPABASE_KEY=your-publishable-or-anon-key
   ```

   `SUPABASE_` variables are loaded by Vite (`envPrefix` includes `SUPABASE_`).

3. Start the development server:

   ```sh
   bun dev
   ```

4. Open the app in your browser (default Vite URL):

   ```text
   http://localhost:5173
   ```

## 🛠️ Available Scripts

- `bun dev`: Run Vite in development mode.
- `bun run build`: Type-check and build for production.
- `bun run build-only`: Run only `vite build`.
- `bun run preview`: Preview production build locally.
- `bun run test:unit`: Run unit tests with Vitest.
- `bun run lint`: Run OXlint and ESLint with autofix.
- `bun run format`: Format `src/` with Prettier.

## 🗺️ App Routes

- Public:
  - `/` → Landing page
  - `/login` → Login
  - `/register` → Register
- Protected (requires active Supabase session):
  - `/dashboard`
  - `/dashboard/games`
  - `/dashboard/library`

If a user is not authenticated and tries to access protected routes, they are redirected to `/login`.

## 🧩 Project Structure

The codebase is organized by responsibility:

- `views/` contains page-level screens (public, auth, and dashboard areas).
- `layouts/` defines the main page shells for public, private, and auth routes.
- `components/` holds reusable UI pieces grouped by feature (`dashboard`, `landing`, `shared`).
- `composables/` stores reusable composition logic and stateful helpers.
- `stores/` manages global app state (for example, authentication).
- `router/` contains route definitions and navigation guards.
- `styles/` centralizes global styles, tokens, and utility classes.
- `lib/` and `utils/` contain external integrations and generic helpers.

## 📝 Notes

- Supabase client initialization lives in `src/lib/supabase.ts`.
- Auth session/state logic is handled in `src/stores/auth.ts`.
- Router guard logic is defined in `src/router/index.ts`.

## 🤝 Contributing

Contributions are welcome, whether you are fixing bugs, improving UI/UX, writing tests, or proposing new ideas.

- Open an issue to discuss ideas or improvements.
- Keep pull requests focused and easy to review.
- Run lint, tests, and build checks before submitting:

  ```sh
  bun run lint
  bun run test:unit
  bun run build
  ```

Even small contributions help move Nerdstate forward.
