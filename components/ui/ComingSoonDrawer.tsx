"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ComingSoonDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function ComingSoonDrawer({
  open,
  onClose,
}: ComingSoonDrawerProps) {
  const [submitted, setSubmitted] = useState(false);

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
            className="fixed inset-0 z-[60] bg-ink/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 h-full w-full max-w-md bg-paper text-ink z-[70] p-10"
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
            <form
              className="mt-8 flex flex-col items-start gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full border-b border-gray-2 bg-transparent py-2 font-body text-ink placeholder:text-gray-2 focus:outline-none"
              />
              <button type="submit" className="micro-label">
                {submitted ? "NOTED." : "NOTIFY ME"}
              </button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
