import { AxiosInstance } from "axios";
import { QueryOptions } from "../domain/queryOptions";
import { createAlgoliaSearchRequest } from "./query/algoliaSearchRequest";
import { MercadonaProductListPage } from "../domain/mercadonaProductListPage";
import { mapAlgoliaResponseToMercadonaProductListPage } from "./mappers/mapAlgoliaResponseToProductListPage";
import { MERCADONA_INFO } from "../config/mercadonaInfo";
import { mapSingleProductReponseToDomain } from "./mappers/mapSingleProductResponseToDomain";
import { MercadonaProduct } from "../domain/mercadonaProduct";
import { MercadonaProductListItem } from "../domain/mercadonaProductListItem";
import { mapAssociatedProductResponseToDomain } from "./mappers/mapAssociatedProductResponseToDomain";
import { MercadonaProductPage } from "../domain/mercadonaProductPage";

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
