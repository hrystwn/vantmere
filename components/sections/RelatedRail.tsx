import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/lib/data/types";

export default function RelatedRail({ products }: { products: Product[] }) {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:py-32">
      <h2 className="micro-label text-gray-2">ALSO IN THE COLLECTION</h2>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
