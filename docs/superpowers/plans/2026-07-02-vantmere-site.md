# VANTMÈRE Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the VANTMÈRE luxury streetwear marketing/lookbook site per the approved spec (`docs/superpowers/specs/2026-07-02-vantmere-site-design.md`).

**Architecture:** Next.js 15 App Router site with section-scoped GSAP ScrollTrigger animations (each section component owns and cleans up its own triggers via `useGSAP`), Lenis smooth scroll provided at root, Framer Motion for micro-interactions/transitions, and one lazy-loaded React Three Fiber hero scene. All product data is a typed local module.

**Tech Stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS v4, GSAP + ScrollTrigger + @gsap/react, Framer Motion, Lenis, three + @react-three/fiber, Vitest (data-layer tests only).

## Global Constraints

- Palette ONLY: ink `#0A0A0A`, paper `#F4F2EF`, gray-1 `#2E2C2A`, gray-2 `#8A8683`, gray-3 `#D6D2CD`. No other colors anywhere.
- Fonts: Playfair Display (display), Space Grotesk (body/UI), via `next/font/google` only.
- Brand copy: wordmark is `VANTMÈRE`, tagline `Quiet permanence.` — no exclamation points anywhere in site copy.
- All imagery through `next/image` with `sizes` set; grayscale enforced with CSS `filter: grayscale(1)` on image wrappers (class `img-mono`).
- Animations: transform/opacity only. Every ScrollTrigger lives inside `useGSAP` scoped to the section ref (auto-cleanup).
- Reduced motion: all scroll animation registered inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`; content must be fully visible without JS animation running.
- No real commerce: "Add to cart" opens the ComingSoonDrawer only.
- Gates for every task: `npx tsc --noEmit` passes and `npm run build` passes before commit.
- Placeholder images: use `https://images.unsplash.com/...` remote URLs (configured in next.config), monochrome fashion shots.

---

### Task 1: Scaffold project, fonts, design tokens

**Files:**
- Create: entire Next.js scaffold in repo root (`app/`, `next.config.ts`, `package.json`, …)
- Create: `app/layout.tsx`, `app/globals.css`, `lib/fonts.ts`
- Modify: `next.config.ts` (Unsplash remote images)

**Interfaces:**
- Consumes: nothing (first task)
- Produces: CSS vars/utilities `bg-ink`, `bg-paper`, `text-ink`, `text-paper`, `text-gray-1/2/3`, `font-display`, `font-body`, `.img-mono`, `.micro-label`; layout shell with `<main id="page">` slot; fonts exported as `playfair`, `grotesk` from `lib/fonts.ts`.

- [ ] **Step 1: Scaffold Next.js in the existing repo root**

Run (repo root `C:\Users\HYPE R Series\vantmere`):
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
npm i gsap @gsap/react framer-motion lenis three @react-three/fiber
npm i -D @types/three vitest
```
Expected: scaffold created alongside existing `docs/` and `.git/`; installs succeed.

- [ ] **Step 2: Configure remote images**

Replace `next.config.ts` content:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Fonts module**

Create `lib/fonts.ts`:
```ts
import { Playfair_Display, Space_Grotesk } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});
```

- [ ] **Step 4: Design tokens + global styles**

Replace `app/globals.css`:
```css
@import "tailwindcss";

@theme {
  --color-ink: #0a0a0a;
  --color-paper: #f4f2ef;
  --color-gray-1: #2e2c2a;
  --color-gray-2: #8a8683;
  --color-gray-3: #d6d2cd;
  --font-display: var(--font-playfair), serif;
  --font-body: var(--font-grotesk), sans-serif;
}

html {
  background: var(--color-ink);
  color: var(--color-paper);
}

