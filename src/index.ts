import "dotenv/config";
import { createMercadonaNavigator } from "./mercadona/navigator/factory/navigatorFactory";
import { QueryOptionsBuilder } from "./mercadona/domain/queryOptions";

async function main() {
  const navigator = await createMercadonaNavigator("08024");
  console.log("Warehouse:", navigator.getWarehouse());
  const options = QueryOptionsBuilder.builder()
    .withSearchQuery("champú")
    .build();
  const productListPage = await navigator.getProducts(options);
  console.log("Page retrieved:", productListPage);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exitCode = 1;
});
