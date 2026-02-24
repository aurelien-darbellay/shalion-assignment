import { AxiosInstance } from "axios";
import { MercadonaNavigator } from "../mercadonaNavigator";
import { resolveWarehouse } from "./warehouseResolver";
import { createMercadonaClient } from "../../axios/mercadonaClient";
import { createMercadonaAlgoliaClient } from "../../axios/algoliaClientFactory";

export type AlgoliaClientFactory = (warehouse: string) => AxiosInstance;

export async function createMercadonaNavigator(
  postalCode: string,
): Promise<MercadonaNavigator> {
  const mercadonaClient = createMercadonaClient();
  const warehouse = await resolveWarehouse(mercadonaClient, postalCode);
  const algoliaClient = createMercadonaAlgoliaClient(warehouse);
  return new MercadonaNavigator(mercadonaClient, algoliaClient, warehouse);
}
