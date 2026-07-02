"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data/types";

export default function ProductCard({
  product,
  hoverSwap = true,
  className = "",
}: {
  product: Product;
  hoverSwap?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/collection/${product.slug}`}
      data-cursor="view"
      className={`card group block ${className}`}
    >
      <div className="img-mono relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.images.flat}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition-opacity duration-500 ${
            hoverSwap ? "opacity-100 group-hover:opacity-0" : ""
          }`}
        />
        {hoverSwap && (
          <Image
            src={product.images.model}
            alt={`${product.name}, worn`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>
      <h2 className="font-display text-lg mt-6">{product.name}</h2>
      <p className="micro-label mt-2 text-gray-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        ${product.price.toLocaleString("en-US")}
      </p>
    </Link>
  );
}
