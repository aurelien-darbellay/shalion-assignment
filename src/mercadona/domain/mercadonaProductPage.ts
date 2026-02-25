import { MercadonaProduct } from "./mercadonaProduct.js";
import { MercadonaProductListItem } from "./mercadonaProductListItem.js";

export class MercadonaProductPage {
  private start = 0; // zero-based internally
  private readonly pageSize = 5;

  constructor(
    public product: MercadonaProduct,
    public associatedProducts: MercadonaProductListItem[],
  ) {}

  static fromProductAndAssociated(
    product: MercadonaProduct,
    associatedProducts: MercadonaProductListItem[],
  ): MercadonaProductPage {
    return new MercadonaProductPage(product, associatedProducts);
  }

  get visibleItems(): MercadonaProductListItem[] {
    return this.associatedProducts.slice(
      this.start,
      this.start + this.pageSize,
    );
  }

  next(): void {
    if (this.start + this.pageSize > this.associatedProducts.length) {
      return;
    }
    this.start += this.pageSize;
  }
  previous(): void {
    if (this.start === 0) {
      return;
    }
    this.start -= this.pageSize;
  }
}
