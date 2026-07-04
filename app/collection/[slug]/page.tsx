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
    alternates: { canonical: `/collection/${product.slug}` },
    openGraph: {
      title: `${product.name} — VANTMÈRE`,
      description: product.fabricStory.split(". ")[0] + ".",
      images: [product.images.model],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.fabricStory,
    image: [product.images.model, product.images.flat, ...product.images.details],
    category: product.category,
    brand: { "@type": "Brand", name: "VANTMÈRE" },
    offers: {
      "@type": "Offer",
      url: `https://vantmere.vercel.app/collection/${product.slug}`,
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\u003c"),
        }}
      />
      <ProductDetail product={product} />
      <RelatedRail products={getRelatedProducts(slug)} />
      <Footer />
    </>
  );
}
