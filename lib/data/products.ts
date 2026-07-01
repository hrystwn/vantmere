import type { Category, Product } from "./types";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

export const products: Product[] = [
  // OUTERWEAR
  {
    name: "Sculpted Overcoat",
    slug: "sculpted-overcoat",
    price: 1240,
    category: "Outerwear",
    fabricStory:
      "Double-faced Italian wool, cut long and severe. The collar stands on its own architecture. It will outlast the season it was bought in.",
    images: {
      flat: u("photo-1441986300917-64674bd600d8"),
      model: u("photo-1483985988355-763728e1935b"),
      details: [
        u("photo-1591047139829-d91aecb6caea"),
        u("photo-1617137968427-85924c800a22"),
      ],
    },
  },
  {
    name: "Field Shell 02",
    slug: "field-shell-02",
    price: 890,
    category: "Outerwear",
    fabricStory:
      "Bonded cotton with a matte membrane. Seams are taped, hardware is blackened. Weather is a detail, not a concern.",
    images: {
      flat: u("photo-1490481651871-ab68de25d43d"),
      model: u("photo-1515886657613-9f3515b0c78f"),
      details: [
        u("photo-1618354691373-d851c5c3a990"),
        u("photo-1620012253295-c15cc3e65df4"),
      ],
    },
  },
  {
    name: "Horizon Parka",
    slug: "horizon-parka",
    price: 1480,
    category: "Outerwear",
    fabricStory:
      "Garment-dyed technical canvas, washed until the surface goes quiet. Down fill rated far below what a city asks of it.",
    images: {
      flat: u("photo-1529139574466-a303027c1d8b"),
      model: u("photo-1487222477894-8943e31ef7b2"),
      details: [
        u("photo-1610652492500-ded49ceeb378"),
        u("photo-1441986300917-64674bd600d8"),
      ],
    },
  },
  // KNITWEAR
  {
    name: "Monolith Crewneck",
    slug: "monolith-crewneck",
    price: 390,
    category: "Knitwear",
    fabricStory:
      "Twelve-gauge wool spun dense enough to hold its own shape. The neckline sits high, the body falls straight. Built for repetition, not occasion.",
    images: {
      flat: u("photo-1509631179647-0177331693ae"),
      model: u("photo-1495121605193-b116b5b9c5fe"),
      details: [
        u("photo-1483985988355-763728e1935b"),
        u("photo-1490481651871-ab68de25d43d"),
      ],
    },
  },
  {
    name: "Ash Mockneck",
    slug: "ash-mockneck",
    price: 420,
    category: "Knitwear",
    fabricStory:
      "Fine merino knit in a single unbroken gauge. The mockneck closes the throat without a seam in sight. Color drawn from spent charcoal, nothing added.",
    images: {
      flat: u("photo-1539533018447-63fcce2678e3"),
      model: u("photo-1548036328-c9fa89d128fa"),
      details: [
        u("photo-1515886657613-9f3515b0c78f"),
        u("photo-1529139574466-a303027c1d8b"),
      ],
    },
  },
  {
    name: "Undyed Cardigan",
    slug: "undyed-cardigan",
    price: 460,
    category: "Knitwear",
    fabricStory:
      "Undyed wool left in its natural state, spun coarse and left alone. The front stays open, the weight does the work. No dye lot to match, no two ever identical.",
    images: {
      flat: u("photo-1521223890158-f9f7c3d5d504"),
      model: u("photo-1594633312681-425c7b97ccd1"),
      details: [
        u("photo-1487222477894-8943e31ef7b2"),
        u("photo-1509631179647-0177331693ae"),
      ],
    },
  },
  // TROUSERS
  {
    name: "Tapered Wool Trouser",
    slug: "tapered-wool-trouser",
    price: 520,
    category: "Trousers",
    fabricStory:
      "Worsted wool cut with a single crease and nothing else. The taper begins at the knee and holds through the ankle. Made to be pressed once and forgotten.",
    images: {
      flat: u("photo-1551028719-00167b16eac5"),
      model: u("photo-1520975954732-35dd22299614"),
      details: [
        u("photo-1495121605193-b116b5b9c5fe"),
        u("photo-1539533018447-63fcce2678e3"),
      ],
    },
  },
  {
    name: "Wide Canvas Pant",
    slug: "wide-canvas-pant",
    price: 480,
    category: "Trousers",
    fabricStory:
      "Heavy cotton canvas, washed twice before it ever reaches a body. The leg runs wide and unbroken to the floor. Structure comes from the cloth, not the cut.",
    images: {
      flat: u("photo-1516257984-b1b4d707412e"),
      model: u("photo-1434389677669-e08b4cac3105"),
      details: [
        u("photo-1548036328-c9fa89d128fa"),
        u("photo-1521223890158-f9f7c3d5d504"),
      ],
    },
  },
  {
    name: "Pleated Track Trouser",
    slug: "pleated-track-trouser",
    price: 440,
    category: "Trousers",
    fabricStory:
      "Technical twill finished matte, pleated once at the waist. The silhouette borrows from the track without repeating it. Movement was the only brief.",
    images: {
      flat: u("photo-1445205170230-053b83016050"),
      model: u("photo-1469334031218-e382a71b716b"),
      details: [
        u("photo-1594633312681-425c7b97ccd1"),
        u("photo-1551028719-00167b16eac5"),
      ],
    },
  },
  // ACCESSORIES
  {
    name: "Forged Belt",
    slug: "forged-belt",
    price: 240,
    category: "Accessories",
    fabricStory:
      "Full-grain leather backed with a forged steel buckle, unplated. The strap will crease where the body bends and nowhere else. No stitching visible from the front.",
    images: {
      flat: u("photo-1496747611176-843222e1e57c"),
      model: u("photo-1524504388940-b1c1722653e1"),
      details: [
        u("photo-1520975954732-35dd22299614"),
        u("photo-1516257984-b1b4d707412e"),
      ],
    },
  },
  {
    name: "Grain Leather Tote",
    slug: "grain-leather-tote",
    price: 680,
    category: "Accessories",
    fabricStory:
      "Full-grain hide left raw at the edge, structured only by its own weight. The interior holds its shape without a single panel of board. It scars instead of stains.",
    images: {
      flat: u("photo-1503342217505-b0a15ec3261c"),
      model: u("photo-1544022613-e87ca75a784a"),
      details: [
        u("photo-1434389677669-e08b4cac3105"),
        u("photo-1445205170230-053b83016050"),
      ],
    },
  },
  {
    name: "Wool Watch Cap",
    slug: "wool-watch-cap",
    price: 150,
    category: "Accessories",
    fabricStory:
      "Double-layered wool knit close to the skull, no brim, no branding. The rib holds its tension through repeated wear. Built for cold that does not relent.",
    images: {
      flat: u("photo-1554412933-514a83d2f3c8"),
      model: u("photo-1560243563-062bfc001d68"),
      details: [
        u("photo-1469334031218-e382a71b716b"),
        u("photo-1496747611176-843222e1e57c"),
      ],
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category | "All"): Product[] {
  return category === "All"
    ? [...products]
    : products.filter((p) => p.category === category);
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const self = getProductBySlug(slug);
  if (!self) return [];
  const same = products.filter(
    (p) => p.slug !== slug && p.category === self.category
  );
  const rest = products.filter(
    (p) => p.slug !== slug && p.category !== self.category
  );
  return [...same, ...rest].slice(0, count);
}