body {
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* every image is monochrome, no exceptions */
.img-mono img,
img.img-mono {
  filter: grayscale(1) contrast(1.05);
}

/* all-caps micro labels used for nav / buttons / meta */
.micro-label {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.6875rem;
}

/* fluid display sizes */
.display-xl { font-family: var(--font-display); font-size: clamp(3rem, 12vw, 11rem); line-height: 0.95; }
.display-lg { font-family: var(--font-display); font-size: clamp(2.25rem, 7vw, 6rem); line-height: 1; }
.display-md { font-family: var(--font-display); font-size: clamp(1.5rem, 4vw, 3rem); line-height: 1.1; }

/* film grain overlay (Task 4 mounts the element) */
.grain {
  pointer-events: none;
  position: fixed;
  inset: -100%;
  width: 300%;
  height: 300%;
  opacity: 0.03;
  z-index: 60;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grain-shift 8s steps(10) infinite;
}
@keyframes grain-shift {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(-5%, 3%); }
  40% { transform: translate(3%, -6%); }
  60% { transform: translate(-4%, -2%); }
  80% { transform: translate(5%, 5%); }
}
@media (prefers-reduced-motion: reduce) {
  .grain { animation: none; }
}
```

- [ ] **Step 5: Root layout**

Replace `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { playfair, grotesk } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "VANTMÈRE — Quiet permanence.",
  description:
    "VANTMÈRE. Luxury streetwear built on restraint. Quiet permanence.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${grotesk.variable}`}>
      <body>
        <main id="page">{children}</main>
      </body>
    </html>
  );
}
```
Replace `app/page.tsx` with a temporary smoke page:
```tsx
export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <h1 className="display-xl uppercase tracking-widest">VANTMÈRE</h1>
    </section>
  );
}
```
Delete `app/favicon.ico` replacement not needed; keep scaffold default. Remove scaffold boilerplate from `app/page.tsx` only.

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit && npm run build`
Expected: both succeed. Then `npm run dev`, open http://localhost:3000 — black page, serif VANTMÈRE wordmark centered, Playfair renders.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js app with VANTMÈRE design tokens and fonts"
```

---

### Task 2: Typed product data layer (TDD)

**Files:**
- Create: `lib/data/types.ts`, `lib/data/products.ts`, `lib/data/lookbook.ts`
- Test: `lib/data/products.test.ts`
- Modify: `package.json` (add `"test": "vitest run"`)

**Interfaces:**
- Consumes: nothing
- Produces:
  - `type Category = "Outerwear" | "Knitwear" | "Trousers" | "Accessories"`
  - `interface Product { name: string; slug: string; price: number; category: Category; fabricStory: string; images: { flat: string; model: string; details: string[] } }`
  - `const products: Product[]` (12 items, 3 per category)
  - `getProductBySlug(slug: string): Product | undefined`
  - `getProductsByCategory(category: Category | "All"): Product[]`
  - `getRelatedProducts(slug: string, count?: number): Product[]` (same category first, never includes itself, default count 3)
  - `const lookbookImages: { src: string; caption: string }[]` (6 items)

- [ ] **Step 1: Write failing tests**

Create `lib/data/products.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import {
  products,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
} from "./products";

