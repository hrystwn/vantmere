"use client";

import { Fragment, useRef } from "react";
import { useSectionAnimation } from "@/lib/animation/useSectionAnimation";
import SectionNumeral from "@/components/ui/SectionNumeral";
import DrawnRule from "@/components/ui/DrawnRule";

const COPY =
  "We do not chase seasons. We build garments the way cities build monuments — slowly, in stone tones, meant to be walked past for decades. This is not fashion. This is quiet permanence.";

const WORDS = COPY.split(" ");

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useSectionAnimation(ref, (gsap) => {
    gsap.from(".word", {
      opacity: 0.12,
      stagger: 0.06,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
      },
    });
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center bg-ink px-6 py-32 text-paper"
    >
      <div className="mb-16">
        <SectionNumeral n={1} />
        <div className="mt-6">
          <DrawnRule />
        </div>
      </div>

      <p className="display-md max-w-5xl">
        {WORDS.map((word, i) => (
          <Fragment key={i}>
            <span className="word inline-block">{word}</span>
            {i < WORDS.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </p>
    </section>
  );
}
