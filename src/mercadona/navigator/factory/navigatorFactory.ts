import { AxiosInstance } from "axios";
import { MercadonaNavigator } from "../mercadonaNavigator";
import { resolveWarehouse } from "./warehouseResolver";
import { createMercadonaClient } from "../../axios/mercadonaClient";
import { createMercadonaAlgoliaClient } from "../../axios/algoliaClientFactory";

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
