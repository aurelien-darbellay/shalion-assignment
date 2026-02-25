import { QueryOptionsBuilder } from "./mercadona/domain/queryOptions.js";
import { MercadonaNavigator } from "./mercadona/navigator/mercadonaNavigator.js";

export async function testProductsListPage(navigator: MercadonaNavigator) {
  const query = QueryOptionsBuilder.builder().withSearchQuery("leche").build();
  const productsPage = await navigator.getProducts(query);
  console.log("Three first hits:\n");
  productsPage.items.slice(0, 3).forEach((product, index) => {
    console.log(`Hit #${index + 1}:`);
    console.log(`  Name: ${product.product.name}`);
    console.log(`  Brand: ${product.product.brand}`);
    console.log(`  Price: ${product.product.price.quantity} EUROS`);
    console.log(`  URL: ${product.product.productUrl}`);
    console.log("");
  });
  console.log(`Total hits: ${productsPage.totalHits}`);
  console.log(`Page index: ${productsPage.pageIndex}`);
  console.log(`Page count: ${productsPage.pageCount}`);
  console.log("Root categories on page:\n");
  productsPage.categoryTree.forEach((category, index) => {
    console.log(`  ${index + 1}. ${category.name}\n`);
  });
  console.log(
    "Number of hits for Hacendado:",
    productsPage.getProductsByBrand("Hacendado").length,
  );
  const firstCategory = productsPage.categoryTree[0];
  if (firstCategory) {
    console.log(
      `Specify the search with the category: ${firstCategory.name} and adding Hacendado as brand filter`,
    );
    const categoryQuery = QueryOptionsBuilder.builder()
      .withSearchQuery("leche")
      .withCategory(firstCategory.id, firstCategory.level)
      .addBrandName("Hacendado")
      .build();
    console.log("First 3 products with refined search:\n");
    const refinedProductsPage = await navigator.getProducts(categoryQuery);
    refinedProductsPage.items.slice(0, 3).forEach((product, index) => {
      console.log(`Hit #${index + 1}:`);
      console.log(`  Name: ${product.product.name}`);
      console.log(`  Brand: ${product.product.brand}`);
      console.log(`  Price: ${product.product.price.quantity} EUROS`);
      console.log(`  URL: ${product.product.productUrl}`);
      console.log("");
    });
    console.log(
      `Total hits in refined search: ${refinedProductsPage.totalHits}`,
    );
  }
}
