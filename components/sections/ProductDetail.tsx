"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SizeSelector from "@/components/ui/SizeSelector";
import ComingSoonDrawer from "@/components/ui/ComingSoonDrawer";
import type { Product } from "@/lib/data/types";

export default function ProductDetail({ product }: { product: Product }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const images = [
    product.images.flat,
    product.images.model,
    ...product.images.details,
  ].map((src, i) => ({
    src,
    alt: `${product.name} — view ${i + 1}`,
  }));

  const [firstImage, ...restImages] = images;

  return (
    <section className="bg-ink px-6 py-32 text-paper md:py-40">
      {/* Explicit rows (one per image) so md:row-span-full on the info column can resolve against them */}
      <div
        className="grid grid-cols-1 gap-y-16 md:grid-cols-[3fr_2fr] md:gap-x-6 md:gap-y-0"
        style={{ gridTemplateRows: `repeat(${images.length}, auto)` }}
      >
        {/* First image — mobile: leads the page; desktop: top of the image stack */}
        <div className="img-mono relative aspect-[3/4] overflow-hidden md:col-start-1">
          <Image
            src={firstImage.src}
            alt={firstImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        {/* Info column — mobile: follows the first image; desktop: sticky right rail */}
        <div className="md:col-start-2 md:row-start-1 md:row-span-full md:sticky md:top-24 md:self-start">
          <p className="micro-label text-gray-2">{product.category}</p>
          <h1 className="display-md mt-4">{product.name}</h1>
          <p className="micro-label mt-4 text-gray-2">${product.price}</p>
          <p className="mt-8 max-w-prose leading-relaxed text-gray-3">
            {product.fabricStory}
          </p>

          <div className="mt-10">
            <SizeSelector />
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setDrawerOpen(true)}
            className="micro-label mt-10 border border-paper px-10 py-4"
          >
            ADD TO CART
          </motion.button>

          <ComingSoonDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
        </div>

        {/* Remaining images continue the stack below the first, on both breakpoints */}
        {restImages.map((image) => (
          <div
            key={image.alt}
            className="img-mono relative aspect-[3/4] overflow-hidden md:col-start-1"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
