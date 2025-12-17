import { IS_PROD } from "../../lib/config.js";
export const urlConnector = IS_PROD
  ? "https://shiftmanagerbackend-158472866452.europe-west1.run.app/"
  : "http://localhost:3001/";
