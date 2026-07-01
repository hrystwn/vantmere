import type { Metadata } from "next";
import Image from "next/image";
import SectionNumeral from "@/components/ui/SectionNumeral";
import DrawnRule from "@/components/ui/DrawnRule";
import Footer from "@/components/ui/Footer";
import ManifestoLines from "@/components/sections/ManifestoLines";

export const metadata: Metadata = {
  title: "About — VANTMÈRE",
  description:
    "The house behind the garments — three fabrics, five silhouettes, no seasons.",
};

const LINES = [
  "Founded on the refusal of noise.",
  "Three fabrics. Five silhouettes. No seasons.",
  "Cut in small runs, numbered, never restocked.",
  "Black holds. Gray endures. White answers.",
  "We make clothes for the long walk home.",
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink px-6 py-32 text-paper md:py-40">
        <div className="flex items-center gap-6">
          <SectionNumeral n={4} />
          <h1 className="display-lg">About</h1>
        </div>
        <div className="mt-10">
          <DrawnRule />
        </div>

        <div className="mt-20 max-w-4xl">
          <ManifestoLines lines={LINES} />
        </div>
      </section>

      <div className="img-mono relative h-[70vh] w-full md:h-screen">
        <Image
          src="https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=2000&auto=format&fit=crop"
          alt="A folded wool garment in ash gray, photographed under flat studio light."
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <section className="flex min-h-[60vh] items-center bg-ink px-6 py-32 text-paper md:py-40">
        <p className="display-lg max-w-4xl">Quiet permanence.</p>
      </section>

      <Footer />
    </>
  );
}
