import { MercadonaProductListItem } from "./mercadonaProductListItem.js";
import { QueryOptions } from "./queryOptions.js";
import { CategoryTreeNode } from "./embeddedTypes.js";
import { buildCategoryTreeFromPaths } from "./helpers/buildCategoryTreeFromItems.js";
import { MercadonaProduct } from "./mercadonaProduct.js";

export class MercadonaProductListPage {
  private readonly _categoryTree: CategoryTreeNode[];
  constructor(
    public readonly items: MercadonaProductListItem[],
    public readonly pageIndex: number,
    public readonly pageCount: number,
    public readonly totalHits: number,
    public readonly query: QueryOptions,
    public readonly zipCode: string,
    public readonly warehouse: string,
    public readonly retrievedAt: Date,
  ) {
    const paths = items.flatMap((item) => item.product.categoryPaths);
    this._categoryTree = buildCategoryTreeFromPaths(paths);
  }

  get categoryTree(): CategoryTreeNode[] {
    return this._categoryTree;
  }

  get hitsOnPage(): number {
    return this.items.length;
  }

  get brandsOnPage(): string[] {
    const brands = new Set<string>();
    for (const item of this.items) {
      const brand = item.product.brand?.trim();
      if (brand) {
        brands.add(brand);
      }
    }
    return [...brands].sort((a, b) => a.localeCompare(b));
  }

  getProductByPosition(position: number): MercadonaProduct | undefined {
    return this.items.find((item) => item.position === position)?.product;
  }

  getProductsByBrand(brand: string): MercadonaProductListItem[] {
    return this.items.filter((item) => item.product.brand === brand);
  }
}
