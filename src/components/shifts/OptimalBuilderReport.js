import React from "react";
import { useTranslations } from "use-intl";

// --- Icons ---
const CheckIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
      fill="currentColor"
    />
  </svg>
);

const CloseIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OptimalBuilderReport = ({ stats, setStatsForm }) => {
  const t = useTranslations("OptimalBuilderReport");

  if (!stats) return null;

  const {
    totalShifts = 0,
    totalAssignedSlots = 0,
    totalUnfilledSlots = 0,
    totalPrice = 0,
    assignedPerWorker = {},
  } = stats;

  const coverage =
    totalAssignedSlots + totalUnfilledSlots > 0
      ? (
          (totalAssignedSlots / (totalAssignedSlots + totalUnfilledSlots)) *
          100
        ).toFixed(1)
      : 0;

  const assignedWorkers = Object.entries(assignedPerWorker || {}).length;
  const maxAssignments =
    assignedWorkers > 0 ? Math.max(...Object.values(assignedPerWorker)) : 0;
  const minAssignments =
    assignedWorkers > 0 ? Math.min(...Object.values(assignedPerWorker)) : 0;

  return (
    // 1. Overlay: fixed position covering the screen
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      
      {/* 2. Modal Container: 
           - max-h-[90vh]: מגביל את הגובה ל-90% מהמסך כדי שלא יחתך
           - flex flex-col: מאפשר לנו לחלק את המודאל לכותרת-תוכן-פוטר
           - overflow-hidden: מסתיר חריגות מהעיגול של הפינות
      */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-100 flex flex-col max-h-[90vh]">
        
        {/* --- Header (Fixed) --- */}
        {/* flex-shrink-0 מונע מהכותרת להתכווץ */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100 flex-shrink-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-purple-400 flex items-center justify-center text-white shadow">
              <CheckIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
              <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
            </div>
          </div>
          <button
            onClick={() => setStatsForm(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Close"
          >
            <CloseIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* --- Content (Scrollable) --- */}
        {/* flex-1: תופס את כל המקום הפנוי
            overflow-y-auto: מאפשר גלילה רק בתוך החלק הזה
        */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Total Shifts */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="text-sm text-blue-700 font-medium">
                {t("totalShifts")}
              </div>
              <div className="text-3xl font-bold text-blue-900 mt-2">
                {totalShifts}
              </div>
            </div>

            {/* Assigned Slots */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="text-sm text-green-700 font-medium">
                {t("assignedSlots")}
              </div>
              <div className="text-3xl font-bold text-green-900 mt-2">
                {totalAssignedSlots}
              </div>
            </div>

            {/* Unfilled Slots */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
              <div className="text-sm text-orange-700 font-medium">
                {t("unfilledSlots")}
              </div>
              <div className="text-3xl font-bold text-orange-900 mt-2">
                {totalUnfilledSlots}
              </div>
            </div>

            {/* Coverage */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="text-sm text-purple-700 font-medium">
                {t("coverage")}
              </div>
              <div className="text-3xl font-bold text-purple-900 mt-2">
                {coverage}%
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4 border border-rose-200">
              <div className="text-sm text-rose-700 font-medium">
                {t("totalPrice")}
              </div>
              <div className="text-3xl font-bold text-rose-900 mt-2">
                {totalPrice}
              </div>
            </div>

            {/* Workers Assigned */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
              <div className="text-sm text-indigo-700 font-medium">
                {t("workersAssigned")}
              </div>
              <div className="text-3xl font-bold text-indigo-900 mt-2">
                {assignedWorkers}
              </div>
            </div>
          </div>

          {/* Load Balance */}
          {assignedWorkers > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertIcon className="w-5 h-5 text-amber-600" />
                {t("loadBalance")}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-gray-600">
                    {t("minAssignments")}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {minAssignments}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">
                    {t("avgAssignments")}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {(totalAssignedSlots / assignedWorkers).toFixed(1)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">
                    {t("maxAssignments")}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {maxAssignments}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Worker Details */}
          {Object.keys(assignedPerWorker).length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                {t("workerAssignments")}
              </h3>
              {/* הסרתי את max-h-48 כדי שהגלילה תהיה כללית של כל המודאל ולא גלילה בתוך גלילה */}
              <div className="space-y-2">
                {Object.entries(assignedPerWorker).map(([workerId, count]) => (
                  <div
                    key={workerId}
                    className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-200"
                  >
                    <span className="text-sm text-gray-700 font-medium">
                      {workerId.includes("(") ? "" : t("worker") + " "} 
                      {/* הוספתי תנאי קטן שאם יש כבר שם (מהקוד הקודם) לא יכתוב Worker פעמיים */}
                      {workerId}
                    </span>
                    <span className="inline-flex items-center justify-center w-7 h-7 bg-purple-600 text-white text-sm font-semibold rounded-full shadow-sm">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- Footer (Fixed) --- */}
        <div className="p-6 md:p-8 border-t border-gray-100 bg-white flex-shrink-0 z-10">
          <button
            onClick={() => setStatsForm(false)}
            className="w-full px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all shadow-md active:scale-[0.98]"
          >
            {t("done")}
          </button>
        </div>

      </div>
    </div>
  );
};

export default OptimalBuilderReport;