/**
 * Cycles through a fixed set of Tailwind span/offset classes to produce
 * staggered editorial grid placement, wrapping back to the start once the
 * pattern is exhausted.
 *
 * CollectionGrid and FeaturedDrop each keep their own pattern array rather
 * than sharing one, since their parent grids differ (CollectionGrid's cards
 * each declare their own col-span-12 mobile fallback; FeaturedDrop relies on
 * its parent's grid-cols-1 for the mobile stack) — only the cycling
 * mechanism is shared here.
 */
export function editorialSpan(pattern: readonly string[], index: number): string {
  return pattern[index % pattern.length];
}
