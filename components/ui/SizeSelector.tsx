"use client";

import { useState } from "react";

const SIZES = ["XS", "S", "M", "L", "XL"] as const;

export default function SizeSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <p className="micro-label text-gray-2">
        SIZE {selected && <span className="text-paper">— {selected}</span>}
      </p>
      <div className="mt-4 flex gap-3">
        {SIZES.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setSelected(size)}
            aria-pressed={selected === size}
            className={`micro-label h-12 w-12 border ${
              selected === size
                ? "border-paper bg-paper text-ink"
                : "border-gray-1"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
