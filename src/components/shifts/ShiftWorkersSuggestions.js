import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "use-intl";
import { getShiftWorkersSuggestions } from "../../services/shifts";
import Loader from "../UI/Loader";
import { Users } from "lucide-react"; // אופציונלי

const ShiftWorkersSuggestions = ({ shift_id }) => {
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

  if (loading) return <Loader />;

  return (
    <div className="mb-4 animate-in fade-in duration-300">
      <div className="bg-gray-50/50 border border-gray-200 rounded-lg p-3">
        {/* Header קומפקטי */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={16} className="text-purple-600" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t("title")}
            </span>
            <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {suggestions.length}
            </span>
          </div>
        </div>

        {/* רשימת עובדים כ-Chips */}
        {suggestions.length === 0 ? (
          <p className="text-xs text-gray-400 italic">{t("empty")}</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((worker) => (
              <div
                key={worker.id}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-gray-200 shadow-sm hover:border-purple-300 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> {/* אינדיקטור זמינות */}
                <span className="text-xs font-medium text-gray-700">
                  {worker.username} {worker.last_name}
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