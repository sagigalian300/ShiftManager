// api.js (or axiosConfig.js)
import axios from "axios";
import { urlConnector } from "./urlConnector";

// --------------------------------------------------------
// 1. AXIOS BASE CONFIGURATION
// --------------------------------------------------------
export const api = axios.create({
  baseURL: urlConnector,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});
