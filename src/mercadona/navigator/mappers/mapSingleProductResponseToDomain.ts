import { MercadonaProduct } from "../../domain/mercadonaProduct";
import { extractCategoryPaths } from "./extractCategoryPaths";

export function mapSingleProductReponseToDomain(data: any): MercadonaProduct {
  return {
    id: data.id,
    slug: data.slug,

    name: data.display_name,
    brand: data.brand ?? data.details?.brand ?? undefined,

    productUrl: data.share_url,
    imageUrl: data.thumbnail,

    categoryPaths: extractCategoryPaths(data.categories),

    price: {
      unitPrice: parseFloat(data.price_instructions.unit_price),
      quantity: parseFloat(data.price_instructions.unit_size),
    },
  };
}
