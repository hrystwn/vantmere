"use client";

import Image from "next/image";

interface MonoImageProps {
  src: string;
  alt: string;
  sizes: string;
  /** Full override for the wrapper's position/size classes (the img-mono class is always applied). */
  wrapperClassName?: string;
  /** Extra classes appended to the primary <Image>, e.g. for GSAP targeting or scale transforms. */
  imageClassName?: string;
  priority?: boolean;
  /** When set, renders a second image absolutely positioned on top, cross-fading in on group-hover. */
  hoverSrc?: string;
  hoverAlt?: string;
}

export default function MonoImage({
  src,
  alt,
  sizes,
  wrapperClassName = "relative aspect-[3/4] overflow-hidden",
  imageClassName = "",
  priority,
  hoverSrc,
  hoverAlt,
}: MonoImageProps) {
  return (
    <div className={`img-mono ${wrapperClassName}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${
          hoverSrc ? "transition-opacity duration-500 group-hover:opacity-0 " : ""
        }${imageClassName}`}
      />
      {hoverSrc && (
        <Image
          src={hoverSrc}
          alt={hoverAlt ?? alt}
          fill
          sizes={sizes}
          className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
    </div>
  );
}
