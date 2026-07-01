import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import FeaturedDrop from "@/components/sections/FeaturedDrop";
import LookbookTeaser from "@/components/sections/LookbookTeaser";
import Footer from "@/components/ui/Footer";
import { getProductsByCategory } from "@/lib/data/products";

export default function Home() {
  const featured = getProductsByCategory("Outerwear");
  return (
    <>
      <Hero />
      <Manifesto />
      <FeaturedDrop products={featured} />
      <LookbookTeaser />
      <Footer />
    </>
  );
}