describe("products data", () => {
  it("has 12 products, 3 per category", () => {
    expect(products).toHaveLength(12);
    for (const c of ["Outerwear", "Knitwear", "Trousers", "Accessories"] as const) {
      expect(products.filter((p) => p.category === c)).toHaveLength(3);
    }
  });

  it("has unique slugs and complete image sets", () => {
    const slugs = new Set(products.map((p) => p.slug));
    expect(slugs.size).toBe(12);
    for (const p of products) {
      expect(p.images.flat).toMatch(/^https:\/\/images\.unsplash\.com\//);
      expect(p.images.model).toMatch(/^https:\/\/images\.unsplash\.com\//);
      expect(p.images.details.length).toBeGreaterThanOrEqual(2);
      expect(p.fabricStory.length).toBeGreaterThan(40);
      expect(p.fabricStory).not.toContain("!");
    }
  });

  it("getProductBySlug finds and misses correctly", () => {
    const first = products[0];
    expect(getProductBySlug(first.slug)?.name).toBe(first.name);
    expect(getProductBySlug("nope")).toBeUndefined();
  });

  it("getProductsByCategory filters, All returns everything", () => {
    expect(getProductsByCategory("All")).toHaveLength(12);
    expect(
      getProductsByCategory("Knitwear").every((p) => p.category === "Knitwear")
    ).toBe(true);
  });

  it("getRelatedProducts excludes self and prefers same category", () => {
    const p = products[0];
    const related = getRelatedProducts(p.slug);
    expect(related).toHaveLength(3);
    expect(related.some((r) => r.slug === p.slug)).toBe(false);
    expect(related[0].category).toBe(p.category);
  });
});
```
Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 2: Run tests, verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `./products`.

- [ ] **Step 3: Implement types + data**

Create `lib/data/types.ts`:
```ts
export type Category = "Outerwear" | "Knitwear" | "Trousers" | "Accessories";

export interface Product {
  name: string;
  slug: string;
  price: number;
  category: Category;
  fabricStory: string;
  images: { flat: string; model: string; details: string[] };
}
```

Create `lib/data/products.ts` — 12 products. Naming convention: cold, architectural, uppercase-friendly one/two-word names. Use Unsplash monochrome fashion photo URLs (pick real photo IDs at implementation time from unsplash.com searches "fashion black white", format `https://images.unsplash.com/photo-<id>?q=80&w=1200`). Full structure with all 12 (fabric stories written out — 2–3 restrained declarative sentences each, no exclamation points):

```ts
import type { Category, Product } from "./types";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

export const products: Product[] = [
  // OUTERWEAR
  {
    name: "Sculpted Overcoat",
    slug: "sculpted-overcoat",
    price: 1240,
    category: "Outerwear",
    fabricStory:
      "Double-faced Italian wool, cut long and severe. The collar stands on its own architecture. It will outlast the season it was bought in.",
    images: { flat: u("photo-A1"), model: u("photo-A2"), details: [u("photo-A3"), u("photo-A4")] },
  },
  {
    name: "Field Shell 02",
    slug: "field-shell-02",
    price: 890,
    category: "Outerwear",
    fabricStory:
      "Bonded cotton with a matte membrane. Seams are taped, hardware is blackened. Weather is a detail, not a concern.",
    images: { flat: u("photo-B1"), model: u("photo-B2"), details: [u("photo-B3"), u("photo-B4")] },
  },
  {
    name: "Horizon Parka",
    slug: "horizon-parka",
    price: 1480,
    category: "Outerwear",
    fabricStory:
      "Garment-dyed technical canvas, washed until the surface goes quiet. Down fill rated far below what a city asks of it.",
    images: { flat: u("photo-C1"), model: u("photo-C2"), details: [u("photo-C3"), u("photo-C4")] },
  },
  // KNITWEAR — Monolith Crewneck (390), Ash Mockneck (420), Undyed Cardigan (460)
  // TROUSERS — Tapered Wool Trouser (520), Wide Canvas Pant (480), Pleated Track Trouser (440)
  // ACCESSORIES — Forged Belt (240), Grain Leather Tote (680), Wool Watch Cap (150)
  // ...same shape as above for the remaining 9, each with unique slug, story, images
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category | "All"): Product[] {
  return category === "All" ? [...products] : products.filter((p) => p.category === category);
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const self = getProductBySlug(slug);
  if (!self) return [];
  const same = products.filter((p) => p.slug !== slug && p.category === self.category);
  const rest = products.filter((p) => p.slug !== slug && p.category !== self.category);
  return [...same, ...rest].slice(0, count);
}
```
(The 9 commented entries MUST be written out fully at implementation time following exactly the three complete examples — same fields, unique real Unsplash IDs, prices as listed.)

Create `lib/data/lookbook.ts`:
```ts
export const lookbookImages: { src: string; caption: string }[] = [
  { src: "https://images.unsplash.com/photo-L1?q=80&w=2000&auto=format&fit=crop", caption: "Concrete hours" },
  { src: "https://images.unsplash.com/photo-L2?q=80&w=2000&auto=format&fit=crop", caption: "Nothing decorative" },
  { src: "https://images.unsplash.com/photo-L3?q=80&w=2000&auto=format&fit=crop", caption: "Weight and fall" },
  { src: "https://images.unsplash.com/photo-L4?q=80&w=2000&auto=format&fit=crop", caption: "Season none" },
  { src: "https://images.unsplash.com/photo-L5?q=80&w=2000&auto=format&fit=crop", caption: "Studies in gray" },
  { src: "https://images.unsplash.com/photo-L6?q=80&w=2000&auto=format&fit=crop", caption: "Quiet permanence" },
];
```
(Replace `photo-L1…L6` with real Unsplash IDs at implementation time.)

- [ ] **Step 4: Run tests, verify pass**

Run: `npm test` → all 5 pass. Run `npx tsc --noEmit` → clean.

- [ ] **Step 5: Commit**

```bash
git add lib/data package.json
git commit -m "feat: typed product and lookbook data layer with tests"
```

---

### Task 3: Animation infrastructure (Lenis + GSAP glue)

**Files:**
- Create: `lib/animation/gsap.ts`, `lib/animation/LenisProvider.tsx`, `lib/animation/useSectionAnimation.ts`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: layout shell from Task 1
- Produces:
  - `lib/animation/gsap.ts` exports configured `gsap`, `ScrollTrigger`, `useGSAP` (plugins registered once)
  - `<LenisProvider>{children}</LenisProvider>` client component: instantiates Lenis, syncs ScrollTrigger, disables itself under reduced motion
  - `useSectionAnimation(ref, callback)` — runs `callback(gsap)` inside `useGSAP` scoped to `ref` AND inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. Every section in Tasks 5–9 uses this.

- [ ] **Step 1: GSAP module**

Create `lib/animation/gsap.ts`:
```ts
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
```

- [ ] **Step 2: Lenis provider**

Create `lib/animation/LenisProvider.tsx`:
```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 3: Section animation hook**

Create `lib/animation/useSectionAnimation.ts`:
```ts
"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "./gsap";

/**
 * Scoped, reduced-motion-aware section animation.
 * All tweens/ScrollTriggers created in `build` are auto-killed on unmount
 * and never created when the user prefers reduced motion.
 */
export function useSectionAnimation(
  scope: RefObject<HTMLElement | null>,
  build: (ctx: typeof gsap) => void,
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => build(gsap));
      return () => mm.revert();
    },
    { scope },
  );
}
```

- [ ] **Step 4: Wire provider into layout**

In `app/layout.tsx`, wrap children:
```tsx
import LenisProvider from "@/lib/animation/LenisProvider";
// ...
<body>
  <LenisProvider>
    <main id="page">{children}</main>
  </LenisProvider>
