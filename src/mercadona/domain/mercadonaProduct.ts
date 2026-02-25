import { CategoryPath } from "./embeddedTypes";
import { ProductPrice } from "./embeddedTypes";

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
