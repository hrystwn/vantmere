const SHIPPED = [
  {
    title: "Lookbook Vol. 01",
    body: "Published a 12-frame lookbook route with a scrub-pinned cover and caption stack.",
  },
  {
    title: "Collection grid",
    body: "Listed twelve numbered pieces across outerwear, knitwear, trousers, and accessories.",
  },
  {
    title: "Product detail routes",
    body: "Shipped per-piece pages with mono photography, size selector, and related rail.",
  },
  {
    title: "Hero motion fallback",
    body: "Switched the home hero to a static poster on small viewports and when motion is reduced.",
  },
  {
    title: "Waitlist capture",
    body: "Opened the home mail form so visitors can join before the store opens.",
  },
] as const;

export default function WhatsNew() {
  return (
    <section
      aria-labelledby="whats-new-heading"
      className="relative bg-ink px-6 py-32 text-paper md:py-48"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-6">
        {/* Sticky title rail - layout family: sticky-rail release ledger */}
        <header className="md:col-span-4 md:sticky md:top-28 md:self-start">
          <h2
            id="whats-new-heading"
            className="display-lg max-w-[10ch]"
          >
            What shipped in v2
          </h2>
          <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-gray-2">
            Release notes for the current site. Past tense. No roadmap filler.
          </p>
        </header>

        {/* Change rows - sparse top borders only, single column on mobile */}
        <ol className="m-0 list-none p-0 md:col-span-7 md:col-start-6">
          {SHIPPED.map((item) => (
            <li
              key={item.title}
              className="border-t border-gray-1 py-8 first:border-t-0 first:pt-0"
            >
              <h3 className="font-body text-lg font-medium tracking-tight text-paper">
                {item.title}
              </h3>
              <p className="mt-2 max-w-[52ch] text-base leading-relaxed text-gray-2">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
