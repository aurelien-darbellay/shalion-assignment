export type Category = {
  id: number;
  name: string;
  level: number;
};

export type QueryOptions = {
  searchQuery: string;
  category: Category;
  brandName: string;
};

export class QueryOptionsBuilder {
  private searchQuery: string = "";
  private category: Category = { id: 0, name: "", level: 1 };
  private brandName: string = "";

  static builder(): QueryOptionsBuilder {
    return new QueryOptionsBuilder();
  }

  withSearchQuery(searchQuery: string): this {
    this.searchQuery = searchQuery;
    return this;
  }

  withCategoryId(categoryId: number): this {
    this.category.id = categoryId;
    return this;
  }

  withCategoryLevel(categoryLevel: number): this {
    this.category.level = categoryLevel;
    return this;
  }

  withBrandName(brandName: string): this {
    this.brandName = brandName;
    return this;
  }

  build(): QueryOptions {
    return {
      searchQuery: this.searchQuery,
      category: this.category,
      brandName: this.brandName,
    };
  }
}
