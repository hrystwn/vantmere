import { describe, it, expect } from "vitest";
import {
  products,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
} from "./products";

describe("products data", () => {
  it("has 12 products, 3 per category", () => {
    expect(products).toHaveLength(12);
    for (const c of ["Outerwear", "Knitwear", "Trousers", "Accessories"] as const) {
      expect(products.filter((p) => p.category === c)).toHaveLength(3);
    }
  });

  it("has unique slugs and complete image sets", () => {
    const slugs = new Set(products.map((p) => p.slug));
    expect(slugs.size).toBe(12);
    for (const p of products) {
      expect(p.images.flat).toMatch(/^https:\/\/images\.unsplash\.com\//);
      expect(p.images.model).toMatch(/^https:\/\/images\.unsplash\.com\//);
      expect(p.images.details.length).toBeGreaterThanOrEqual(2);
      expect(p.fabricStory.length).toBeGreaterThan(40);
      expect(p.fabricStory).not.toContain("!");
    }
  });

  it("getProductBySlug finds and misses correctly", () => {
    const first = products[0];
    expect(getProductBySlug(first.slug)?.name).toBe(first.name);
    expect(getProductBySlug("nope")).toBeUndefined();
  });

  it("getProductsByCategory filters, All returns everything", () => {
    expect(getProductsByCategory("All")).toHaveLength(12);
    expect(
      getProductsByCategory("Knitwear").every((p) => p.category === "Knitwear")
    ).toBe(true);
  });

  it("getRelatedProducts excludes self and prefers same category", () => {
    const p = products[0];
    const related = getRelatedProducts(p.slug);
    expect(related).toHaveLength(3);
    expect(related.some((r) => r.slug === p.slug)).toBe(false);
    expect(related[0].category).toBe(p.category);
  });
});
