import "dotenv/config";
import { createMercadonaNavigator } from "./mercadona/navigator/factory/navigatorFactory.js";
import { testProductsListPage } from "./testProductsListPage.js";
import { testProductPage } from "./testProductPage.js";

async function main() {
  const navigator = await createMercadonaNavigator("08024");
  await testProductsListPage(navigator);
  await testProductPage(navigator);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exitCode = 1;
});
