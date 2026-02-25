import { ProductPrice } from "../../domain/embeddedTypes";
import { MercadonaProduct } from "../../domain/mercadonaProduct";
import { MercadonaProductListItem } from "../../domain/mercadonaProductListItem";
import { MercadonaProductListPage } from "../../domain/mercadonaProductListPage";
import { QueryOptions } from "../../domain/queryOptions";
import { extractCategoryPaths } from "./extractCategoryPaths";

export function mapAlgoliaResponseToMercadonaProductListPage(
  algoliaResponse: any,
  ctx: {
    query: QueryOptions;
    zipCode: string;
    warehouse: string;
  },
): MercadonaProductListPage {
  const hits: any[] = Array.isArray(algoliaResponse.hits)
    ? algoliaResponse.hits
    : [];

  const items: MercadonaProductListItem[] = hits.map((hit, index) => ({
    product: fromAlgoliaHit(hit),
    position: index,
    score: typeof hit.score === "number" ? hit.score : undefined,
  }));

  const pageIndex = algoliaResponse.page ?? 0;
  const pageCount = algoliaResponse.nbPages ?? 0;
  const totalHits = algoliaResponse.nbHits ?? items.length;

  return new MercadonaProductListPage(
    items,
    pageIndex,
    pageCount,
    totalHits,
    ctx.query,
    ctx.zipCode,
    ctx.warehouse,
    new Date(),
  );
}

function fromAlgoliaHit(hit: any): MercadonaProduct {
  return {
    id: String(hit?.id ?? hit?.objectID ?? ""),
    slug: String(hit?.slug ?? ""),

    name: String(hit?.display_name ?? ""),
    brand: typeof hit?.brand === "string" ? hit.brand : undefined,

    productUrl: String(hit?.share_url ?? ""),
    imageUrl: typeof hit?.thumbnail === "string" ? hit.thumbnail : undefined,

    categoryPaths: extractCategoryPaths(hit?.categories),

    price: mapPrice(hit?.price_instructions),
  };
}

export function mapPrice(pi: any): ProductPrice {
  return {
    unitPrice:
      typeof pi?.unit_price === "number"
        ? pi.unit_price
        : parseFloat(pi?.unit_price ?? "0") || 0,
    quantity:
      typeof pi?.unit_size === "number"
        ? pi.unit_size
        : parseFloat(pi?.unit_size ?? "0") || 0,
  };
}
