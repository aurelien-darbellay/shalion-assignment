export type QueryOptions = {
  searchQuery: string;
  categoryId: number;
  brandName: string;
};

export class QueryOptionsBuilder {
  private searchQuery: string = "";
  private categoryId: number = 0;
  private brandName: string = "";

  static builder(): QueryOptionsBuilder {
    return new QueryOptionsBuilder();
  }

  withSearchQuery(searchQuery: string): this {
    this.searchQuery = searchQuery;
    return this;
  }

  withCategoryId(categoryId: number): this {
    this.categoryId = categoryId;
    return this;
  }

  withBrandName(brandName: string): this {
    this.brandName = brandName;
    return this;
  }

  build(): QueryOptions {
    return {
      searchQuery: this.searchQuery,
      categoryId: this.categoryId,
      brandName: this.brandName,
    };
  }
}
