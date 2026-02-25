export type CategoryInQuery = {
  id: number;
  level: number;
};

export type QueryOptions = {
  searchQuery: string;
  category?: CategoryInQuery;
  brands: string[];
};

export class QueryOptionsBuilder {
  private searchQuery: string = "";
  private category: CategoryInQuery | null = null;
  private brands: string[] = [];

  static builder(): QueryOptionsBuilder {
    return new QueryOptionsBuilder();
  }

  withSearchQuery(searchQuery: string): this {
    this.searchQuery = searchQuery;
    return this;
  }

  withCategory(categoryId: number, categoryLevel: number): this {
    this.category = { id: categoryId, level: categoryLevel };
    return this;
  }

  addBrandName(brandName: string): this {
    this.brands.push(brandName);
    return this;
  }

  build(): QueryOptions {
    return {
      searchQuery: this.searchQuery,
      category: this.category ?? undefined,
      brands: this.brands,
    };
  }
}
