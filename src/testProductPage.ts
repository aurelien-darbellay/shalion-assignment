import { MercadonaNavigator } from "./mercadona/navigator/mercadonaNavigator.js";

export async function testProductPage(navigator: MercadonaNavigator) {
  const productId = 26029;
  const productPage = await navigator.getProductPage(productId);
  console.log("Product details:");
  console.log(`Name: ${productPage.product.name}`);
  console.log(`Brand: ${productPage.product.brand}`);
  console.log(`Price: ${productPage.product.price.unitPrice} EUROS`);
  const associatedProducts = productPage.associatedProducts;
  console.log(`\n ${associatedProducts.length} associated products.`);
  console.log("\nVisible associated products:");
  const visibleAssociatedProducts = productPage.visibleItems;
  visibleAssociatedProducts.forEach((associatedProduct: any, index: number) => {
    console.log(`\nAssociated Product #${index + 1}:`);
    console.log(`  Name: ${associatedProduct.product.name}`);
    console.log(`  Brand: ${associatedProduct.product.brand}`);
    console.log(`  Price: ${associatedProduct.product.price.unitPrice} EUROS`);
    console.log(`  URL: ${associatedProduct.product.productUrl}`);
  });
  console.log("\nMoving to next page of associated products...");
  productPage.next();
  const nextVisibleAssociatedProducts = productPage.visibleItems;
  nextVisibleAssociatedProducts.forEach(
    (associatedProduct: any, index: number) => {
      console.log(`\nAssociated Product #${index + 1} (Page 2):`);
      console.log(`  Name: ${associatedProduct.product.name}`);
      console.log(`  Brand: ${associatedProduct.product.brand}`);
      console.log(
        `  Price: ${associatedProduct.product.price.unitPrice} EUROS`,
      );
      console.log(`  URL: ${associatedProduct.product.productUrl}`);
    },
  );
}
