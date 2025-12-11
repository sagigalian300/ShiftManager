"use client"; 
import { Globe } from "lucide-react"; 
import { useTranslations } from "next-intl";

const LanguageSwitcher = () => {
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
        <button
          onClick={() => switchLanguage("en")}
          className="px-2 py-1 rounded hover:bg-white/20 transition text-xs font-bold"
        >
          {t("en")}
        </button>
        <div className="w-[1px] bg-white/20 mx-1"></div>
        <button
          onClick={() => switchLanguage("he")}
          className="px-2 py-1 rounded hover:bg-white/20 transition text-xs font-bold"
        >
          {t("he")}
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;