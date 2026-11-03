# Segun Michael — Project Setup & Foundation Documentation

This document records the production-grade project foundation, installed dependency versions, directory architecture, configuration decisions, and verification commands for the **Segun Michael** personal brand platform.

---

## 1. Installed Technology Stack

- **Framework:** Next.js 16.4.4 (App Router, `src/` directory, Turbopack enabled by default)
- **UI Runtime:** React 19.3.0 & React DOM 19.3.0 (Server Components by default)
- **Language:** TypeScript 5.9.3 (`strict: true`, bundler module resolution, `@/*` path alias)
- **Styling:** Tailwind CSS 4.3.3 via official `@tailwindcss/turbopack` 4.3.3 loader integration, paired with `clsx`, `tailwind-merge`, and `class-variance-authority`
- **Animation:** Motion (`motion` 14.9.0, imported via `motion/react`) + GSAP (`gsap` 3.15.0 & `@gsap/react` 2.1.2)
- **Icons:** Lucide React (`lucide-react` 1.66.0)
- **Forms & Schema Validation:** React Hook Form (`react-hook-form` 7.91.0), Zod (`zod` 4.6.7), and Hook Form Resolvers (`@hookform/resolvers` 7.0.1)
- **Code Quality & Formatting:** ESLint 9.39.5 (`eslint-config-next` 16.4.4 flat config) + Prettier 3.9.10 with `prettier-plugin-tailwindcss` 0.8.1

---

## 2. Exact Installed Dependency Versions

Verified directly from `node_modules`:

### Production Dependencies

| Package                    | Installed Version | `package.json` Range | Purpose                                                                |
| :------------------------- | :---------------- | :------------------- | :--------------------------------------------------------------------- |
| `next`                     | `16.4.4`          | `16.4.4`             | Core React framework (App Router, Turbopack, SSR/SSG)                  |
| `react`                    | `19.3.0`          | `19.3.0`             | Core React UI library                                                  |
| `react-dom`                | `19.3.0`          | `19.3.0`             | React DOM renderer                                                     |
| `clsx`                     | `2.1.1`           | `^2.1.1`             | Conditional class name construction                                    |
| `tailwind-merge`           | `3.7.0`           | `^3.7.0`             | Deterministic merging of Tailwind utility classes                      |
| `class-variance-authority` | `0.7.1`           | `^0.7.1`             | Type-safe component variant composition                                |
| `motion`                   | `14.9.0`          | `^14.9.0`            | Declarative React animations (`import { motion } from "motion/react"`) |
| `gsap`                     | `3.15.0`          | `^3.15.0`            | Timeline, scroll-triggered, and editorial animation engine             |
| `@gsap/react`              | `2.1.2`           | `^2.1.2`             | React `useGSAP()` hook for automatic animation context cleanup         |
| `lucide-react`             | `1.66.0`          | `^1.66.0`            | Standard vector icon library                                           |
| `react-hook-form`          | `7.91.0`          | `^7.91.0`            | Performant, accessible form state management                           |
| `zod`                      | `4.6.7`           | `^4.6.7`             | TypeScript-first schema validation                                     |
| `@hookform/resolvers`      | `7.0.1`           | `^7.0.1`             | Zod integration resolver for `react-hook-form`                         |

### Development Dependencies

| Package                       | Installed Version | `package.json` Range | Purpose                                                    |
| :---------------------------- | :---------------- | :------------------- | :--------------------------------------------------------- |
| `typescript`                  | `5.9.3`           | `^5`                 | Static type checking                                       |
| `tailwindcss`                 | `4.3.3`           | `^4`                 | Utility-first CSS framework (v4 CSS-first architecture)    |
| `@tailwindcss/turbopack`      | `4.3.3`           | `^4`                 | Official Next.js 16 Turbopack CSS loader for Tailwind v4   |
| `eslint`                      | `9.39.5`          | `^9`                 | JavaScript/TypeScript linter (Flat Config)                 |
| `eslint-config-next`          | `16.4.4`          | `16.4.4`             | Official Next.js Core Web Vitals & TypeScript ESLint rules |
| `prettier`                    | `3.9.10`          | `^3.9.10`            | Code formatter                                             |
| `prettier-plugin-tailwindcss` | `0.8.1`           | `^0.8.1`             | Automatic Tailwind CSS class sorting                       |
| `@types/node`                 | `24.19.2`         | `^24.19.2`           | Node.js TypeScript definitions (aligned with Node 24 LTS)  |
| `@types/react`                | `19.3.0`          | `^19`                | React TypeScript definitions                               |
| `@types/react-dom`            | `19.3.0`          | `^19`                | React DOM TypeScript definitions                           |

---

## 3. Package Manager & Node.js Requirements

- **Package Manager:** `npm` (`v11.13.0` verified in workspace)
- **Lockfile:** `package-lock.json` (lockfileVersion 3)
- **Node.js Requirement:** `>=20.9.0` configured in `package.json` `engines.node` (verified on **Node.js `v24.16.0`** in the active environment).
- **Important:** Use `npm` exclusively in this repository. Do not mix `pnpm`, `yarn`, or `bun` lockfiles.

---

## 4. Project Directory Structure

