export type Category = "Outerwear" | "Knitwear" | "Trousers" | "Accessories";

export interface Product {
  name: string;
  slug: string;
  price: number;
  category: Category;
  fabricStory: string;
  images: { flat: string; model: string; details: string[] };
}
