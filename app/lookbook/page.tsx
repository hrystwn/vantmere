import type { Metadata } from "next";
import Footer from "@/components/ui/Footer";
import LookbookScroller from "@/components/sections/LookbookScroller";

export const metadata: Metadata = {
  title: "Lookbook — VANTMÈRE",
  description: "Six frames from Volume 01. No noise, no styling notes.",
  alternates: { canonical: "/lookbook" },
};

export default function LookbookPage() {
  return (
    <>
      <section className="bg-ink px-6 py-32 text-paper md:py-40">
        <h1 className="display-lg">Lookbook — Vol. 01</h1>
        <div className="mt-4">
          <p className="micro-label">SIX FRAMES. NO NOISE.</p>
        </div>
      </section>
      <LookbookScroller />
      <Footer />
    </>
  );
}