```text
.
├── docs/
│   └── PROJECT_SETUP.md            # Project foundation & setup documentation
├── public/
│   ├── fonts/                      # Self-hosted font files (preserved via .gitkeep)
│   ├── icons/                      # Static icon assets (preserved via .gitkeep)
│   ├── images/
│   │   ├── editorial/              # Editorial photography (preserved via .gitkeep)
│   │   ├── media/                  # Media & communication assets (preserved via .gitkeep)
│   │   ├── portraits/              # Portrait photography (preserved via .gitkeep)
│   │   └── real-estate/            # Real estate & renovation assets (preserved via .gitkeep)
│   └── logos/                      # Brand and partner marks (preserved via .gitkeep)
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css             # Tailwind CSS v4 entry stylesheet
│   │   ├── layout.tsx              # Root Server Component layout
│   │   └── page.tsx                # Minimal foundation verification entry page
│   ├── components/
│   │   ├── layout/                 # Header, footer, navigation shells (.gitkeep)
│   │   ├── motion/                 # Reusable Motion & GSAP wrappers (.gitkeep)
│   │   ├── shared/                 # Cross-section editorial components (.gitkeep)
│   │   └── ui/                     # Low-level primitives (.gitkeep)
│   ├── data/                       # Structured static content & configuration (.gitkeep)
│   ├── hooks/                      # Custom client React hooks (.gitkeep)
│   ├── lib/
│   │   └── utils.ts                # cn() class merging helper (clsx + tailwind-merge)
│   ├── styles/                     # Supplementary stylesheets (.gitkeep)
│   └── types/                      # Shared TypeScript interfaces & types (.gitkeep)
├── .env.example                    # Template for environment variables
├── .gitignore                      # Git ignore rules
├── .prettierignore                 # Prettier ignore rules
├── .prettierrc                     # Prettier + Tailwind class sorting config
├── AGENTS.md                       # Next.js agent rules generated by create-next-app
├── eslint.config.mjs               # ESLint 9 flat configuration
├── next.config.ts                  # Next.js 16 configuration
├── package.json                    # Dependencies and scripts
├── package-lock.json               # Deterministic npm dependency lockfile
├── README.md                       # Quick-start repository guide
└── tsconfig.json                   # Strict TypeScript configuration
```

> **Note on Pre-Existing Workspace Folders:** The workspace root also contains `.agent/`, `.claude/`, `potrait/`, and `website gallery/` which existed prior to initialization. These have been preserved untouched and excluded from ESLint and Prettier scans.

---

## 5. Configuration Decisions

1. **Next.js 16.4.4 & Tailwind CSS v4 Integration:**
   - Uses the official Next.js 16.4.4 template (`app-tw`) which configures `@tailwindcss/turbopack` in `next.config.ts` and `@import "tailwindcss";` in `src/app/globals.css`.
   - Avoids legacy Tailwind v3 `tailwind.config.js` files so all future design tokens follow Tailwind v4's CSS-first `@theme` standard.
2. **Strict TypeScript (`tsconfig.json`):**
   - `strict: true`, `noEmit: true`, `isolatedModules: true`, `moduleResolution: "bundler"`, and `"@/*": ["./src/*"]` path alias.
3. **ESLint Flat Config (`eslint.config.mjs`):**
   - Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
   - Ignores build artifacts (`.next/**`, `out/**`, `build/**`, `coverage/**`) as well as non-code workspace asset folders (`.agent/**`, `.claude/**`, `potrait/**`, `website gallery/**`).
4. **Prettier (`prettier` + `prettier-plugin-tailwindcss`):**
   - Configured in `.prettierrc` with `prettier-plugin-tailwindcss` to automatically sort Tailwind utility classes deterministically without conflicting with ESLint.
5. **Testing Strategy Evaluation (Section 5):**
   - Evaluated installing `vitest` (`5.0.5`) + `@testing-library/react` + `jsdom`. At the time of setup, `vitest@5.0.5` had an upstream npm registry publishing discrepancy (`No matching version found for @vitest/spy@5.0.5`).
   - Per project guidelines (_"Only install and configure the testing stack if it can be integrated cleanly with the selected Next.js setup. Do not introduce unnecessary configuration complexity"_), unit/component test runner packages were deferred until the component implementation phase when version-pinned Vitest or Playwright E2E testing is introduced.

---

## 6. Available npm Scripts

| Script                 | Command              | Description                                                |
| :--------------------- | :------------------- | :--------------------------------------------------------- |
| `npm run dev`          | `next dev`           | Starts the local Next.js development server (Turbopack)    |
| `npm run build`        | `next build`         | Compiles an optimized production build                     |
| `npm run start`        | `next start`         | Starts the Next.js production server after `npm run build` |
| `npm run lint`         | `eslint`             | Runs ESLint across the project                             |
| `npm run typecheck`    | `tsc --noEmit`       | Runs the TypeScript compiler check without emitting files  |
| `npm run format`       | `prettier --write .` | Formats all project files and sorts Tailwind classes       |
| `npm run format:check` | `prettier --check .` | Verifies that all files adhere to Prettier formatting      |

---

## 7. Operational Workflows

### Start the Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Run Linting, Type Checking, and Formatting Verification

```bash
npm run typecheck
npm run lint
npm run format:check
```

### Run a Production Build

```bash
npm run build
npm run start
```

---

## 8. Unresolved Setup Issues

- **None blocking development or production builds.**
- **Note on Existing Raw Photography Folders:** Raw image archives in `./potrait` and `./website gallery` remain in the workspace root as untracked source material and have not been copied into `public/images/` or committed to Git, awaiting curation and optimization during the creative implementation phase.
