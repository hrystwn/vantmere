"use client";

import { motion } from "framer-motion";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <motion.div
        className="fixed inset-0 z-[80] bg-ink flex items-center justify-center pointer-events-none"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="font-display tracking-[0.4em] text-paper text-lg">
          VANTMÈRE
        </span>
      </motion.div>
    </>
  );
}
