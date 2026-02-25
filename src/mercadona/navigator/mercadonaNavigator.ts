import { AxiosInstance } from "axios";
import { QueryOptions } from "../domain/queryOptions";
import { createAlgoliaSearchRequest } from "./query/algoliaSearchRequest";

export class MercadonaNavigator {
  private readonly mercadonaClient: AxiosInstance;
  private readonly algoliaClient: AxiosInstance;
  private readonly warehouse: string = "vlc01";

  constructor(
    mercadonaClient: AxiosInstance,
    algoliaClient: AxiosInstance,
    warehouse: string,
  ) {
    this.mercadonaClient = mercadonaClient;
    this.algoliaClient = algoliaClient;
    this.warehouse = warehouse;
  }

  getWarehouse(): string {
    return this.warehouse;
  }
  getProducts(options: QueryOptions) {
    const request = createAlgoliaSearchRequest(options);
    return this.algoliaClient.post("", request);
  }
}
