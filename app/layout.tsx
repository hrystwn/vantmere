import type { Metadata } from "next";
import { playfair, grotesk } from "@/lib/fonts";
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
        <main id="page">{children}</main>
      </body>
    </html>
  );
}
