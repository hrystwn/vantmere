"use client";

import { useState } from "react";

/**
 * Email capture used by the ComingSoonDrawer (paper bg) and the contact
 * page (ink bg). Deliberately has no color classes on the input/button —
 * both inherit `color` from their surrounding text-ink / text-paper
 * ancestor via Tailwind's preflight reset, so it reads correctly in
 * either context without a variant prop.
 */
export default function NewsletterInput() {
  const [submitted, setSubmitted] = useState(false);

  return (
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
        className="w-full border-b border-gray-2 bg-transparent py-2 font-body placeholder:text-gray-2 focus:outline-none"
      />
      <button type="submit" className="micro-label">
        {submitted ? "NOTED." : "NOTIFY ME"}
      </button>
    </form>
  );
}
