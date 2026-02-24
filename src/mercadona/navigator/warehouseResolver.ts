import { mercadonaClient } from "../axios/mercadonaClient";
import { MERCADONA_INFO } from "../config/mercadonaInfo";

export async function resolveWarehouse(postalCode: string) {
  const response = await mercadonaClient.put(
    MERCADONA_INFO.warehouse.endPoint,
    { new_postal_code: postalCode },
  );
  const warehouse = response.headers[MERCADONA_INFO.warehouse.header];
  if (!warehouse) {
    throw new Error("Warehouse header not found in response");
  }
  return warehouse;
}
