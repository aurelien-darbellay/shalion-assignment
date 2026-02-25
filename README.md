# Shalion Mercadona Navigator

A TypeScript-based API client and navigator for interacting with Mercadona's online store (tienda.mercadona.es). This project provides a clean, type-safe interface for searching products, retrieving product details, and navigating through associated products.

## 🚀 Features

- **Product Search**: Search for products using Mercadona's Algolia search API with advanced filtering capabilities
- **Category Filtering**: Filter products by category hierarchy (multi-level support)
- **Brand Filtering**: Filter products by one or multiple brands
- **Product Details**: Retrieve detailed information about specific products
- **Associated Products**: Get related/cross-selling products with pagination support
- **Warehouse Resolution**: Automatically resolves the correct warehouse based on postal code
- **Category Tree Building**: Automatically constructs category trees from search results
- **Type-Safe**: Built with TypeScript for full type safety

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/aurelien-darbellay/shalion-assignment.git
cd shalion-Darbellay
```

2. Install dependencies:

```bash
npm install
```

## 🚦 Usage

### Running the Demo

The project includes demonstration scripts that show the main features:

```bash
# Run in development mode
npm run dev

# Build the project
npm run build

# Run the built version
npm start

# Type check without building
npm run typecheck
```

### Basic Usage Examples

#### 1. Creating a Navigator Instance

```typescript
import { createMercadonaNavigator } from "./mercadona/navigator/factory/navigatorFactory";

// Create a navigator for Barcelona (postal code 08024)
const navigator = await createMercadonaNavigator("08024");
```

#### 2. Searching for Products

```typescript
import { QueryOptionsBuilder } from "./mercadona/domain/queryOptions";

// Simple search
const query = QueryOptionsBuilder.builder().withSearchQuery("leche").build();

const productsPage = await navigator.getProducts(query);

// Access results
console.log(`Total hits: ${productsPage.totalHits}`);
console.log(`Page ${productsPage.pageIndex + 1} of ${productsPage.pageCount}`);
productsPage.items.forEach((item) => {
  console.log(`${item.product.name} - ${item.product.price.quantity}€`);
});
```

#### 3. Advanced Search with Filters

```typescript
// Search with category and brand filters
const refinedQuery = QueryOptionsBuilder.builder()
  .withSearchQuery("leche")
  .withCategory(categoryId, categoryLevel)
  .addBrandName("Hacendado")
  .addBrandName("Central Lechera")
  .build();

const refinedResults = await navigator.getProducts(refinedQuery);
```

#### 4. Getting Product By Id

```typescript
// Get product information by ID
const productId = 26029;
const product = await navigator.getProductById(productId);

console.log(`Name: ${product.name}`);
console.log(`Brand: ${product.brand}`);
console.log(`Price: ${product.price.unitPrice}€`);
console.log(`Product URL: ${product.productUrl}`);
```

#### 5. Working with Product Pages (Associated Products)

```typescript
// Get a product page with associated products
const productPage = await navigator.getProductPage(productId);

console.log(`Main product: ${productPage.product.name}`);
console.log(
  `Total associated products: ${productPage.associatedProducts.length}`,
);

// View paginated associated products (5 items per page)
console.log("First page of associated products:");
productPage.visibleItems.forEach((item) => {
  console.log(`- ${item.product.name} (${item.product.price.unitPrice}€)`);
});

// Navigate to next page
productPage.next();
console.log("Second page of associated products:");
productPage.visibleItems.forEach((item) => {
  console.log(`- ${item.product.name} (${item.product.price.unitPrice}€)`);
});

// Navigate back
productPage.previous();
```

#### 6. Exploring Category Trees

```typescript
const productsPage = await navigator.getProducts(query);

// Get the category tree from search results
productsPage.categoryTree.forEach((category) => {
  console.log(`${category.name} (ID: ${category.id})`);
  category.children.forEach((subcategory) => {
    console.log(`  └─ ${subcategory.name} (ID: ${subcategory.id})`);
  });
});
```

#### 7. Filtering by Brand

```typescript
const productsPage = await navigator.getProducts(query);

