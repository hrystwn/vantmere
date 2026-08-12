# VANTMÈRE

*Quiet permanence.*

A luxury streetwear marketing and lookbook site built as a Next.js App Router
application. The brand is expressed through a strict monochrome identity,
cinematic scroll-driven animation, and restrained, declarative copy — no
exclamation points anywhere in the site.

There is no real commerce. "Add to Cart" opens a "coming soon" drawer that
captures an email address; the store itself has not launched.

## Overview

VANTMÈRE presents a twelve-piece capsule collection across four categories —
Outerwear, Knitwear, Trousers, and Accessories — through a six-page marketing
site: a cinematic WebGL hero, a pinned manifesto section, an editorial
collection grid with category filtering, individual product pages, and a
horizontal-scroll lookbook.

The entire visual language is built on a five-color palette (ink, paper, and
three grays), two typefaces (Playfair Display for display type, Space
Grotesk for all-caps micro-labels), and monochrome imagery enforced with a
CSS grayscale filter. Every scroll animation is gated behind
`prefers-reduced-motion`, so the site is fully usable — content is visible
and functional — with animation disabled.

## Features

- **Cinematic hero** — a lazy-loaded React Three Fiber WebGL scene (an
  animated cloth shader) on desktop, with a static poster image fallback on
  mobile and under reduced motion.
- **Scroll-driven section animation** — GSAP + ScrollTrigger, synced to
  Lenis smooth scroll, with every trigger scoped to its section via a shared
  `useSectionAnimation` hook (auto-cleanup on unmount, reduced-motion aware).
- **Editorial collection grid** — client-side category filtering
  (Outerwear / Knitwear / Trousers / Accessories) with staggered,
  clip-path reveal animations.
- **Product detail pages** — statically generated for all 12 products
  (`generateStaticParams`), with a sticky info rail, size selector, and
  fabric-story copy.
- **Horizontal-scroll lookbook** — a pinned, scrubbed horizontal track on
  desktop that degrades to a vertical stack on mobile and under reduced
  motion.
- **Custom cursor** — a two-part dot/ring cursor with contextual VIEW/DRAG
  labels, disabled on coarse pointers (touch) and under reduced motion.
- **Page transitions** — a wipe transition between route changes.
- **Coming-soon commerce** — "Add to Cart" opens a drawer with an email
  capture form instead of a real checkout.
- **SEO baseline** — a dynamic `sitemap.ts` generated from the product data
  layer, `robots.ts`, per-page metadata, and Open Graph tags.
- **Typed, tested data layer** — products and lookbook images are typed
  local modules (`lib/data/`) with a Vitest suite covering lookup and
  filtering helpers.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Scroll animation | GSAP + ScrollTrigger + `@gsap/react` |
| Smooth scroll | Lenis |
| Micro-interactions | Framer Motion |
| 3D | three.js + `@react-three/fiber` |
| Testing | Vitest (data-layer tests) |
| Deployment | Vercel |

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build and run production

```bash
npm run build
npm start
```

### Test

```bash
npm test
```

Runs the Vitest suite for `lib/data/products.ts` — slug uniqueness, category
filtering, and related-product logic.

### Lint

```bash
npm run lint
```

## Project structure

```
app/                    Routes (App Router)
  page.tsx               Home — hero, manifesto, featured drop, lookbook teaser
  collection/             Collection grid with category filters
  collection/[slug]/      Individual product pages (statically generated)
  lookbook/                Horizontal-scroll lookbook
  about/                  Brand manifesto page
  contact/                Stockists, correspondence, newsletter signup
  sitemap.ts              Dynamic sitemap, built from product data
  robots.ts               robots.txt

components/
  sections/               Page-level sections (Hero, Manifesto, CollectionGrid, ...)
  ui/                     Reusable UI (Nav, Footer, ProductCard, Cursor, ...)
  three/                  React Three Fiber hero scene

lib/
  data/                   Typed product & lookbook data, plus tests
  animation/              GSAP setup, Lenis provider, useSectionAnimation hook
  fonts.ts                next/font Google Fonts configuration

docs/                    Brand one-pager, sitemap architecture notes,
                          and implementation specs/plans
```

## Design tokens

Defined in `app/globals.css` via Tailwind's `@theme`:

| Token | Value | Usage |
|---|---|---|
| `--color-ink` | `#0A0A0A` | Primary background |
| `--color-paper` | `#F4F2EF` | Primary foreground / light sections |
| `--color-gray-1` | `#2E2C2A` | Borders, dividers |
| `--color-gray-2` | `#8A8683` | Secondary text, micro-labels |
| `--color-gray-3` | `#D6D2CD` | Muted body copy on dark backgrounds |

No other colors are used anywhere in the site. All imagery is rendered
through `next/image` and forced to grayscale via the `.img-mono` utility
class.

## Usage examples

**Reading product data:**

```ts
import { getProductsByCategory, getProductBySlug } from "@/lib/data/products";

const outerwear = getProductsByCategory("Outerwear");
const coat = getProductBySlug("sculpted-overcoat");
```

**Adding a scroll animation to a new section:**

```tsx
"use client";

import { useRef } from "react";
import { useSectionAnimation } from "@/lib/animation/useSectionAnimation";

export default function MySection() {
  const ref = useRef<HTMLElement>(null);

  useSectionAnimation(ref, (gsap) => {
    gsap.from(".reveal", {
      opacity: 0,
      y: 40,
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
  });

  return <section ref={ref}>{/* ... */}</section>;
}
```

The hook only runs the animation when the user has not requested reduced
motion, and tears down every tween/ScrollTrigger it creates when the
component unmounts.

## Deployment

The site is deployed on Vercel at `https://vantmere.vercel.app`. If a custom
domain is added later, update `BASE_URL` in `app/sitemap.ts`, the URL in
`app/robots.ts`, and `metadataBase` in `app/layout.tsx` together — see
`docs/STRUCTURE.md` for the full sitemap/SEO rationale.

## Documentation

Project specs and implementation plans live under `docs/superpowers/specs`
and `docs/superpowers/plans`. Sitemap and site-architecture notes are in
`docs/STRUCTURE.md`.
