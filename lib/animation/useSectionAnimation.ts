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
