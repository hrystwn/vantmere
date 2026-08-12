"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";

const MotionLink = motion.create(Link);

const EASE = [0.76, 0, 0.24, 1] as const;

const LINKS = [
  { href: "/collection", label: "Collection" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const linkVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button",
        );
        if (!focusable || focusable.length === 0) return;

        const list = Array.from(focusable);
        const first = list[0];
        const last = list[list.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[var(--z-nav-header)] flex justify-between items-center px-6 py-5 mix-blend-difference">
        <Link href="/" className="font-display tracking-[0.3em] text-sm">
          VANTMÈRE
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="micro-label"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 bg-ink z-[var(--z-nav-overlay)]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.nav
              className="flex h-full flex-col items-start justify-center gap-4 px-6"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {LINKS.map((link, i) => (
                <MotionLink
                  key={link.href}
                  href={link.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  variants={linkVariants}
                  className="display-lg text-paper"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </MotionLink>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
