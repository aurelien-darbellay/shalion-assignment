import axios, { AxiosInstance } from "axios";
import { MERCADONA_INFO } from "../config/mercadonaInfo";

function assertAlgoliaKeys() {
  const { appId, apiKey, agent } = MERCADONA_INFO.algoliaKeys;

  if (!appId || !apiKey || !agent) {
    throw new Error(
      "Missing Algolia configuration. Check MERCADONA_ALGIOLA_APP_ID, MERCADONA_ALGIOLA_API_KEY, MERCADONA_ALGIOLA_AGENT",
    );
  }
}

function buildAlgoliaUrl(warehouse: string): string {
  assertAlgoliaKeys();

  const { appId, apiKey, agent } = MERCADONA_INFO.algoliaKeys;

  return MERCADONA_INFO.algoliaTemplateUrl
    .replace("{APP_ID}", appId!)
    .replace("{WAREHOUSE}", warehouse)
    .replace("{AGENT}", encodeURIComponent(agent!))
    .replace("{API_KEY}", apiKey!)
    .replace("{APP_ID}", appId!);
}

export function createMercadonaAlgoliaClient(warehouse: string): AxiosInstance {
  const url = buildAlgoliaUrl(warehouse);
  return axios.create({
    baseURL: url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: process.env.REQUEST_TIMEOUT
      ? parseInt(process.env.REQUEST_TIMEOUT)
      : 5000,
  });
}
