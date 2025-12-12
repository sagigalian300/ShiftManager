// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // 1. Get the cookie we set in the Navbar
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"; // Default to 'en'

  return {
    locale,
    // 2. Load the message file.
    // We use "../../" to go up from src/i18n/ to the project root
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
