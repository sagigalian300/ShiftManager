/*
// api.js (or axiosConfig.js)
import axios from "axios";
import { urlConnector } from "../utils/urlConnector";

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
*/


// api.js (or axiosConfig.js)
import axios from "axios";

// --------------------------------------------------------
// 1. AXIOS BASE CONFIGURATION
// --------------------------------------------------------
export const api = axios.create({
  baseURL: '/api',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});