"use client";

import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

// 1. Accept 'languages' as a prop, default to ["en", "he"] if not provided
const LanguageSwitcher = ({ languages = ["en", "he"] }) => {
  const t = useTranslations("LanguageSwitcher");

  const switchLanguage = (lang) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 text-sm bg-white/10 rounded-xl mb-2">
      <div className="flex items-center gap-2">
        <Globe size={18} />
        <span>{t("language")}</span>
      </div>

      <div className="flex bg-purple-900/50 rounded-lg p-1">
        {/* 2. Map over the languages array */}
        {languages.map((lang, index) => (
          <Fragment key={lang}>
            <button
              onClick={() => switchLanguage(lang)}
              className="px-2 py-1 rounded hover:bg-white/20 transition text-xs font-bold uppercase"
            >
              {/* Ensure your translation files have keys for all languages (e.g., "ar", "fr") */}
              {t(lang)}
            </button>

            {/* 3. Render the separator only if this is NOT the last item */}
            {index < languages.length - 1 && (
              <div className="w-[1px] bg-white/20 mx-1"></div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;