</body>
```

- [ ] **Step 5: Verify + commit**

Run: `npx tsc --noEmit && npm run build` → pass. Dev server: wheel scrolling on the smoke page feels inertial (add temporary `<div className="h-[300vh]" />` to page to test, then remove).

```bash
git add lib/animation app/layout.tsx
git commit -m "feat: Lenis smooth scroll and scoped GSAP section-animation infra"
```

---

### Task 4: Global UI — Nav, Footer, Cursor, Drawer, motifs, transitions

**Files:**
- Create: `components/ui/Nav.tsx`, `components/ui/Footer.tsx`, `components/ui/Cursor.tsx`, `components/ui/ComingSoonDrawer.tsx`, `components/ui/DrawnRule.tsx`, `components/ui/SectionNumeral.tsx`, `app/template.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: tokens (Task 1), `useSectionAnimation` (Task 3)
- Produces:
  - `<Nav />` fixed header: wordmark link + menu button → full-screen overlay (links: Collection, Lookbook, About, Contact), Framer Motion `AnimatePresence`, keyboard-closable (Escape), focus-trapped links
  - `<Footer />` full-section footer: giant wordmark, marquee ticker `WORLDWIDE SHIPPING — EST. 2026 — QUIET PERMANENCE — ` (CSS keyframe loop), nav links, `micro-label` styling
  - `<Cursor />` desktop-only custom cursor. Reads `data-cursor="view" | "drag"` attributes from hovered elements to show labels; hidden on touch/`(pointer: coarse)` and reduced motion
  - `<ComingSoonDrawer open onClose>` right-side drawer (Framer Motion spring), copy: "The store opens soon. Quiet permanence takes time." + email input (UI-only)
  - `<DrawnRule />` `<div>` rendering an `hr` that scaleX 0→1 via its own ScrollTrigger on entry
  - `<SectionNumeral n={1} />` renders `01` oversized serif numeral
  - `app/template.tsx` page-transition veil: black overlay + centered wordmark, wipes up on route mount, ≤600ms total

Implementation notes (complete code to be written matching these exact behaviors):

- `Nav.tsx` — `"use client"`. `useState(open)`. Header: `fixed top-0 inset-x-0 z-50 flex justify-between items-center px-6 py-5 mix-blend-difference`. Wordmark `Link href="/"` classed `font-display tracking-[0.3em] text-sm`. Button classed `micro-label` reading `MENU` / `CLOSE`. Overlay: `motion.div` `fixed inset-0 bg-ink z-40`, `initial={{ clipPath: "inset(0 0 100% 0)" }}`, `animate={{ clipPath: "inset(0 0 0% 0)" }}`, `exit={{ clipPath: "inset(0 0 100% 0)" }}`, `transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}`. Links in `display-lg`, staggered with `motion.a` variants, each closes menu on click (use `next/link`). `useEffect` adds Escape-key listener when open.
- `Footer.tsx` — server component + one client marquee child. Marquee: outer `overflow-hidden`, inner flex with the ticker text repeated 4×, CSS animation `marquee 30s linear infinite` (`@keyframes marquee { to { transform: translateX(-25%); } }` added to globals.css). Giant wordmark `display-xl`. Bottom row: `micro-label` links Collection / Lookbook / About / Contact + `© 2026 VANTMÈRE`.
- `Cursor.tsx` — `"use client"`. Renders nothing if `matchMedia("(pointer: coarse)")` or reduced motion. Two `motion.div`s (dot 8px, ring 40px) following `useMotionValue` x/y with `useSpring` (ring stiffer lag). `mouseover` listener walks `e.target.closest("[data-cursor]")`; sets label state `"VIEW"`/`"DRAG"` and scales ring to 2. Label rendered inside ring in `micro-label`. `document.documentElement.classList.add("has-custom-cursor")` and in globals.css `.has-custom-cursor * { cursor: none; }`.
- `ComingSoonDrawer.tsx` — `"use client"`. Props `{ open: boolean; onClose: () => void }`. `AnimatePresence`: backdrop `motion.div` (opacity fade, `bg-ink/60`, click = onClose) + panel `motion.aside` `fixed right-0 top-0 h-full w-full max-w-md bg-paper text-ink z-[70] p-10`, `initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }}`. Escape closes. Content: `display-md` heading "The store opens soon.", body copy "Quiet permanence takes time. Leave an address and be first through the door.", email `<input>` + `micro-label` button (button no-op → swaps to "NOTED." text state).
- `DrawnRule.tsx` — `"use client"`. `const ref = useRef<HTMLDivElement>(null)` + `useSectionAnimation(ref, (gsap) => { gsap.from(".rule", { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: ref.current, start: "top 85%" } }) })`. Renders `<div ref={ref}><div className="rule h-px bg-gray-2 w-full" /></div>`.
- `SectionNumeral.tsx` — server component: `<span className="font-display text-[clamp(4rem,10vw,9rem)] leading-none text-gray-1 select-none">{String(n).padStart(2, "0")}</span>`.
- `app/template.tsx` — `"use client"`. Returns `<>{children}<motion.div className="fixed inset-0 z-[80] bg-ink flex items-center justify-center pointer-events-none" initial={{ y: 0 }} animate={{ y: "-100%" }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}><span className="font-display tracking-[0.4em] text-paper text-lg">VANTMÈRE</span></motion.div></>`.
- `app/layout.tsx` — mount `<Nav />`, `<Cursor />`, `<div className="grain" aria-hidden />` inside body (Footer is mounted per-page as final section).

