import { MercadonaProductListItem } from "../../domain/mercadonaProductListItem";

export function mapAssociatedProductResponseToDomain(
  data: any,
): MercadonaProductListItem[] {
  return data.results.map((item: any, index: number) => ({
    product: {
      id: item.id,
      slug: item.slug,

      name: item.display_name,
      brand: item.brand,

      productUrl: item.share_url,
      imageUrl: item.thumbnail,

      categoryPaths: item.categories.map((c: any) => ({
        nodes: [
          {
            id: c.id,
            name: c.name,
            level: c.level,
            order: c.order,
          },
        ],
      })),

      price: {
        unitPrice: parseFloat(item.price_instructions.unit_price),
        quantity: parseFloat(item.price_instructions.unit_size),
      },
    },

    position: index,
  }));
}
