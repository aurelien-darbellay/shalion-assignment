import "dotenv/config";
import { resolveWarehouse } from "./mercadona/navigator/warehouseResolver";

async function main() {
  const warehouse = await resolveWarehouse("28001");
  console.log("Warehouse for postal code 28001:", warehouse);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
