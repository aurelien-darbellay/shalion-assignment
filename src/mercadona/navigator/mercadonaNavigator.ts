import { AxiosInstance } from "axios";

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
  getProducts(searchQuery: string) {
    return this.algoliaClient.post("", { query: searchQuery });
  }
}
