"use client";
import React, { useEffect, useState } from "react";
import { getAllWorkers } from "../../../services/worker";
import { getAllRoles } from "../../../services/role";
import Loader from "../../../components/UI/Loader";
import WeekCard from "../../../components/shifts/WeekCard";
import { addWeeklyShifts } from "../../../services/shifts";
import { getAllWeeks } from "../../../services/shifts";
import { useTranslations } from "next-intl";

const Shifts = () => {
  const t = useTranslations("Shifts");
  const [weeks, setWeeks] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const daysNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    setLoading(true);
    getAllWorkers().then((fetchedWorkers) => {
      setWorkers(fetchedWorkers.data);
    });

    getAllRoles().then((fetchedRoles) => {
      setRoles(fetchedRoles);
    });

    getAllWeeks().then((fetchedWeeks) => {
      console.log(fetchedWeeks.weeks);
      setWeeks(fetchedWeeks.weeks);
      setLoading(false);
    });
  }, []);

  const getNextWeekSundayToSaturday = () => {
    const days = [];
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ...
    // How many days until next Sunday?
    const daysUntilSunday = (7 - dayOfWeek) % 7 || 7;
    // Get next Sunday
    const nextSunday = new Date();
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    // Push next Sunday + the full week (Sun → Sat)
    for (let i = 0; i < 7; i++) {
      const date = new Date(nextSunday);
      date.setDate(nextSunday.getDate() + i);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();

      days.push({ date: `${year}-${month}-${day}`, name: daysNames[i] });
    }
    return days;
  };

  const handleCreateWeek = async () => {
    setLoading(true);
    const newDays = getNextWeekSundayToSaturday();

    const res = await addWeeklyShifts(newDays);
    const newWeekId = res.week_id;
    setWeeks([...weeks, { id: newWeekId }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full p-2 pt-0 overflow-x-scroll">
      <div className="flex flex-row justify-between items-center text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t("title")}</h1>
        <button
          onClick={handleCreateWeek}
          className="w-fit sm:w-auto px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
        >
          {t("createWeek")}
        </button>
      </div>
      {loading && <Loader />}
      {weeks.map((week, index) => (
        <WeekCard
          week_id={week.id}
          key={index}
          workers={workers}
          roles={roles}
          daysNames={daysNames}
        />
      ))}
    </div>
  );
};

export default Shifts;
