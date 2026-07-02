"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSectionAnimation } from "@/lib/animation/useSectionAnimation";
import SectionNumeral from "@/components/ui/SectionNumeral";
import DrawnRule from "@/components/ui/DrawnRule";
import type { Product } from "@/lib/data/types";

// Staggered editorial placement for the three cards; mobile falls back to a single stacked column.
const CARD_LAYOUT = [
  "md:col-span-5",
  "md:col-span-4 md:col-start-8 md:mt-40",
  "md:col-span-5 md:col-start-3 md:mt-32",
];

export default function FeaturedDrop({ products }: { products: Product[] }) {
  const ref = useRef<HTMLElement>(null);

  useSectionAnimation(ref, (gsap) => {
    gsap.utils.toArray<HTMLElement>(".drop-card").forEach((card) => {
      const img = card.querySelector("img");
      if (!img) return;
      gsap.to(img, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  });

  return (
    <section
      ref={ref}
      className="relative bg-ink px-6 py-32 text-paper md:py-48"
    >
      <div className="flex items-center gap-6">
        <SectionNumeral n={2} />
        <h2 className="display-lg">The First Drop</h2>
      </div>
      <div className="mt-10">
        <DrawnRule />
      </div>

      <div className="mt-20 grid grid-cols-1 gap-y-24 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
        {products.map((product, i) => (
          <Link
            key={product.slug}
            href={`/collection/${product.slug}`}
            data-cursor="view"
            className={`drop-card group block ${CARD_LAYOUT[i % CARD_LAYOUT.length]}`}
          >
            <div className="img-mono relative aspect-[3/4] overflow-hidden">
              <Image
                src={product.images.flat}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="scale-125 object-cover"
              />
            </div>
            <h3 className="display-md mt-6">{product.name}</h3>
            <p className="micro-label mt-2 text-gray-2">${product.price.toLocaleString("en-US")}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
