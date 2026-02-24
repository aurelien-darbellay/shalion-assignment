import axios from "axios";
import { MERCADONA_INFO } from "../config/mercadonaInfo";

export const mercadonaClient = axios.create({
  baseURL: MERCADONA_INFO.baseUrl,
  timeout: process.env.REQUEST_TIMEOUT
    ? parseInt(process.env.REQUEST_TIMEOUT)
    : 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": process.env.USER_AGENT || "ShalionBot/1.0",
  },
});
