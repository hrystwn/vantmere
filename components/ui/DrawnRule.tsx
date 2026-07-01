"use client";

import { useRef } from "react";
import { useSectionAnimation } from "@/lib/animation/useSectionAnimation";

export default function DrawnRule() {
  const ref = useRef<HTMLDivElement>(null);

  useSectionAnimation(ref, (gsap) => {
    gsap.from(".rule", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
  });

  return (
    <div ref={ref}>
      <div className="rule h-px bg-gray-2 w-full" />
    </div>
  );
}
