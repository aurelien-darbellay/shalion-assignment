import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { MERCADONA_INFO } from "../config/mercadonaInfo.js";

export const createMercadonaClient = (
  config?: CreateAxiosDefaults,
): AxiosInstance => {
  return axios.create({
    baseURL: MERCADONA_INFO.baseUrl,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
    ...config,
  });
};
