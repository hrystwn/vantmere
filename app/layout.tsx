import type { Metadata } from "next";
import { playfair, grotesk } from "@/lib/fonts";
import LenisProvider from "@/lib/animation/LenisProvider";
import Nav from "@/components/ui/Nav";
import Cursor from "@/components/ui/Cursor";
import "./globals.css";

const OG_IMAGE =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop";

export const metadata: Metadata = {
  metadataBase: new URL("https://vantmere.vercel.app"),
  title: "VANTMÈRE — Quiet permanence.",
  description:
    "VANTMÈRE. Luxury streetwear built on restraint. Quiet permanence.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "VANTMÈRE — Quiet permanence.",
    description:
      "VANTMÈRE. Luxury streetwear built on restraint. Quiet permanence.",
    siteName: "VANTMÈRE",
    type: "website",
    images: [OG_IMAGE],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vantmere.vercel.app/#org",
      name: "VANTMÈRE",
      url: "https://vantmere.vercel.app",
      logo: OG_IMAGE,
    },
    {
      "@type": "WebSite",
      name: "VANTMÈRE",
      url: "https://vantmere.vercel.app",
      publisher: { "@id": "https://vantmere.vercel.app/#org" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${grotesk.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgJsonLd).replace(/</g, "\u003c"),
          }}
        />
        <Nav />
        <LenisProvider>
          <main id="page">{children}</main>
        </LenisProvider>
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
