"use client";

import { useRef } from "react";
import Link from "next/link";
import { useSectionAnimation } from "@/lib/animation/useSectionAnimation";
import SectionNumeral from "@/components/ui/SectionNumeral";
import DrawnRule from "@/components/ui/DrawnRule";
import MonoImage from "@/components/ui/MonoImage";
import { lookbookImages } from "@/lib/data/lookbook";

const cover = lookbookImages[0];

export default function LookbookTeaser() {
  const ref = useRef<HTMLElement>(null);

  useSectionAnimation(ref, (gsap) => {
    const img = ref.current?.querySelector(".teaser-img");
    if (!img) return;
    gsap.fromTo(
      img,
      { scale: 1.35 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: true,
        },
      },
    );
  });

  return (
    <section
      ref={ref}
      className="relative h-[120vh] overflow-hidden bg-ink text-paper"
    >
      <MonoImage
        src={cover.src}
        alt={cover.caption}
        sizes="100vw"
        wrapperClassName="absolute inset-0"
        imageClassName="teaser-img"
      />

      <div className="absolute inset-0 flex flex-col items-start justify-end gap-6 p-6 md:p-12">
        <SectionNumeral n={3} />
        <h2 className="display-lg">Lookbook — Vol. 01</h2>
        <div>
          <Link href="/lookbook" data-cursor="view" className="micro-label">
            VIEW LOOKBOOK
          </Link>
          <div className="mt-3 w-40">
            <DrawnRule />
          </div>
        </div>
      </div>
    </section>
  );
}
