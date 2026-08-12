"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NewsletterInput from "./NewsletterInput";

interface ComingSoonDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function ComingSoonDrawer({
  open,
  onClose,
}: ComingSoonDrawerProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[var(--z-drawer-backdrop)] bg-ink/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 h-full w-full max-w-md bg-paper text-ink z-[var(--z-drawer-panel)] p-10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
          >
            <h2 className="display-md">The store opens soon.</h2>
            <p className="mt-4 font-body">
              Quiet permanence takes time. Leave an address and be first
              through the door.
            </p>
            <NewsletterInput />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