- [ ] **Step 1: Implement all seven files exactly as specified above**
- [ ] **Step 2: Add `marquee` keyframes and `.has-custom-cursor` rule to `globals.css`**
- [ ] **Step 3: Verify** — `npx tsc --noEmit && npm run build` pass; dev server: menu opens/closes with animation + Escape, veil wipe plays on navigation, cursor ring follows mouse and grows over any `data-cursor="view"` test element, grain visible.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: global nav, footer, cursor, drawer, motifs, page transitions"`

---

### Task 5: Home page — 3D hero + manifesto + featured drop + teaser

**Files:**
- Create: `components/three/HeroScene.tsx`, `components/sections/Hero.tsx`, `components/sections/Manifesto.tsx`, `components/sections/FeaturedDrop.tsx`, `components/sections/LookbookTeaser.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `useSectionAnimation`, `SectionNumeral`, `DrawnRule`, `Footer`, `products` (first 3 Outerwear items via `getProductsByCategory`)
- Produces: complete `/` route

**HeroScene.tsx** — the only R3F code in the project:
```tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  varying float vElev;
  void main() {
    vec3 p = position;
    float t = uTime * 0.4;
    float e = sin(p.x * 1.6 + t) * 0.22
            + sin(p.y * 2.4 + t * 0.8) * 0.16
            + sin((p.x + p.y) * 3.2 - t * 0.6) * 0.08;
    p.z += e;
    vElev = e;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  varying float vElev;
  void main() {
    float shade = smoothstep(-0.4, 0.5, vElev);
    vec3 col = mix(vec3(0.04), vec3(0.35), shade);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Cloth() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <mesh rotation={[-0.9, 0, 0.25]}>
      <planeGeometry args={[10, 10, 120, 120]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{ uTime: { value: 0 } }}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Cloth />
    </Canvas>
  );
}
```

**Hero.tsx** — `"use client"`. `next/dynamic` import of HeroScene with `ssr: false` and a `bg-ink` fallback div. Detect mobile/reduced-motion via `matchMedia("(max-width: 767px)")` in state; if mobile, render static poster: full-bleed Unsplash monochrome image in `.img-mono` wrapper instead of Canvas. Overlay content: centered `h1.display-xl` `VANTMÈRE` + `micro-label` tagline `QUIET PERMANENCE` + scroll hint. Subtle parallax: `useSectionAnimation` fades/translates the wordmark `y: -60` scrubbed over the hero (`scrollTrigger: { trigger, start: "top top", end: "bottom top", scrub: true }`).

**Manifesto.tsx** — `"use client"`. Pinned statement, word-by-word reveal. Copy (exact):
> We do not chase seasons. We build garments the way cities build monuments — slowly, in stone tones, meant to be walked past for decades. This is not fashion. This is quiet permanence.

Split into `<span className="word inline-block">` per word at render. Animation:
```ts
useSectionAnimation(ref, (gsap) => {
  gsap.from(".word", {
    opacity: 0.12,
    stagger: 0.06,
    ease: "none",
    scrollTrigger: { trigger: ref.current, start: "top top", end: "+=150%", pin: true, scrub: true },
  });
});
```
Include `<SectionNumeral n={1} />` and `<DrawnRule />` above the text. Words default fully visible in DOM (reduced-motion users see static text).

**FeaturedDrop.tsx** — `"use client"`. Takes `products: Product[]` prop (first 3 from data). Header row: `SectionNumeral n={2}` + `display-lg` "The First Drop" + DrawnRule. Staggered editorial layout: 3 product cards in a 12-col grid — card 1 `col-span-5`, card 2 `col-span-4 col-start-8 mt-40`, card 3 `col-span-5 col-start-3 mt-32` (single column stack on mobile). Each card: `Link` to `/collection/[slug]` with `data-cursor="view"`, `.img-mono` `next/image` (flat shot, `sizes="(max-width: 768px) 100vw, 40vw"`), name in `display-md`, price in `micro-label`. Parallax scrub per card: `gsap.to(card.querySelector("img"), { yPercent: -12, scrub-trigger per card })` inside `useSectionAnimation` with `gsap.utils.toArray(".drop-card")`.

**LookbookTeaser.tsx** — `"use client"`. Full-bleed `.img-mono` image section (`h-[120vh]` pinned): image starts `scale: 1.35` and settles to 1 scrubbed; overlaid `display-lg` caption "Lookbook — Vol. 01" + `micro-label` link `VIEW LOOKBOOK →` to `/lookbook` (no literal `→` if it renders poorly; use `VIEW LOOKBOOK` + DrawnRule). `SectionNumeral n={3}`.

**app/page.tsx**:
```tsx
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import FeaturedDrop from "@/components/sections/FeaturedDrop";
import LookbookTeaser from "@/components/sections/LookbookTeaser";
import Footer from "@/components/ui/Footer";
import { getProductsByCategory } from "@/lib/data/products";

