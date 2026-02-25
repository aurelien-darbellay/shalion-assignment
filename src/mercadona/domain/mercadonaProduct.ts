import { CategoryPath } from "./embeddedTypes.js";
import { ProductPrice } from "./embeddedTypes.js";

export type MercadonaProduct = {
  id: string;
  slug: string;

  name: string;
  brand?: string;

  productUrl: string;
  imageUrl?: string;
  categoryPaths: CategoryPath[];

  price: ProductPrice;
};
