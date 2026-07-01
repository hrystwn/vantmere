"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSectionAnimation } from "@/lib/animation/useSectionAnimation";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-ink" />,
});

// Verified Unsplash ID from lib/data/products (Sculpted Overcoat, model shot), w=2000 for full-bleed poster.
const HERO_POSTER =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  // undefined until the effect resolves matchMedia, avoiding a hydration mismatch.
  const [posterMode, setPosterMode] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPosterMode(mobile.matches || reduced.matches);
    update();
    mobile.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useSectionAnimation(ref, (gsap) => {
    gsap.to(".wordmark", {
      y: -60,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-ink text-paper"
    >
      <div className="absolute inset-0">
        {posterMode === undefined ? (
          <div className="absolute inset-0 bg-ink" />
        ) : posterMode ? (
          <div className="img-mono absolute inset-0">
            <Image
              src={HERO_POSTER}
              alt="VANTMÈRE — quiet permanence"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <HeroScene />
        )}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="wordmark display-xl uppercase tracking-widest">
          VANTMÈRE
        </h1>
        <p className="micro-label">QUIET PERMANENCE</p>
      </div>

      <div className="scroll-hint micro-label absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        SCROLL
      </div>
    </section>
  );
}
