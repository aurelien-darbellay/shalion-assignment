import { AxiosInstance } from "axios";
import { MercadonaNavigator } from "../mercadonaNavigator";
import { resolveWarehouse } from "./warehouseResolver";
import { createMercadonaClient } from "../../axios/mercadonaClient";
import { createMercadonaAlgoliaClient } from "../../axios/algoliaClientFactory";

export type AlgoliaClientFactory = (warehouse: string) => AxiosInstance;

export async function createMercadonaNavigator(
  postalCode: string,
): Promise<MercadonaNavigator> {
  let mercadonaNavigator: MercadonaNavigator;
  try {
    const mercadonaClient = createMercadonaClient();
    const warehouse = await resolveWarehouse(mercadonaClient, postalCode);
    const algoliaClient = createMercadonaAlgoliaClient(warehouse);
    mercadonaNavigator = new MercadonaNavigator(
      mercadonaClient,
      algoliaClient,
      warehouse,
    );
  } catch (error: any) {
    console.error("Error creating MercadonaNavigator:", error.message);
    throw error;
  }

  return mercadonaNavigator;
}
