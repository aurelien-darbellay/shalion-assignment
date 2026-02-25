export const MERCADONA_INFO = {
  name: "Mercadona",
  baseUrl: "https://tienda.mercadona.es/api",
  productEndpointTemplate: `/products/{PRODUCT_ID}/?lang=es&wh={WAREHOUSE}`,
  associatedProductsEndpointTemplate: `/products/{PRODUCT_ID}/xselling/?lang=es&wh={WAREHOUSE}&exclude=`,
  warehouse: {
    endPoint: "/postal-codes/actions/change-pc/",
    header: "x-customer-wh",
  },
  algoliaTemplateUrl:
    "https://{APP_ID}-dsn.algolia.net/1/indexes/products_prod_{WAREHOUSE}_es/query?x-algolia-agent={AGENT}&x-algolia-api-key={API_KEY}&x-algolia-application-id={APP_ID}",
  algoliaKeys: {
    appId: "7UZJKL1DJ0",
    apiKey: "9d8f2e39e90df472b4f2e559a116fe17",
    agent: "Algolia for JavaScript (5.49.0); Search (5.49.0); Browser",
  },
} as const;
