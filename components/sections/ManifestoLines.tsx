"use client";

import { useRef } from "react";
import { useSectionAnimation } from "@/lib/animation/useSectionAnimation";

export default function ManifestoLines({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useSectionAnimation(ref, (gsap) => {
    gsap.utils.toArray<HTMLElement>(".line").forEach((line, i) => {
      gsap.from(line, {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        delay: i * 0.08,
        scrollTrigger: {
          trigger: line.parentElement,
          start: "top 85%",
        },
      });
    });
  });

  return (
    <div ref={ref}>
      {lines.map((line) => (
        <div key={line} className="overflow-hidden">
          <span className="line display-md block">{line}</span>
        </div>
      ))}
    </div>
  );
}
