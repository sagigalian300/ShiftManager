import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Day from "./Day";
import {
  computeOptimalAssignment,
  deleteWeek,
  getDaysByWeekId,
  getEncryptedBossAndWeek,
  getWeekDataForExcelDocument,
} from "../../services/shifts";
import Loader from "../UI/Loader";
import { selfDomain } from "../../utils/selfDomain";
import OptimalBuilderReport from "./OptimalBuilderReport";
import { downloadWeekAssignmentsExcel } from "../../utils/weekDataExcelDownloader";
import { LuFileSpreadsheet } from "react-icons/lu";
import { IoIosLink } from "react-icons/io";
import { MdDelete, MdOutlineModeEditOutline, MdSmartToy } from "react-icons/md";
import { BsCalendar2Week } from "react-icons/bs";
import VisualizeWholeWeek from "./VisualizeWholeWeek";
import { FaRegEye, FaLightbulb } from "react-icons/fa";
import { getWorkersSuggestionsForWeek } from "../../services/workersAssignments";
import WorkersSuggestionsDisplay from "../workerShiftAssignments/WorkersSuggestionsDisplay";

const WeekCard = ({ workers, roles, week_id, setWeeks }) => {
  const t = useTranslations("WeekCard");
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [encryptedBoss, setEncryptedBoss] = useState("");
  const [encryptedWeek, setEncryptedWeek] = useState("");
  const [editingManually, setEditingManually] = useState(false);
  const [seeWholeWeek, setSeeWholeWeek] = useState(false);
  const [statsForm, setStatsForm] = useState(false);
  const [stats, setStats] = useState(null);
  const [showWorkersSuggestions, setShowWorkersSuggestions] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const copyToastTimeout = useRef();

  useEffect(() => {
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
  }, []);

  useEffect(
    () => () => {
      if (copyToastTimeout.current) clearTimeout(copyToastTimeout.current);
    },
    []
  );

  const handleDeleteWeek = () => {
    setLoading(true);
    deleteWeek(week_id).then((res) => {
      console.log("Week deleted:", res);
      setWeeks((prevWeeks) => prevWeeks.filter((week) => week.id !== week_id));
      setLoading(false);
    });
  };

  const startDate = days?.[0]?.date
    ? new Date(days[0].date).toLocaleDateString()
    : "N/A";
  const endDate =
    days && days.length > 0
      ? new Date(days[days.length - 1].date).toLocaleDateString()
      : "N/A";

  const assignUrl = `${selfDomain}workersLogin?boss_id=${encryptedBoss}&week_id=${encryptedWeek}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(assignUrl);
      setLinkCopied(true);
      if (copyToastTimeout.current) clearTimeout(copyToastTimeout.current);
      copyToastTimeout.current = setTimeout(() => setLinkCopied(false), 2200);
    } catch (error) {
      console.error("Failed to copy link", error);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 mb-6 transition-transform transform">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-4">
              <BsCalendar2Week size={30} />

              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {t("title")}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {startDate} — {endDate}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 mt-3">
            <div className="flex flex-row items-center justify-center gap-3 mt-3">
              <button
                type="button"
                // Added w-full here
                className="w-fit inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-700 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                title="Export to Excel"
                onClick={() => {
                  getWeekDataForExcelDocument(week_id).then((data) => {
                    downloadWeekAssignmentsExcel(data.weekData);
                  });
                }}
              >
                <LuFileSpreadsheet />
                <h1 className="hidden md:block">{t("excel")}</h1>
              </button>

              <div className="relative">
                <button
                  type="button"
                  // Added w-full and justify-center here
                  className="w-fit inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition shadow-sm"
                  onClick={handleCopyLink}
                  title={t("link")}
                >
                  <IoIosLink />
                  <h1 className="hidden md:block">{t("link")}</h1>
                </button>
                {linkCopied && (
                  <div className="copy-toast absolute left-1/2 -translate-x-1/2 top-full mt-3 z-20 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs shadow-2xl ring-2 ring-purple-200/70 flex items-center gap-2">
                    <span
                      className="inline-block w-2 h-2 bg-purple-600 rotate-45 absolute -top-1 left-1/2 -translate-x-1/2"
                      aria-hidden="true"
                    />
                    <span className="font-semibold tracking-wide">
                      {t("linkCopied")}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="button"
                // Added w-full here
                className="w-fit inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-600 text-white text-sm font-medium shadow hover:bg-gray-700 transition"
                title="Edit Manually"
                onClick={() => setEditingManually(!editingManually)}
              >
                <MdOutlineModeEditOutline />
                <h1 className="hidden md:block">{t("edit")}</h1>
              </button>
            </div>
            <div className="flex flex-row items-center justify-center gap-3 mt-3">
              <button
                type="button"
                // Added w-full here
                className="w-fit inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition"
                title="See whole week visualization"
                onClick={() => setSeeWholeWeek(!seeWholeWeek)}
              >
                <FaRegEye />
                <h1 className="hidden md:block">{t("inspect")}</h1>
              </button>

              <button
                type="button"
                // Added w-full here
                className="w-fit inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-yellow-600 text-white text-sm font-medium shadow hover:bg-yellow-700 transition"
                title="Watch worker suggestions"
                onClick={() => setShowWorkersSuggestions((curr) => !curr)}
              >
                <FaLightbulb />
                <h1 className="hidden md:block">{t("suggestions")}</h1>
              </button>

              <button
                type="button"
                // Added w-full here
                className="w-fit inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 text-white text-sm font-medium shadow hover:from-rose-600 hover:to-orange-500 transition"
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
                <MdSmartToy />
                <h1 className="hidden md:block">{t("smartCreation")}</h1>
              </button>

              <button
                type="button"
                // Added w-full here
                className="w-fit inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium shadow hover:bg-red-700 transition"
                title="Delete"
                onClick={handleDeleteWeek}
              >
                <MdDelete />
                <h1 className="hidden md:block">{t("delete")}</h1>
              </button>
            </div>
          </div>
          {loading && <Loader />}

          {statsForm && (
            <OptimalBuilderReport stats={stats} setStatsForm={setStatsForm} />
          )}
          {showWorkersSuggestions && (
            <WorkersSuggestionsDisplay
              weekId={week_id}
              setShowWorkersSuggestions={setShowWorkersSuggestions}
            />
          )}
        </div>
        {seeWholeWeek && (
          <VisualizeWholeWeek
            week_id={week_id}
            onClose={() => setSeeWholeWeek(false)}
          />
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
    </>
  );
};

export default WeekCard;
