"use client";
import React, { useEffect, useState } from "react";
import { getAllWorkers } from "../../../services/worker";
import { getAllRoles } from "../../../services/role";
import Loader from "../../../components/UI/Loader";
import WeekCard from "../../../components/shifts/WeekCard";
import { addWeeklyShifts } from "../../../services/shifts";
import { getAllWeeks } from "../../../services/shifts";
import { useTranslations } from "next-intl";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Shifts = () => {
  const t = useTranslations("Shifts");
  const [weeks, setWeeks] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState(null);

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

  const generateWeekFromDate = (startDate) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();

      days.push({ date: `${year}-${month}-${day}`, name: daysNames[i] });
    }
    return days;
  };

  const handleCreateWeek = async (date) => {
    if (!date) return;

    setLoading(true);
    setSelectedDate(date);

    const newDays = generateWeekFromDate(date);

    try {
      const res = await addWeeklyShifts(newDays);
      const newWeekId = res.week_id;
      setWeeks([...weeks, { id: newWeekId }]);
    } catch (error) {
      console.error("Failed to create week", error);
      alert("Failed to create week. Please try again.");
    } finally {
      setLoading(false);
      setSelectedDate(null);
    }
  };

  const CustomButton = React.forwardRef(({ value, onClick }, ref) => (
    <button
      onClick={onClick}
      ref={ref}
      className="w-fit sm:w-auto px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
    >
      {t("createWeek")}
    </button>
  ));
  CustomButton.displayName = "CustomButton";

  const maxDateLimit = new Date();
  maxDateLimit.setMonth(maxDateLimit.getMonth() + 3);

  return (
    // 1. ADDED min-h-screen HERE
    <div className="flex flex-col w-full p-2 pt-0 overflow-x-scroll min-h-screen">
      <div className="flex flex-row justify-between items-center text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t("title")}</h1>

        <div className="relative z-20">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => handleCreateWeek(date)}
            filterDate={(date) => date.getDay() === 0}
            minDate={new Date()}
            maxDate={maxDateLimit}
            customInput={<CustomButton />}
            dateFormat="yyyy-MM-dd"
            popperPlacement="bottom-end"
            placeholderText={t("createWeek")}
            
            // 2. ADDED THIS PROP
            // This forces the popup to escape the overflow container
            popperProps={{
              strategy: "fixed",
            }}
          />
        </div>
      </div>

      {loading && <Loader />}

      {weeks.map((week, index) => (
        <WeekCard
          week_id={week.id}
          key={index}
          workers={workers}
          roles={roles}
          daysNames={daysNames}
          setWeeks={setWeeks}
        />
      ))}
    </div>
  );
};

export default Shifts;