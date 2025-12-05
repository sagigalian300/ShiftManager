import React, { useEffect, useState } from "react";
import Day from "./Day";
import {
  computeOptimalAssignment,
  getDaysByWeekId,
  getEncryptedBossAndWeek,
} from "../../database/shifts";
import Loader from "../Loader";
import { selfDomain } from "../../selfDomain";
import OptimalBuilderReport from "./OptimalBuilderReport";

const IconCalendar = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M16 3v4M8 3v4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconLink = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" className="w-4 h-4">
    <path
      d="M10 14a4 4 0 0 1 0-5.657l1-1a4 4 0 1 1 5.657 5.657l-1 1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 10a4 4 0 0 1 0 5.657l-1 1a4 4 0 1 1-5.657-5.657l1-1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WeekCard = ({ workers, roles, week_id }) => {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [encryptedBoss, setEncryptedBoss] = useState("");
  const [encryptedWeek, setEncryptedWeek] = useState("");
  const [editingManually, setEditingManually] = useState(false);
  const [statsForm, setStatsForm] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (open) {
      setLoading(true);

      getEncryptedBossAndWeek(week_id)
        .then((res) => {
          setEncryptedBoss(res.encryptedBoss);
          setEncryptedWeek(res.encryptedWeek);
        })
        .finally(() => {
          setLoading(false);
        });

      getDaysByWeekId(week_id).then((fetchedDays) => {
        setDays(fetchedDays.days);
        setLoading(false);
      });
    }
  }, [open]);

  const startDate = days?.[0]?.date
    ? new Date(days[0].date).toLocaleDateString()
    : "N/A";
  const endDate =
    days && days.length > 0
      ? new Date(days[days.length - 1].date).toLocaleDateString()
      : "N/A";

  const assignUrl = `${selfDomain}workersLogin?boss_id=${encryptedBoss}&week_id=${encryptedWeek}`;

  return (
    <div className="w-full">
      {open ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 mb-6 transition-transform transform">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white shadow-lg">
                <IconCalendar />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Week Overview
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {startDate} — {endDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 border hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-700 shadow-sm hover:shadow-md transition"
              title="View week"
            >
              View
            </button>

            <a
              href={assignUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition"
            >
              <IconLink className="text-white" /> Assign shifts
            </a>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium shadow hover:bg-purple-700 transition"
              title="Edit Manually"
              onClick={() => setEditingManually(!editingManually)}
            >
              Edit Manually
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 text-white text-sm font-medium shadow hover:from-rose-600 hover:to-orange-500 transition"
              title="Smart Creation"
              onClick={() => {
                setStatsForm(true);
                setLoading(true);
                computeOptimalAssignment(week_id).then((res) => {
                  setStats(res.details.stats);
                  setLoading(false);
                });
              }}
            >
              Smart Creation
            </button>

            {loading && <Loader />}
          </div>
          {statsForm && (
            <OptimalBuilderReport stats={stats} setStatsForm={setStatsForm} />
          )}
          {editingManually && (
            <div className="border-t border-gray-100 pt-4">
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader />
                </div>
              ) : (
                <div className="flex gap-3 overflow-x-auto py-2 pb-3">
                  {days && days.length > 0 ? (
                    days.map((day, index) => (
                      <div key={day.id || index} className="min-w-[220px]">
                        <Day
                          id={day.id}
                          date={day.date}
                          dayName={day.name || day.date_name}
                          workers={workers}
                          roles={roles}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 px-4">
                      No days found for this week.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div
          className="flex flex-row justify-between items-center bg-gradient-to-r from-white to-purple-50 rounded-2xl shadow-lg p-6 mb-6
             border border-gray-200 hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white shadow">
              <IconCalendar />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Week Overview
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {startDate} — {endDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="m-2 px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
            >
              Open
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekCard;
