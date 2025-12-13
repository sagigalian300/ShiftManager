import React from "react";
import { FiCheckCircle, FiCalendar } from "react-icons/fi";
import { useTranslations } from "use-intl";

const SuccessPage = () => {
  const t = useTranslations("SuccessPage");

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 max-w-md w-full text-center relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-50 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm ring-8 ring-green-50/50">
            <FiCheckCircle className="w-10 h-10 text-green-500" />
          </div>

          {/* Text */}
          <h1 className="text-3xl font-extrabold text-gray-800 mb-3 tracking-tight">
            {t("title")}
          </h1>

          <p className="text-gray-500 text-sm md:text-base mb-8 leading-relaxed">
            {t("description")}
          </p>

          {/* Footer Status */}
          <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
            <FiCalendar />
            <span>{t("scheduleUpdated")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
