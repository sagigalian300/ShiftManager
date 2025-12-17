import { IS_PROD } from "../../lib/config.js";

export const selfDomain = IS_PROD
  ? "https://shift-manager-q8f4.vercel.app/"
  : "http://localhost:3000/";
