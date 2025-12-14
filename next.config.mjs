/*import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

 //@type {import('next').NextConfig} 
const nextConfig = {};

export default withNextIntl(nextConfig);*/

// next.config.js

import createNextIntlPlugin from "next-intl/plugin";
import {urlConnector} from "./src/utils/urlConnector.js";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // הוספת פונקציית ה-rewrites (ה-Reverse Proxy)
  async rewrites() {
    return [
      {
        // 1. הנתיב שבו ה-Frontend יתחיל לפנות (מבפנים):
        // לדוגמה, במקום לפנות ל-https://run.app/user/login, נפנה ל- /api/user/login
        source: "/api/:path*",

        // 2. הכתובת האמיתית של השרת שלך בגוגל קלאוד
        // חובה לוודא שמשתנה הסביבה NEXT_PUBLIC_SERVER_URL מוגדר ב-Vercel/env.local
        destination: `${urlConnector}:path*`,
      },
    ];
  },
};

// הפונקציה המעודכנת מופעלת על nextConfig
export default withNextIntl(nextConfig);
