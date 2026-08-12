"use client";

import { useRef } from "react";
import { lookbookImages } from "@/lib/data/lookbook";
import { useSectionAnimation } from "@/lib/animation/useSectionAnimation";
import MonoImage from "@/components/ui/MonoImage";

export default function LookbookScroller() {
  const ref = useRef<HTMLElement>(null);

  useSectionAnimation(ref, (gsap) => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      const track = ref.current!.querySelector(".track") as HTMLElement;
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }
  });

  return (
    <section ref={ref} className="overflow-hidden" data-cursor="drag">
      {/* Mobile vertical stack; desktop horizontal scroll pin configured in hook */}
      <div className="track flex max-md:flex-col motion-reduce:flex-col">
        {lookbookImages.map((img, i) => (
          <figure key={img.src} className="relative shrink-0 w-screen h-screen max-md:h-[70vh] motion-reduce:h-[70vh]">
            <MonoImage
              src={img.src}
              alt={img.caption}
              sizes="100vw"
              wrapperClassName="absolute inset-0"
              priority={i === 0}
            />
            <figcaption className="absolute bottom-10 left-6 md:left-10 display-lg mix-blend-difference">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
