"use client";
import { useEffect, useState } from "react";
import {
  addWorkerSuggestedAssignment,
  getWeekToAssignTo,
} from "../database/workersAssignments";
import Loader from "../components/Loader";
import ShiftSummerizer from "../components/workerShiftAssignments/ShiftSummerizer";

const SunIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.64 5.64L4.22 4.22M19.78 19.78l-1.41-1.41M5.64 18.36L4.22 19.78M19.78 4.22l-1.41 1.41"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const MoonIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Page = () => {
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

  const formatDate = (d) => {
    if (!d) return "";
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return d;
    }
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

    // show summary UI instead of console.log
    setSummary(newSummary);
  };

  const handleConfirm = (finalSummary) => {
    console.log("Confirmed availability:", finalSummary);

    addWorkerSuggestedAssignment(finalSummary)
      .then(() => {
        alert("Your availability has been submitted successfully.");
      })
      .catch(() => {
        alert(
          "There was an error submitting your availability. Please try again."
        );
      });

    setSummary(null);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-purple-50/40 to-white">
      {loading && <Loader />}

      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Workers Shift Assignments
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Week starting:{" "}
              <span className="font-medium text-purple-700">
                {formatDate(weekStartDate) || "N/A"}
              </span>
            </p>
          </div>

          <div className="inline-flex items-center gap-3">
            <div className="text-xs text-gray-500">Legend:</div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-xs font-semibold shadow-sm">
                <SunIcon className="w-4 h-4" />
              </span>
              <div className="text-sm text-gray-700">Morning</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white text-xs font-semibold shadow-sm">
                <MoonIcon className="w-4 h-4" />
              </span>
              <div className="text-sm text-gray-700">Evening</div>
            </div>
          </div>
        </div>
        <div className="m-5">
          <h1 className="flex items-center gap-4 text-2xl md:text-3xl font-extrabold text-gray-900">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-purple-400 text-white text-lg shadow">
              {workerName ? workerName.charAt(0).toUpperCase() : "W"}
            </span>
            <span>
              Hello{" "}
              <span className="text-purple-600">
                {workerName || "Worker"}
              </span>
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Pick the shifts you're available for this week.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {days.map((day) => (
            <article
              key={day.dayId}
              className="flex flex-col bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition"
            >
              <header className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {day.dayName ?? day.dateName ?? formatDate(day.date)}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(day.date)}
                  </p>
                </div>
                <div className="text-sm text-gray-400" />
              </header>

              <div className="flex-1 space-y-3">
                {(day.shifts || []).map((shift) => {
                  const id = shift.shift_id ?? shift.id;
                  const isMorning = Number(shift.type) === 0;
                  const checked = !!availability[id];

                  return (
                    <label
                      key={id}
                      htmlFor={`shift-${id}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-white to-purple-50 border border-gray-100 hover:bg-purple-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white text-sm font-semibold shadow-sm flex-none ${
                            isMorning ? "bg-purple-600" : "bg-rose-500"
                          }`}
                        >
                          {isMorning ? (
                            <SunIcon className="w-5 h-5" />
                          ) : (
                            <MoonIcon className="w-5 h-5" />
                          )}
                        </span>

                        <div>
                          <div className="text-sm font-medium text-gray-800">
                            {isMorning ? "Morning" : "Evening"}
                            <span className="text-xs text-gray-500 ml-2">
                              ({shift.start_time} - {shift.end_time})
                            </span>
                          </div>
                          <div className="text-xs text-gray-400">
                            Shift ID: {id}
                          </div>
                        </div>
                      </div>

                      <div className="relative flex items-center">
                        {/* native checkbox covers toggle area so clicks reach input */}
                        <input
                          id={`shift-${id}`}
                          name={`shift-${id}`}
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleShift(id)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          aria-label={`Can work shift ${id}`}
                        />

                        {/* custom toggle visuals */}
                        <div
                          role="switch"
                          tabIndex={0}
                          aria-checked={checked}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              toggleShift(id);
                            }
                          }}
                          className={`w-12 h-7 flex items-center p-1 rounded-full transition-colors ${
                            checked ? "bg-purple-600" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform ${
                              checked ? "translate-x-5" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </label>
                  );
                })}

                {(!day.shifts || day.shifts.length === 0) && (
                  <div className="text-sm text-gray-400">
                    No shifts for this day
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Send button */}
        <div className="max-w-6xl mx-auto mt-6 flex justify-end">
          <button
            onClick={handleSend}
            disabled={totalSelected === 0}
            className={`px-6 py-2 rounded-full font-semibold transition-shadow ${
              totalSelected > 0
                ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Send Availability ({totalSelected})
          </button>
        </div>
      </div>

      {/* Summary modal */}
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
