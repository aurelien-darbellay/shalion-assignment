import "dotenv/config";
import { createMercadonaNavigator } from "./mercadona/navigator/factory/navigatorFactory";

async function main() {
  const navigator = await createMercadonaNavigator("46001");
  console.log("Warehouse:", navigator.getWarehouse());
  const products = await navigator.getProducts("leche");
  console.log("Products:", products.data);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
