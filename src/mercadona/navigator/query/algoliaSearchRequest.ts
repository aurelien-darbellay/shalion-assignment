import { QueryOptions } from "../../domain/queryOptions.js";

export type AlgoliaSearchRequest = {
  query?: string;
  facetFilters?: string[];
  filters?: string;
  getRankingInfo?: boolean;
};

export function createAlgoliaSearchRequest(
  options: QueryOptions,
): AlgoliaSearchRequest {
  const request: AlgoliaSearchRequest = {
    query: options.searchQuery,
    getRankingInfo: true,
  };
  if (options.category) {
    request.facetFilters = [
      buildCategoryFacetPath(options.category.level, options.category.id),
    ];
  }
  if (options.brands) {
    request.filters = formatBrandFilter(options.brands);
  }
  return request;
}

function buildCategoryFacetPath(depth: number, categoryId: number): string {
  if (!Number.isInteger(depth) || depth < 0) {
    throw new Error(`Invalid depth: ${depth}`);
  }
  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    throw new Error(`Invalid category id: ${categoryId}`);
  }
  const path = Array(depth + 1)
    .fill("categories")
    .join(".");
  return `${path}.id:${categoryId}`;
}

function formatBrandFilter(brands: string[]): string {
  return brands.map((brand: string) => `brand:"${brand}"`).join(" OR ");
}
