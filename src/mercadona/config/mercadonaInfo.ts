export const MERCADONA_INFO = {
  name: "Mercadona",
  baseUrl: "https://tienda.mercadona.es",
  productEndpointTemplate: `/api/products/{PRODUCT_ID}/?lang=es&wh={WAREHOUSE}`,
  warehouse: {
    endPoint: "/api/postal-codes/actions/change-pc/",
    header: "x-customer-wh",
  },
  algoliaTemplateUrl:
    "https://{APP_ID}-dsn.algolia.net/1/indexes/products_prod_{WAREHOUSE}_es/query?x-algolia-agent={AGENT}&x-algolia-api-key={API_KEY}&x-algolia-application-id={APP_ID}",
  algoliaKeys: {
    appId: process.env.MERCADONA_ALGIOLA_APP_ID,
    apiKey: process.env.MERCADONA_ALGIOLA_API_KEY,
    agent: process.env.MERCADONA_ALGIOLA_AGENT,
  },
} as const;
