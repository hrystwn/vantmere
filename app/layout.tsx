import type { Metadata } from "next";
import { playfair, grotesk } from "@/lib/fonts";
import LenisProvider from "@/lib/animation/LenisProvider";
import Nav from "@/components/ui/Nav";
import Cursor from "@/components/ui/Cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "VANTMÈRE — Quiet permanence.",
  description:
    "VANTMÈRE. Luxury streetwear built on restraint. Quiet permanence.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${grotesk.variable}`}>
      <body>
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
