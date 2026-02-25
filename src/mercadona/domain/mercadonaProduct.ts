import { CategoryPath } from "./embeddedTypes";
import { ProductPrice } from "./embeddedTypes";

export type MercadonaProduct = {
  id: string;
  slug: string;

  name: string; // display_name
  brand?: string;

  productUrl: string; // share_url
  imageUrl?: string; // thumbnail

  packaging?: string;
  purchaseLimit?: number; // limit
  published: boolean;

  categoryPaths: CategoryPath[];

  price: ProductPrice;
};
