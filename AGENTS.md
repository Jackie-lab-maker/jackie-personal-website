# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Overview

Jackie (Jingkai) Shao's personal engineering portfolio site, built with Next.js (App Router) and originally scaffolded via v0 by Vercel. ASCII-art / terminal-inspired visual theme throughout.

## Commands

Package manager is **pnpm** (pnpm-lock.yaml is the source of truth; a package-lock.json also exists but isn't used for installs).

```bash
pnpm install      # install deps
pnpm dev          # start dev server (http://localhost:3000)
pnpm build        # production build
pnpm start        # run production build
pnpm lint         # eslint .
```

There is no test suite configured in this repo.

Notes on build config (`next.config.mjs`):
- `typescript.ignoreBuildErrors: true` — production builds do NOT fail on TS errors, so run `npx tsc --noEmit` manually to check types.
- `images.unoptimized: true` — Next/Image optimization is disabled (site is statically hosted on Vercel).

## Architecture

### Data-driven homepage, static sub-pages

The homepage (`app/page.tsx`) is a client component that fetches `public/resumeData.json` at runtime (not at build time) and passes it into `<Hero data={data.main} />`. The JSON has four top-level sections: `main` (bio/contact/social), `resume` (education, work, skills), `portfolio` (projects), `testimonials`. `hooks/use-resume-data.ts` provides a reusable `useResumeData()` hook for the same fetch — components should prefer this hook over duplicating the fetch logic.

By contrast, `/about`, `/projects`, `/education`, `/contact`, and the `/experience` index page are each hand-written pages that independently call `useResumeData()` to render their content (rather than receiving it as props from the homepage). `/design-team`, `/instagram`, and the `/experience/<company>` detail pages are fully hand-written with hardcoded content, not driven by `resumeData.json` at all.

### Experience section structure

Each employer has its own route with a single page:
- `app/experience/<company>/page.tsx` — role overview + photo gallery (with lightbox)

Current companies: `chart-industries`, `micron-technology`, `opmobility-automation`, `opmobility-manufacturing`, `wisa`. `app/experience/page.tsx` is the index/listing page linking out to each. `app/experience/layout.tsx` is a pass-through layout — the reason it exists is that `Navigation` (in `components/navigation.tsx`) explicitly hides the global nav bar for any path starting with `/experience/`, and for the standalone `/instagram` page (a QR-code page linked from About) — these all have their own "Back to ..." header instead of the global nav.

When adding a new employer, follow the existing pattern: gallery items as a local `GALLERY_ITEMS` array of `{ id, src, alt, description }`, images under `public/images/<company>/`, and the same lightbox/back-link/ASCII-box header conventions as `app/experience/chart-industries/page.tsx`.

### 3D graphics

`components/graphics/wireframe-3d.tsx` exports `Wireframe3D` — a dependency-free canvas renderer for slowly rotating retro-CAD wireframe meshes (`chip`, `aircraft`, `globe`, `gradCap`, `icosahedron`, `drone`), used as section-header accents on the about/projects/experience/education/design-team/contact pages. It inherits the theme accent via CSS `currentColor` (works with the dark/light toggle), pauses off-screen via IntersectionObserver, and renders a single static frame under reduced motion. Each page uses a distinct shape — pick a new one (or extend `wireframe-3d.tsx` with another primitive) rather than reusing a shape from another page.

### Motion conventions

`components/motion/reveal.tsx` exports `Reveal`, `Stagger`, and `StaggerItem` — scroll-triggered animation wrappers built on Framer Motion, each respecting `useReducedMotion()` (falls back to a plain `div` with no animation). Use these instead of hand-rolling `motion.div` scroll animations so reduced-motion behavior stays consistent. Standard easing curve is `[0.22, 1, 0.36, 1]`. `components/motion/tilt-3d.tsx` exports `Tilt3D`, a pointer-tracking hover-tilt wrapper (critically-damped spring, auto-disabled without a hover-capable pointer or under reduced motion) used to wrap most cards site-wide.

### Theming

`ThemeProvider` (next-themes) wraps the app in `app/layout.tsx` with `defaultTheme="dark"` and `enableSystem={false}` — the toggle in `Navigation` explicitly flips `dark`/`light` classes rather than following the OS setting. Colors are defined as OKLCH CSS custom properties in `app/globals.css` under `:root` and `.dark`; Tailwind v4 is configured via `@import "tailwindcss"` (no `tailwind.config.js` — theme tokens live in CSS).

### UI components

`components/ui/` is the shadcn/ui library (style: "new-york", base color: neutral, no border radius — `--radius: 0rem` — to keep the sharp/terminal aesthetic). Path aliases are configured in both `tsconfig.json` and `components.json`: `@/components`, `@/components/ui`, `@/hooks`, `@/lib`.
