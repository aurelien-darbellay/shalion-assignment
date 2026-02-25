import { AxiosInstance } from "axios";
import { MercadonaNavigator } from "../mercadonaNavigator.js";
import { resolveWarehouse } from "./warehouseResolver.js";
import { createMercadonaClient } from "../../axios/mercadonaClient.js";
import { createMercadonaAlgoliaClient } from "../../axios/algoliaClientFactory.js";

export type AlgoliaClientFactory = (warehouse: string) => AxiosInstance;

export async function createMercadonaNavigator(
  zipCode: string,
): Promise<MercadonaNavigator> {
  let mercadonaNavigator: MercadonaNavigator;
  const mercadonaClient = createMercadonaClient();
  const warehouse = await resolveWarehouse(mercadonaClient, zipCode);
  const algoliaClient = createMercadonaAlgoliaClient(warehouse);
  return (mercadonaNavigator = new MercadonaNavigator(
    mercadonaClient,
    algoliaClient,
    warehouse,
    zipCode,
  ));
}
