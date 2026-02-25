import { AxiosInstance } from "axios";
import { QueryOptions } from "../domain/queryOptions";
import { createAlgoliaSearchRequest } from "./query/algoliaSearchRequest";
import { MercadonaProductListPage } from "../domain/mercadonaProductListPage";
import { mapAlgoliaResponseToMercadonaProductListPage } from "./query/mapResponseToProductListPage";

export class MercadonaNavigator {
  private readonly mercadonaClient: AxiosInstance;
  private readonly algoliaClient: AxiosInstance;
  private readonly warehouse: string = "vlc01";
  private readonly zipCode: string = "46001";

  constructor(
    mercadonaClient: AxiosInstance,
    algoliaClient: AxiosInstance,
    warehouse: string,
    zipCode: string,
  ) {
    this.mercadonaClient = mercadonaClient;
    this.algoliaClient = algoliaClient;
    this.warehouse = warehouse;
    this.zipCode = zipCode;
  }

  getWarehouse(): string {
    return this.warehouse;
  }

  getZipCode(): string {
    return this.zipCode;
  }

  async getProducts(options: QueryOptions): Promise<MercadonaProductListPage> {
    const request = createAlgoliaSearchRequest(options);
    const response = await this.algoliaClient.post("", request);
    return mapAlgoliaResponseToMercadonaProductListPage(response.data, {
      query: options,
      zipCode: this.zipCode,
      warehouse: this.warehouse,
    });
  }
}
