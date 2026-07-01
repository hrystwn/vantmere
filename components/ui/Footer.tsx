import Link from "next/link";

const TICKER_TEXT = "WORLDWIDE SHIPPING — EST. 2026 — QUIET PERMANENCE — ";

const LINKS = [
  { href: "/collection", label: "Collection" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative flex min-h-screen flex-col justify-between bg-ink px-6 py-10 text-paper">
      <div className="overflow-hidden">
        <div
          className="micro-label flex w-max whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="pr-4">
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>

      <h2 className="display-xl text-center uppercase tracking-widest">
        VANTMÈRE
      </h2>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-1 pt-6 text-center sm:flex-row">
        <nav className="flex gap-6">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="micro-label">
              {link.label}
            </Link>
          ))}
        </nav>
        <span className="micro-label">© 2026 VANTMÈRE</span>
      </div>
    </footer>
  );
}
