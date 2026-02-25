import { MercadonaProduct } from "./mercadonaProduct";

export type MercadonaProductListItem = {
  product: MercadonaProduct;
  position: number; // index in hits[]
  score?: number; // optional, from hit.score (if you want it)
};