export default function Home() {
  const featured = getProductsByCategory("Outerwear");
  return (
    <>
      <Hero />
      <Manifesto />
      <FeaturedDrop products={featured} />
      <LookbookTeaser />
      <Footer />
    </>
  );
}
```

- [ ] **Step 1: Implement HeroScene, verify canvas renders slow-moving monochrome cloth surface in isolation** (temporarily mount on smoke page)
- [ ] **Step 2: Implement Hero with dynamic import + mobile poster fallback**
- [ ] **Step 3: Implement Manifesto pinned word reveal**
- [ ] **Step 4: Implement FeaturedDrop editorial grid + parallax**
- [ ] **Step 5: Implement LookbookTeaser pinned zoom**
- [ ] **Step 6: Assemble page.tsx; verify full-page scroll flow on desktop + 375px viewport + reduced-motion (all content visible, no pins)**
- [ ] **Step 7: Gates + commit** — `npx tsc --noEmit && npm run build` pass; `git add -A && git commit -m "feat: home page with 3D hero, manifesto, featured drop, lookbook teaser"`

---

### Task 6: Collection page

**Files:**
- Create: `app/collection/page.tsx`, `components/sections/CollectionGrid.tsx`, `components/ui/ProductCard.tsx`

**Interfaces:**
- Consumes: `products`, `getProductsByCategory`, `Category`, `useSectionAnimation`, Footer
- Produces: `/collection` route; `<ProductCard product hoverSwap />` reused by FeaturedDrop refactor (optional) and related-items rail (Task 7)

**ProductCard.tsx** — `"use client"`. `Link` to `/collection/${product.slug}`, `data-cursor="view"`, `group` class. Image wrapper `relative aspect-[3/4] overflow-hidden img-mono`: two absolutely-stacked `next/image`s — flat shot `opacity-100 group-hover:opacity-0`, model shot `opacity-0 group-hover:opacity-100`, both `transition-opacity duration-500`. Below: name (`font-display text-lg`), price `micro-label text-gray-2 opacity-0 group-hover:opacity-100 transition-opacity`.

**CollectionGrid.tsx** — `"use client"`. `useState<Category | "All">("All")`. Filter bar: `micro-label` buttons ALL / OUTERWEAR / KNITWEAR / TROUSERS / ACCESSORIES, active = underlined via `border-b border-paper`. Grid: `grid grid-cols-12 gap-x-6 gap-y-24` — cards alternate spans by index pattern `[i % 4]`: `col-span-5`, `col-span-4 col-start-8 mt-24`, `col-span-4 col-start-2 mt-12`, `col-span-5 col-start-7` (mobile: all `col-span-12`). Entry reveal: cards start with `clip-path: inset(0 0 100% 0)` via GSAP `gsap.utils.toArray(".card").forEach(...)` each with own trigger `start: "top 88%"`, animating to `inset(0 0 0% 0)`, `duration: 1, ease: "power3.out"`. On filter change re-run `ScrollTrigger.refresh()`.

**app/collection/page.tsx** — server component: heading block (`display-lg` "Collection", `SectionNumeral n={2}` optional, DrawnRule), `<CollectionGrid products={products} />`, `<Footer />`. `export const metadata = { title: "Collection — VANTMÈRE" }`.

- [ ] **Step 1: Implement ProductCard**
- [ ] **Step 2: Implement CollectionGrid with filters + clip reveals**
- [ ] **Step 3: Page assembly; verify filtering (each category shows 3, All shows 12), hover swap, wipes on scroll, mobile single column**
- [ ] **Step 4: Gates + commit** — `git add -A && git commit -m "feat: collection page with editorial grid, filters, hover swaps"`

---

### Task 7: Product detail page

**Files:**
- Create: `app/collection/[slug]/page.tsx`, `components/sections/ProductDetail.tsx`, `components/ui/SizeSelector.tsx`, `components/sections/RelatedRail.tsx`

**Interfaces:**
- Consumes: `getProductBySlug`, `getRelatedProducts`, `products` (for `generateStaticParams`), `ComingSoonDrawer`, `ProductCard`
- Produces: `/collection/[slug]` static routes for all 12 products

**page.tsx**:
```tsx
import { notFound } from "next/navigation";
import { products, getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import ProductDetail from "@/components/sections/ProductDetail";
import RelatedRail from "@/components/sections/RelatedRail";
import Footer from "@/components/ui/Footer";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} — VANTMÈRE` : "VANTMÈRE" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return (
    <>
      <ProductDetail product={product} />
      <RelatedRail products={getRelatedProducts(slug)} />
      <Footer />
    </>
  );
}
```

