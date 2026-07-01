# VANTMÈRE — Luxury Streetwear Brand Site — Design Spec

Date: 2026-07-02
Status: Approved pending user review

## 1. Purpose & Scope

A premium, interactive, award-worthy (Awwwards Site-of-the-Day caliber) clothing brand website. **Marketing/lookbook site** — no real cart, checkout, payments, or backend. All shopping UI is presentational; "Add to cart" opens a "coming soon" drawer.

Success criteria:
- Feels like a luxury streetwear label (Fear of God / Represent / ALD energy, fully original)
- Fluid, cinematic scroll experience; distinctive motion identity
- Lighthouse performance ≥90 desktop, ≥80 mobile
- Fully responsive; graceful degradation on mobile and `prefers-reduced-motion`

## 2. Tech Stack

- Next.js 15 (App Router), TypeScript
- Tailwind CSS with custom design tokens
- GSAP + ScrollTrigger — section-scoped scroll animations
- Framer Motion — micro-interactions + page transitions
- Lenis — smooth scrolling (root-level, exposed via context)
- React Three Fiber — homepage hero only, lazy-loaded
- `next/font`, `next/image` throughout
- Static/ISR-friendly; no server runtime dependencies

## 3. Animation Architecture (Approach B — chosen)

- Each page section is an isolated component owning its own GSAP `ScrollTrigger` context (created on mount, killed on unmount). Sections are independently buildable, testable, reorderable.
- Framer Motion handles hover states, cursor, buttons, drawer, and route transitions.
- Lenis initialized once in root layout; scroll context provider in `lib/animation/`.
- Three.js hero is self-contained with its own render loop; reads scroll progress only for parallax nudge.
- All animations use GPU-friendly properties (transform/opacity); `will-change` used surgically.

## 4. Project Structure

```
app/            → /, /collection, /collection/[slug], /lookbook, /about, /contact
components/
  sections/     → one component per page-section (owns its ScrollTrigger)
  ui/           → nav, footer, buttons, custom cursor, product card, drawer
  three/        → hero 3D scene (lazy-loaded, code-split)
lib/
  data/         → typed mock products & collections (CMS-swappable)
  animation/    → GSAP plugin registration, Lenis provider, shared helpers
```

## 5. Brand Identity

- **Name**: VANTMÈRE (working name — trademark search is the user's responsibility before real-world use). Wordmark: display serif, wide letter-spacing, always uppercase.
- **Voice**: restrained, declarative, slightly cold. Tagline: "Quiet permanence." No exclamation points anywhere.
- **Palette**: black `#0A0A0A`, warm off-white `#F4F2EF`, 3 grayscale steps between. **No color anywhere**; imagery desaturated via CSS filter to conform.
- **Type**: display = Playfair Display (high-contrast editorial serif, OFL-licensed); body/UI = Space Grotesk (tight grotesk, OFL-licensed); all-caps micro-labels with wide tracking for nav/buttons/meta. Fluid type scale via `clamp()`.
- **Signature motifs**:
  - Oversized serif section numerals (01 — 04)
  - Thin horizontal rules that draw themselves in on section entry
  - Custom cursor (desktop only): dot expanding to circle with "VIEW"/"DRAG" labels
  - ~3% opacity film grain overlay site-wide

## 6. Pages

### Home
1. Full-viewport 3D hero — monochrome cloth-like surface distorting slowly, wordmark overlaid
2. Manifesto — pinned text, word-by-word line reveals
3. Featured drop — 3 products, staggered editorial layout, scrub-parallax imagery
4. Lookbook teaser — full-bleed image, pinned zoom-out
5. Footer as full section — huge wordmark, marquee ticker ("WORLDWIDE SHIPPING — EST. 2026 — QUIET PERMANENCE")

### Collection (`/collection`)
- Filter by category: Outerwear / Knitwear / Trousers / Accessories
- Asymmetric editorial grid (alternating tall/wide cells, generous gutters)
- Hover: image swaps to on-model shot, price fades in
- Scroll entry: clip-path wipe reveals

### Product detail (`/collection/[slug]`)
- Left: sticky image stack (3–4 shots scroll through)
- Right: name, price, 2–3 sentence editorial fabric story, size selector (UI-only), "Add to cart" → animated → "coming soon" drawer
- Related items rail at bottom

### Lookbook (`/lookbook`)
- Pinned horizontal-scroll sequence (ScrollTrigger scrub) of full-bleed campaign images with oversized captions

### About (`/about`)
- Type-driven manifesto page, line-by-line statement reveals, 1–2 images

### Contact (`/contact`)
- Stockists list (fictional cities), email link, socials, newsletter input (UI-only)

### Global
- Page transitions: black veil wipe with centered wordmark flash, ≤600ms, non-blocking
- Nav: minimal fixed header, wordmark + hamburger → full-screen menu overlay

## 7. Responsive & Accessibility Degradation

- Mobile: 3D hero → static poster frame with CSS parallax; horizontal lookbook → vertical stack; custom cursor disabled
- `prefers-reduced-motion`: pinned/scrubbed sections degrade to simple fade-reveals; Lenis disabled
- Semantic HTML, keyboard-navigable menu/drawer, alt text on all imagery

## 8. Data & Imagery

- ~12 products across 4 categories in typed `lib/data/products.ts`: name, slug, price, category, fabric copy, image set. Swappable for a CMS/API without touching components.
- Placeholder imagery: Unsplash fashion/monochrome photography, all via `next/image` with correct `sizes`. Organized so real photography drops in by replacing files/URLs only.

## 9. Performance Budget

- 3D scene lazy-loaded and code-split; skipped entirely on mobile
- Lighthouse targets: ≥90 desktop, ≥80 mobile
- Zero layout shift from fonts (`next/font`)
- Animations restricted to transform/opacity

## 10. Testing

- Type-checked build (`tsc --noEmit`) and production build as the baseline gate
- Manual verification pass per page: desktop, mobile viewport, reduced-motion
- Lighthouse run against production build to verify budget

## 11. Out of Scope

- Real e-commerce (cart persistence, checkout, payments, inventory)
- CMS integration, auth, user accounts
- Real product photography
- SEO content strategy beyond sensible metadata/OG tags
