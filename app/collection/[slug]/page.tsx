import { notFound } from "next/navigation";
import { products, getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import ProductDetail from "@/components/sections/ProductDetail";
import RelatedRail from "@/components/sections/RelatedRail";
import Footer from "@/components/ui/Footer";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "VANTMÈRE" };
  return {
    title: `${product.name} — VANTMÈRE`,
    description: product.fabricStory.split(". ")[0] + ".",
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return (
    <>
      <ProductDetail product={product} />
      <RelatedRail products={getRelatedProducts(slug)} />
      <Footer />
    </>
  );
}
