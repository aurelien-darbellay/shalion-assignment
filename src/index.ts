import "dotenv/config";
import { resolveWarehouse } from "./mercadona/navigator/warehouseResolver";
import { createMercadonaAlgoliaClient } from "./mercadona/axios/algoliaClientFactory";

async function main() {
  const warehouse = await resolveWarehouse("28001");
  const algoliaClient = createMercadonaAlgoliaClient(warehouse);
  const response = await algoliaClient.post("", { query: "leche" });
  console.log("Algolia response:", response.data);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
