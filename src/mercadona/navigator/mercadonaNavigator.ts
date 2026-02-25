import { AxiosInstance } from "axios";
import { QueryOptions } from "../domain/queryOptions.js";
import { createAlgoliaSearchRequest } from "./query/algoliaSearchRequest.js";
import { MercadonaProductListPage } from "../domain/mercadonaProductListPage.js";
import { mapAlgoliaResponseToMercadonaProductListPage } from "./mappers/mapAlgoliaResponseToProductListPage.js";
import { MERCADONA_INFO } from "../config/mercadonaInfo.js";
import { mapSingleProductReponseToDomain } from "./mappers/mapSingleProductResponseToDomain.js";
import { MercadonaProduct } from "../domain/mercadonaProduct.js";
import { MercadonaProductListItem } from "../domain/mercadonaProductListItem.js";
import { mapAssociatedProductResponseToDomain } from "./mappers/mapAssociatedProductResponseToDomain.js";
import { MercadonaProductPage } from "../domain/mercadonaProductPage.js";

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

  async getProductById(productId: number): Promise<MercadonaProduct> {
    const url = MERCADONA_INFO.productEndpointTemplate
      .replace("{PRODUCT_ID}", String(productId))
      .replace("{WAREHOUSE}", this.warehouse);
    const response = await this.mercadonaClient.get(url);
    return mapSingleProductReponseToDomain(response.data);
  }

  async getAssociatedProducts(
    productId: number,
  ): Promise<MercadonaProductListItem[]> {
    const url = MERCADONA_INFO.associatedProductsEndpointTemplate
      .replace("{PRODUCT_ID}", String(productId))
      .replace("{WAREHOUSE}", this.warehouse);
    const response = await this.mercadonaClient.get(url);
    return mapAssociatedProductResponseToDomain(response.data);
  }

  async getProductPage(productId: number): Promise<MercadonaProductPage> {
    const product = await this.getProductById(productId);
    const associatedProducts = await this.getAssociatedProducts(productId);
    return MercadonaProductPage.fromProductAndAssociated(
      product,
      associatedProducts,
    );
  }
}
