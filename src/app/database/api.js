// api.js (or axiosConfig.js)
import axios from 'axios';
import { urlConnector } from './urlConnector';

// --------------------------------------------------------
// 1. AXIOS BASE CONFIGURATION
// --------------------------------------------------------

// Create and EXPORT the custom Axios instance
export const api = axios.create({ 
  baseURL: urlConnector, 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});