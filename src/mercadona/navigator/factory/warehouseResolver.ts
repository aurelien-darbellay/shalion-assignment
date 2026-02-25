import { AxiosInstance } from "axios";
import { MERCADONA_INFO } from "../../config/mercadonaInfo";

export async function resolveWarehouse(
  mercadonaClient: AxiosInstance,
  postalCode: string,
) {
  let response: any;
  try {
    response = await mercadonaClient.put(MERCADONA_INFO.warehouse.endPoint, {
      new_postal_code: postalCode,
    });
  } catch (error: any) {
    throw new Error(
      `Error resolving warehouse for postal code ${postalCode}: ${error.response.data.error_msg}`,
    );
  }
  const warehouse = response.headers[MERCADONA_INFO.warehouse.header];
  if (!warehouse) {
    throw new Error("Warehouse header not found in response");
  }
  return warehouse;
}
