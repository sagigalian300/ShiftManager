"use client";

import { useEffect, useState } from "react";
import {
  addWorkerSuggestedAssignment,
  getWeekToAssignTo,
} from "../../services/workersAssignments";
import Loader from "../../components/UI/Loader";
import ShiftSummerizer from "../../components/workerShiftAssignments/ShiftSummerizer";
import LanguageSwitcher from "../../components/UI/LanguageSwitcher";
import { useTranslations } from "use-intl";

// 1. Import React Icons (Added FiGlobe)
import {
  FiSun,
  FiMoon,
  FiCalendar,
  FiCheckCircle,
  FiUser,
  FiSend,
  FiClock,
  FiGlobe,
} from "react-icons/fi";

const Page = () => {
  const t = useTranslations("workersShiftAssignments");

  const [weekStartDate, setWeekStartDate] = useState("");
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState({}); // { [shiftId]: boolean }
  const [summary, setSummary] = useState(null);
  const [workerName, setWorkerName] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getWeekToAssignTo()
      .then((res) => {
        if (!mounted) return;
        const payload = res?.data || res;
        setWorkerName(res?.workerName || "");
        const receivedDays = payload?.days || [];
        setDays(receivedDays);
        setWeekStartDate(payload?.startDate || payload?.weekStartDate || "");

        // init availability map
        const map = {};
        receivedDays.forEach((d) => {
          (d.shifts || []).forEach((s) => {
            const id = s.shift_id ?? s.id;
            map[id] = false;
          });
        });
        setAvailability(map);
      })
      .catch((err) => {
        console.error("Failed to load week:", err);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const toggleShift = (shiftId) => {
    setAvailability((prev) => ({ ...prev, [shiftId]: !prev[shiftId] }));
  };

  const totalSelected = Object.values(availability).filter(Boolean).length;

  const handleSend = () => {
    const selectedByDay = days
      .map((day) => {
        const selectedShifts = (day.shifts || [])
          .filter((s) => availability[s.shift_id ?? s.id])
          .map((s) => ({
            id: s.shift_id ?? s.id,
            type: Number(s.type),
            start_time: s.start_time,
            end_time: s.end_time,
          }));
        return selectedShifts.length
          ? {
              dayId: day.dayId,
              date: day.date,
              dateName: day.dateName,
              shifts: selectedShifts,
            }
          : null;
      })
      .filter(Boolean);

    const newSummary = {
      weekStartDate,
      totalSelected,
      selectedByDay,
    };

    setSummary(newSummary);
  };

  const handleConfirm = (finalSummary) => {
    addWorkerSuggestedAssignment(finalSummary)
      .then(() => {
        alert("Success! Your shifts have been submitted.");
      })
      .catch(() => {
        alert("Error submitting availability. Please try again.");
      });

    setSummary(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 md:p-8 font-sans">
      {loading && <Loader />}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-purple-600 border border-gray-200">
                <FiUser className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                  {t("hello")},{" "}
                  <span className="text-purple-600">
                    {workerName || "Worker"}
                  </span>
                  !
                </h1>
                <p className="text-gray-500 text-sm">
                  {t("letsSetYourShifts")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            {/* --- NEW: Language Selector --- */}
            {/* <div className="flex items-center gap-2 text-gray-600 bg-white px-3 py-2 rounded-xl shadow-sm border border-gray-200">
                <FiGlobe className="text-purple-600" />
                <select 
                  onChange={handleLanguageChange} 
                  className="bg-transparent text-sm font-medium text-gray-600 outline-none cursor-pointer appearance-none pr-4"
                  defaultValue="en"
                >
                  <option value="en">English</option>
                  <option value="he">Hebrew</option>
                  <option value="ar">Arabic</option>
                </select>
             </div> */}
            <LanguageSwitcher languages={["en", "he", "ar"]} />

            {/* Week Display */}
            <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
              <FiCalendar className="text-purple-600" />
              <span className="text-sm font-medium">
                {t("weekStartsAt")}: {weekStartDate}
              </span>
            </div>
          </div>
        </header>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-24">
          {days.map((day) => (
            <div
              key={day.dayId}
              className="group bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {t(day.dateName.toLowerCase())}
                  </h2>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {day.date}
                  </p>
                </div>
              </div>

              {/* Shifts List */}
              <div className="space-y-4">
                {(day.shifts || []).map((shift) => {
                  const id = shift.shift_id ?? shift.id;
                  const isMorning = Number(shift.type) === 0;
                  const isSelected = !!availability[id];

                  return (
                    <button
                      key={id}
                      onClick={() => toggleShift(id)}
                      className={`w-full relative overflow-hidden flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 group/btn
                        ${
                          isSelected
                            ? isMorning
                              ? "bg-amber-50 border-amber-400 shadow-md shadow-amber-200/50 scale-[1.02]"
                              : "bg-indigo-50 border-indigo-500 shadow-md shadow-indigo-200/50 scale-[1.02]"
                            : "bg-white border-transparent hover:border-gray-200 hover:bg-gray-50 shadow-sm"
                        }
                      `}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        {/* Icon Box */}
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-colors duration-300
                            ${
                              isSelected
                                ? isMorning
                                  ? "bg-amber-400 text-white"
                                  : "bg-indigo-500 text-white"
                                : "bg-gray-100 text-gray-400 group-hover/btn:bg-white"
                            }
                          `}
                        >
                          {isMorning ? <FiSun /> : <FiMoon />}
                        </div>

                        {/* Text Info */}
                        <div className="text-left">
                          <h3
                            className={`font-bold text-sm ${
                              isSelected ? "text-gray-900" : "text-gray-600"
                            }`}
                          >
                            {isMorning ? "Morning Shift" : "Evening Shift"}
                          </h3>
                          <div
                            className={`flex items-center gap-1 text-xs mt-0.5 ${
                              isSelected ? "text-gray-600" : "text-gray-400"
                            }`}
                          >
                            <FiClock className="w-3 h-3" />
                            {shift.start_time} - {shift.end_time}
                          </div>
                        </div>
                      </div>

                      {/* Checkmark Circle */}
                      <div
                        className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                          ${
                            isSelected
                              ? isMorning
                                ? "border-amber-400 bg-amber-400"
                                : "border-indigo-500 bg-indigo-500"
                              : "border-gray-200 bg-transparent"
                          }
                      `}
                      >
                        <FiCheckCircle
                          className={`w-4 h-4 text-white transition-transform duration-300 ${
                            isSelected ? "scale-100" : "scale-0"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}

                {(!day.shifts || day.shifts.length === 0) && (
                  <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-2xl">
                    No shifts available
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Bar (Sticky Bottom) */}
      <div className="fixed bottom-0 left-0 w-full p-4 z-40 pointer-events-none flex justify-center">
        <div
          className={`pointer-events-auto bg-white/90 backdrop-blur-xl border border-gray-200 p-2 pr-2 pl-6 rounded-full shadow-2xl shadow-gray-400/20 mb-4 flex items-center gap-4 transition-all duration-500 transform
            ${
              totalSelected > 0
                ? "translate-y-0 opacity-100"
                : "translate-y-24 opacity-0"
            }
        `}
        >
          <div className="text-sm font-medium text-gray-600">
            <span className="font-bold text-purple-600 text-lg mr-1">
              {totalSelected}
            </span>
            {totalSelected === 1 ? "shift" : "shifts"} selected
          </div>

          <button
            onClick={handleSend}
            className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
          >
            <span>Confirm Availability</span>
            <FiSend />
          </button>
        </div>
      </div>

      {/* Summary Modal */}
      {summary && (
        <ShiftSummerizer
          summary={summary}
          onConfirm={handleConfirm}
          onCancel={() => setSummary(null)}
        />
      )}
    </div>
  );
};

export default Page;
