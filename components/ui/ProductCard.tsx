"use client";

import Link from "next/link";
import MonoImage from "@/components/ui/MonoImage";
import { formatPrice } from "@/lib/data/format";
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
      <MonoImage
        src={product.images.flat}
        alt={product.name}
        sizes="(max-width: 768px) 100vw, 33vw"
        hoverSrc={hoverSwap ? product.images.model : undefined}
        hoverAlt={`${product.name}, worn`}
      />
      <h2 className="font-display text-lg mt-6">{product.name}</h2>
      <p className="micro-label mt-2 text-gray-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        {formatPrice(product.price)}
      </p>
    </Link>
  );
}
