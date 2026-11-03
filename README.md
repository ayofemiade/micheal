# Segun Michael — Official Website

Production-grade Next.js application foundation for the **Segun Michael** personal brand platform, engineered by **MoyoCode Technologies**.

## Tech Stack

- **Framework:** Next.js 16.4.4 (App Router, TypeScript, Turbopack)
- **UI Library:** React 19.3.0
- **Styling:** Tailwind CSS v4 (`@tailwindcss/turbopack`), `clsx`, `tailwind-merge`, `class-variance-authority`
- **Animation:** GSAP 3.15 (ScrollTrigger, SplitText), loaded on idle via `src/lib/gsap.ts`. `motion` is installed but no longer used (see docs/IMPLEMENTATION_REPORT.md).
- **Fonts:** Zodiak and Switzer (Fontshare, ITF Free Font License): self-hosted and unmodified. **Do not redistribute; keep this repository private.**
- **Icons:** `lucide-react`
- **Forms & Validation:** `react-hook-form`, `zod`, `@hookform/resolvers`
- **Code Quality:** TypeScript (`strict`), ESLint 9 (`eslint-config-next`), Prettier (`prettier-plugin-tailwindcss`)

## Prerequisites

- **Node.js:** `>=20.9.0` (verified with `v24.16.0`)
- **Package Manager:** `npm` (`v11.13.0`)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

   Access the local application at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Create an optimized production build
- `npm run start` — Start the production server
- `npm run typecheck` — Run TypeScript static type verification (`tsc --noEmit`)
- `npm run lint` — Run ESLint checks
- `npm run format` — Format code and sort Tailwind classes with Prettier
- `npm run format:check` — Verify code formatting with Prettier

## Documentation

For detailed architecture, exact dependency versions, directory structure, and configuration decisions, see [`docs/PROJECT_SETUP.md`](./docs/PROJECT_SETUP.md).

Homepage ("Near to Far"):
- [`docs/NEW_CREATIVE_DIRECTION.md`](./docs/NEW_CREATIVE_DIRECTION.md): concept and the alternatives considered
- [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md): tokens, type, motion and component map
- [`docs/IMPLEMENTATION_REPORT.md`](./docs/IMPLEMENTATION_REPORT.md): what was built, QA, measurements and open items
- Image derivatives: `node scripts/optimize-images.mjs` (originals in `potrait/` and `website gallery/` are never served)
