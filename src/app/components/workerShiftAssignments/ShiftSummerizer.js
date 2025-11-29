"use client";

import React from "react";

const ShiftSummerizer = ({ summary, onConfirm, onCancel }) => {
  if (!summary) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Confirm Availability
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Week starting:{" "}
            <span className="font-medium text-purple-700">
              {summary.weekStartDate || "N/A"}
            </span>
          </p>

          <div className="mt-4 space-y-3 max-h-72 overflow-auto">
            <div className="text-sm text-gray-600">
              Total selected shifts:{" "}
              <span className="font-medium text-gray-800">{summary.totalSelected}</span>
            </div>

            {summary.selectedByDay && summary.selectedByDay.length ? (
              summary.selectedByDay.map((day) => (
                <div
                  key={day.dayId}
                  className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-800">
                      {day.dateName ?? day.date}
                    </div>
                    <div className="text-xs text-gray-400">{day.date}</div>
                  </div>

                  <ul className="ml-2 list-disc list-inside text-sm text-gray-700">
                    {day.shifts.map((s) => (
                      <li key={s.id}>
                        {s.type === 0 ? "Morning" : "Evening"} — {s.start_time} —{" "}
                        {s.end_time} (id: {s.id})
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">No shifts selected.</div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-white flex items-center justify-end gap-3 border-t border-gray-100">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm && onConfirm(summary)}
            className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftSummerizer;