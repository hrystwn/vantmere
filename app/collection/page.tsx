import type { Metadata } from "next";
import SectionNumeral from "@/components/ui/SectionNumeral";
import DrawnRule from "@/components/ui/DrawnRule";
import Footer from "@/components/ui/Footer";
import CollectionGrid from "@/components/sections/CollectionGrid";
import { products } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Collection — VANTMÈRE",
};

export default function CollectionPage() {
  return (
    <>
      <section className="bg-ink px-6 py-32 text-paper md:py-40">
        <div className="flex items-center gap-6">
          <SectionNumeral n={2} />
          <h1 className="display-lg">Collection</h1>
        </div>
        <div className="mt-10">
          <DrawnRule />
        </div>

        <div className="mt-20">
          <CollectionGrid products={products} />
        </div>
      </section>
      <Footer />
    </>
  );
}