// Get all brands on the current page
console.log("Available brands:", productsPage.brandsOnPage);

// Filter products by brand
const hacendadoProducts = productsPage.getProductsByBrand("Hacendado");
console.log(`Found ${hacendadoProducts.length} Hacendado products`);
```

## 📁 Project Structure

```
shalion-Darbellay/
├── src/
│   ├── demo.ts                     # Demo entry point
│   ├── testProductsListPage.ts      # Demo: Product search
│   ├── testProductPage.ts           # Demo: Single Product Page
│   └── mercadona/
│       ├── axios/
│       │   ├── algoliaClientFactory.ts    # Algolia HTTP client factory
│       │   └── mercadonaClient.ts         # Mercadona HTTP client factory
│       ├── config/
│       │   └── mercadonaInfo.ts     # API endpoints and configuration
│       ├── domain/
│       │   ├── embeddedTypes.ts     # Shared type definitions
│       │   ├── queryOptions.ts      # Search query builder
│       │   ├── mercadonaProduct.ts  # Product domain model
│       │   ├── mercadonaProductListItem.ts
│       │   ├── mercadonaProductListPage.ts
│       │   ├── mercadonaProductPage.ts
│       │   └── helpers/
│       │       └── buildCategoryTreeFromItems.ts
│       └── navigator/
│           ├── mercadonaNavigator.ts      # Main navigator class
│           ├── factory/
│           │   ├── navigatorFactory.ts    # Navigator factory
│           │   └── warehouseResolver.ts   # Postal code to warehouse resolver
│           ├── query/
│           │   └── algoliaSearchRequest.ts
│           └── mappers/
│               ├── extractCategoryPaths.ts
│               ├── mapAlgoliaResponseToProductListPage.ts
│               ├── mapSingleProductResponseToDomain.ts
│               └── mapAssociatedProductResponseToDomain.ts
├── package.json
├── tsconfig.json
```

## 🏗️ Architecture

### Domain Models

- **MercadonaProduct**: Represents a product with all its details (name, brand, price, categories, etc.)
- **MercadonaProductListItem**: Wraps a product with its position and score in search results
- **MercadonaProductListPage**: Represents a search result page with list of products, and facetFilters (category tree + list of brands)
- **MercadonaProductPage**: Represents a product detail page with paginated associated products
- **QueryOptions**: Defines search parameters (query text, category filters, brand filters)

### Key Components

#### MercadonaNavigator

The main interface for interacting with Mercadona's API. It provides methods to:

- Search for products
- Get product details by ID
- Retrieve associated products
- Build complete product pages

#### QueryOptionsBuilder

A builder pattern implementation for constructing search queries:

- Fluent API for easy query construction
- Support for search text, category filtering, and brand filtering
- Type-safe query building

#### Warehouse Resolution

Automatically determines the correct warehouse based on postal code, ensuring accurate product availability and pricing for the user's location.

### HTTP Clients

- **Mercadona Client**: Configured for direct API calls to tienda.mercadona.es/api
- **Algolia Client**: Configured for product search via Mercadona's Algolia integration

## 📊 API Endpoints Used

- **Warehouse Resolution**: `PUT /postal-codes/actions/change-pc/`
- **Product Search**: Algolia search API (`products_prod_{warehouse}_es`)
- **Product Details**: `GET /products/{id}/?lang=es&wh={warehouse}`
- **Associated Products**: `GET /products/{id}/xselling/?lang=es&wh={warehouse}`

## 🧪 Testing

The project includes two main test scenarios:

1. **testProductsListPage**: Demonstrates product search, filtering, and category exploration
2. **testProductPage**: Demonstrates product details retrieval and associated products pagination

Run tests with:

```bash
npm run dev
```

## 📝 Type Safety

The project is built with strict TypeScript configuration:

- Strict type checking enabled
- No implicit any
- Full ES2022 support
