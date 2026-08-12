"use client";

import { useEffect, useRef, useState } from "react";
import { useSectionAnimation } from "@/lib/animation/useSectionAnimation";
import { ScrollTrigger } from "@/lib/animation/gsap";
import { editorialSpan } from "@/lib/layout";
import ProductCard from "@/components/ui/ProductCard";
import type { Category, Product } from "@/lib/data/types";

const FILTERS: (Category | "All")[] = [
  "All",
  "Outerwear",
  "Knitwear",
  "Trousers",
  "Accessories",
];

// Staggered editorial placement; mobile falls back to a single stacked column.
const SPAN_PATTERN = [
  "col-span-12 md:col-span-5",
  "col-span-12 md:col-span-4 md:col-start-8 md:mt-24",
  "col-span-12 md:col-span-4 md:col-start-2 md:mt-12",
  "col-span-12 md:col-span-5 md:col-start-7",
];

/**
 * Re-keyed by the parent on every filter change so entry-reveal ScrollTriggers
 * are always created fresh against the current (filtered) layout — this
 * guarantees no card is ever left permanently clip-hidden after filtering.
 */
function Grid({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useSectionAnimation(ref, (gsap) => {
    gsap.utils.toArray<HTMLElement>(".card").forEach((card) => {
      gsap.fromTo(
        card,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        },
      );
    });
  });

  return (
    <div ref={ref} className="grid grid-cols-12 gap-x-6 gap-y-24">
      {products.map((product, i) => (
        <ProductCard
          key={product.slug}
          product={product}
          className={editorialSpan(SPAN_PATTERN, i)}
        />
      ))}
    </div>
  );
}

export default function CollectionGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Category | "All">("All");

  const filtered =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-6 border-b border-gray-1 pb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`micro-label border-b pb-1 transition-colors ${
              filter === f
                ? "border-paper text-paper"
                : "border-transparent text-gray-2 hover:text-paper"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-16">
        <Grid key={filter} products={filtered} />
      </div>
    </div>
  );
}
