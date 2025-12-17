import React, { useEffect, useState } from "react";
import { getWorkersSuggestionsForWeek } from "../../services/workersAssignments";
import { useTranslations } from "use-intl";
import { HiSparkles, HiOutlineUserGroup } from "react-icons/hi";
import { FaRegCalendarAlt } from "react-icons/fa";
import Loader from "../UI/Loader";

const WorkersSuggestionsDisplay = ({ weekId, setShowWorkersSuggestions }) => {
  const t = useTranslations("WorkersSuggestionsDisplay");
  const [suggestions, setSuggestions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWorkersSuggestionsForWeek(weekId).then((response) => {
      if (response.success) {
        setSuggestions(response.data);
      }
      setLoading(false);
    });
  }, [weekId]);

  return (
    <div className="fixed inset-0 z-[60] bg-black bg-opacity-60 flex justify-center items-start pt-10 pb-10 overflow-hidden">
      <div className="bg-gray-50 w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col mx-4 max-h-full">
        
        {/* Header */}
        <div className="p-6 border-b bg-white rounded-t-3xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <HiSparkles size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t("title")}</h2>
              <p className="text-sm text-gray-500">{t("subtitle")}</p>
            </div>
          </div>
          <button
            onClick={() => { setShowWorkersSuggestions(false); }}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all font-medium"
          >
            {t("close")}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader />
              <p className="mt-4 text-gray-500 font-medium">{t("loading")}</p>
            </div>
          ) : Object.keys(suggestions).length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <HiOutlineUserGroup size={48} className="mx-auto mb-4 opacity-20" />
              <p>{t("noSuggestions")}</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(suggestions).map(([workerName, shifts]) => (
                <div key={workerName} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-4 border-b pb-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                      {workerName.charAt(0)}
                    </div>
                    <h3 className="font-bold text-gray-700 text-lg">{workerName}</h3>
                    <span className="mr-auto text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">
                      {shifts.length} {t("shiftsCount")}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {shifts.map((shift, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-50">
                        <div className="flex items-center gap-3">
                          <FaRegCalendarAlt className="text-gray-400 text-sm" />
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {t(shift.date_name.toLowerCase())} ({shift.date})
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                          shift.type === 0 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-purple-100 text-purple-700"
                        }`}>
                          {shift.type === 0 ? t("morning") : t("evening")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t rounded-b-3xl text-center">
          <p className="text-xs text-gray-400">
            {t("footerNote")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkersSuggestionsDisplay;