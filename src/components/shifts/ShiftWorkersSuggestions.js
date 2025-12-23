import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "use-intl";
import { getShiftWorkersSuggestions } from "../../services/shifts";
import Loader from "../UI/Loader";

const ShiftWorkersSuggestions = ({ shift_id, setSeeWorkerSuggestions }) => {
  const t = useTranslations("ShiftWorkersSuggestions");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const lastFetchedId = useRef(null);

  useEffect(() => {
    if (lastFetchedId.current === shift_id) return;
    lastFetchedId.current = shift_id;

    setLoading(true);
    getShiftWorkersSuggestions(shift_id)
      .then((data) => {
        setSuggestions(data?.suggestions ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [shift_id]);

  return (
    <div className="space-y-3 text-sm text-gray-800 mb-5">
      {loading && <Loader />}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-row justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {t("title")}
          </h3>
          <button
            onClick={() => setSeeWorkerSuggestions(false)}
            className="w-fit inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium shadow hover:bg-purple-700 transition"
          >
            {t("close")}
          </button>
        </div>

        {suggestions.length === 0 ? (
          <p className="text-gray-500 italic">{t("empty")}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {suggestions.map((worker) => (
              <div
                key={worker.id}
                className="flex items-center justify-center px-3 py-2 rounded-full bg-purple-50 text-purple-700 border border-purple-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <span className="font-semibold truncate">
                  {worker.username}
                </span>
                <span className="mx-1 text-purple-300">•</span>
                <span className="text-purple-600 truncate">
                  {worker.last_name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftWorkersSuggestions;