**ProductDetail.tsx** — `"use client"`, prop `{ product: Product }`. Two-column desktop layout: left `w-3/5` — vertical stack of all images (`flat`, `model`, `...details`) each `aspect-[3/4] img-mono`; right `w-2/5` — `sticky top-24 self-start` column: category `micro-label text-gray-2`, name `display-md`, price, `fabricStory` paragraph (`text-gray-3 leading-relaxed max-w-prose`), `<SizeSelector />`, add-to-cart button. Button: `micro-label border border-paper px-10 py-4` with Framer Motion `whileTap={{ scale: 0.97 }}`; onClick sets `drawerOpen=true` → `<ComingSoonDrawer open={drawerOpen} onClose={...} />`. Mobile: single column, info below first image, no sticky.

**SizeSelector.tsx** — `"use client"`. Sizes `["XS","S","M","L","XL"]`, `useState<string | null>`, row of square buttons `w-12 h-12 micro-label border border-gray-1`, selected = `border-paper bg-paper text-ink`. Label row: `micro-label` "SIZE" + selected value.

**RelatedRail.tsx** — server component: `micro-label` heading "ALSO IN THE COLLECTION", horizontal 3-up grid of `<ProductCard />`.

- [ ] **Step 1: Implement all four files**
- [ ] **Step 2: Verify** — visit 2–3 product URLs: sticky info column tracks scroll, size selection toggles, Add to cart springs the drawer in, Escape/backdrop closes, related rail excludes current product, `/collection/unknown` 404s
- [ ] **Step 3: Gates + commit** — `git add -A && git commit -m "feat: product detail pages with sticky gallery and coming-soon drawer"`

---

### Task 8: Lookbook page (pinned horizontal scroll)

**Files:**
- Create: `app/lookbook/page.tsx`, `components/sections/LookbookScroller.tsx`

**Interfaces:**
- Consumes: `lookbookImages`, `useSectionAnimation`, Footer
- Produces: `/lookbook` route

**LookbookScroller.tsx** — `"use client"`:
```tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { lookbookImages } from "@/lib/data/lookbook";
import { useSectionAnimation } from "@/lib/animation/useSectionAnimation";

export default function LookbookScroller() {
  const ref = useRef<HTMLElement>(null);

  useSectionAnimation(ref, (gsap) => {
    const track = ref.current!.querySelector(".track") as HTMLElement;
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <section ref={ref} className="overflow-hidden" data-cursor="drag">
      {/* mobile: vertical stack; md+: horizontal track (pin only registers md+ via matchMedia in hook? No — guard with CSS + window width check) */}
      <div className="track flex max-md:flex-col">
        {lookbookImages.map((img, i) => (
          <figure key={img.src} className="relative shrink-0 w-screen h-screen max-md:h-[70vh]">
            <span className="img-mono absolute inset-0">
              <Image src={img.src} alt={img.caption} fill sizes="100vw" className="object-cover" priority={i === 0} />
            </span>
            <figcaption className="absolute bottom-10 left-6 md:left-10 display-lg mix-blend-difference">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
```
Mobile handling: wrap the `gsap.to` in `if (window.matchMedia("(min-width: 768px)").matches)` so mobile keeps the natural vertical stack (`max-md:flex-col` already handles layout).

**app/lookbook/page.tsx** — heading section (`display-lg` "Lookbook — Vol. 01", `micro-label` "SIX FRAMES. NO NOISE."), `<LookbookScroller />`, `<Footer />`, metadata title.

- [ ] **Step 1: Implement scroller + page**
- [ ] **Step 2: Verify** — desktop: section pins, images slide horizontally with scrub, captions oversized; mobile 375px: vertical stack, no pin; reduced-motion: vertical-feeling normal scroll (no pin)
- [ ] **Step 3: Gates + commit** — `git add -A && git commit -m "feat: lookbook with pinned horizontal scroll"`

---

### Task 9: About + Contact pages

**Files:**
- Create: `app/about/page.tsx`, `components/sections/ManifestoLines.tsx`, `app/contact/page.tsx`

**Interfaces:**
- Consumes: `useSectionAnimation`, `DrawnRule`, `SectionNumeral`, Footer
- Produces: `/about`, `/contact` routes

**ManifestoLines.tsx** — `"use client"`. Prop `{ lines: string[] }`. Each line a block `overflow-hidden` wrapper with inner `<span className="line block">`. Animation: `gsap.from(".line", { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.08, scrollTrigger per-line start "top 85%" })` via `gsap.utils.toArray`. Lines render in `display-md`.

**app/about/page.tsx** — statements (exact copy, server-passed to ManifestoLines):
```
Founded on the refusal of noise.
Three fabrics. Five silhouettes. No seasons.
Cut in small runs, numbered, never restocked.
Black holds. Gray endures. White answers.
We make clothes for the long walk home.
```
Layout: `SectionNumeral n={4}`, DrawnRule, `<ManifestoLines lines={...} />`, one full-bleed `.img-mono` image mid-page, closing `display-lg` line "Quiet permanence.", Footer. Metadata title "About — VANTMÈRE".

**app/contact/page.tsx** — server component + tiny client newsletter input (reuse pattern from drawer: input + button that flips to "NOTED."; extract `components/ui/NewsletterInput.tsx` if drawer duplication appears — DRY: extract it now and refactor ComingSoonDrawer to use it). Stockists list (fictional): `PARIS — 3 RUE DE BRAQUE`, `TOKYO — AOYAMA 5-4-1`, `LONDON — 12 CHILTERN ST`, `SEOUL — HANNAM-DONG 683`, each a `micro-label` row with DrawnRule separators. Email: `ATELIER@VANTMERE.COM` as `mailto:` link, socials as `micro-label` links (href `#`). Footer. Metadata title "Contact — VANTMÈRE".

- [ ] **Step 1: Extract `NewsletterInput` (input + NOTED. state), refactor drawer to use it**
- [ ] **Step 2: Implement ManifestoLines + about page**
- [ ] **Step 3: Implement contact page**
- [ ] **Step 4: Verify both pages desktop/mobile/reduced-motion; gates; commit** — `git add -A && git commit -m "feat: about and contact pages"`

---

### Task 10: Polish, metadata, performance pass

**Files:**
- Modify: `app/layout.tsx` (OG metadata), any files flagged by the audit below

**Interfaces:**
- Consumes: everything
- Produces: shippable site meeting spec budgets

- [ ] **Step 1: Metadata/OG** — extend root `metadata`: `openGraph: { title, description, siteName: "VANTMÈRE", type: "website" }`, `metadataBase: new URL("https://vantmere.example.com")`. Per-page titles already set in Tasks 6–9; add `description` per page.
- [ ] **Step 2: Copy audit** — `grep -rn "!" app components lib --include="*.tsx" | grep -v "!important\|!=\|!!"` → fix any exclamation points in user-visible copy. Verify wordmark always renders as `VANTMÈRE`.
- [ ] **Step 3: Reduced-motion audit** — DevTools emulate `prefers-reduced-motion: reduce`; walk all 6 routes; every section's content must be visible and static; Lenis inactive.
- [ ] **Step 4: Mobile audit** — 375px viewport walk of all routes: hero shows poster (no canvas mounted — check DevTools for absence of `<canvas>`), lookbook vertical, no horizontal overflow (`document.documentElement.scrollWidth === window.innerWidth`).
- [ ] **Step 5: Lighthouse** — `npm run build && npm run start`, run Lighthouse (Chrome DevTools) on `/`, `/collection`, one product page. Target ≥90 desktop / ≥80 mobile performance. If under: check image `sizes`, lazy-load below-fold sections with `next/dynamic`, reduce hero `dpr` to `[1, 1.25]`, confirm three.js only in home bundle (`npm run build` route sizes — `/collection` first-load JS must not include three).
- [ ] **Step 6: Final gates + commit** — `npm test && npx tsc --noEmit && npm run build` all pass. `git add -A && git commit -m "chore: metadata, motion/mobile audits, performance pass"`

---

## Self-Review Notes

- **Spec coverage:** Home (Task 5), Collection (6), Product (7), Lookbook (8), About/Contact (9), identity/tokens (1), data (2), animation architecture (3), global UI + transitions (4), perf/a11y budgets (10). Marquee ticker in Footer (4). Custom cursor (4). Grain (1/4). ✔
- **Type consistency:** `Product`/`Category` defined once in Task 2 and imported everywhere; `useSectionAnimation(ref, build)` signature identical across Tasks 4–9; drawer prop shape `{ open, onClose }` used consistently. ✔
- **Known intentional deviations:** none.
