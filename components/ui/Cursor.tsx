"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribeToMediaQuery(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    subscribeToMediaQuery(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export default function Cursor() {
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = !coarsePointer && !reducedMotion;

  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 200, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 200, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    function onMouseMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    function onMouseOver(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest?.("[data-cursor]");
      if (!target) return;
      const cursorType = target.getAttribute("data-cursor");
      setLabel(cursorType === "drag" ? "DRAG" : "VIEW");
      setActive(true);
    }

    function onMouseOut(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest?.("[data-cursor]");
      if (!target) return;
      setLabel(null);
      setActive(false);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] h-2 w-2 rounded-full bg-paper"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] flex h-10 w-10 items-center justify-center rounded-full border border-paper"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: active ? 2 : 1 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      >
        {label && <span className="micro-label text-paper">{label}</span>}
      </motion.div>
    </>
  );
}
