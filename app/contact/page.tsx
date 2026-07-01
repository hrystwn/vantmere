import type { Metadata } from "next";
import Link from "next/link";
import SectionNumeral from "@/components/ui/SectionNumeral";
import DrawnRule from "@/components/ui/DrawnRule";
import Footer from "@/components/ui/Footer";
import NewsletterInput from "@/components/ui/NewsletterInput";

export const metadata: Metadata = {
  title: "Contact — VANTMÈRE",
  description:
    "Stockists, correspondence, and the address for everything that cannot wait for a season.",
};

const STOCKISTS = [
  "PARIS — 3 RUE DE BRAQUE",
  "TOKYO — AOYAMA 5-4-1",
  "LONDON — 12 CHILTERN ST",
  "SEOUL — HANNAM-DONG 683",
];

const SOCIALS = [
  { label: "INSTAGRAM", href: "#" },
  { label: "WEIBO", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink px-6 py-32 text-paper md:py-40">
        <div className="flex items-center gap-6">
          <SectionNumeral n={5} />
          <h1 className="display-lg">Contact</h1>
        </div>
        <div className="mt-10">
          <DrawnRule />
        </div>

        <div className="mt-20 max-w-2xl">
          <p className="micro-label text-gray-2">STOCKISTS</p>
          <div className="mt-6">
            <DrawnRule />
            {STOCKISTS.map((row) => (
              <div key={row}>
                <p className="micro-label py-5">{row}</p>
                <DrawnRule />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <p className="micro-label text-gray-2">CORRESPONDENCE</p>
            <a
              href="mailto:ATELIER@VANTMERE.COM"
              className="display-md mt-4 block"
            >
              ATELIER@VANTMERE.COM
            </a>
            <div className="mt-6 flex gap-6">
              {SOCIALS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="micro-label"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="micro-label text-gray-2">NEWSLETTER</p>
            <NewsletterInput />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
