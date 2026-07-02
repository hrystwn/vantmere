import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";

const BASE_URL = "https://vantmere.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/collection", "/lookbook", "/about", "/contact"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
    })
  );

  const productRoutes = products.map((product) => ({
    url: `${BASE_URL}/collection/${product.slug}`,
  }));

  return [...staticRoutes, ...productRoutes];
}
