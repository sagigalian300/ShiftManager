import React, { useEffect, useState } from "react";
import Day from "./Day";

const WeekCard = ({ workers, roles }) => {
  const [days, setDays] = useState([]);
  const [daysNames, setDaysNames] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  useEffect(() => {
    setDays(getNextWeekSundayToSaturday());
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

      days.push(`${day}/${month}/${year}`);
    }

    return days;
  };

  return (
    <div>
      {days.map((date, index) => (
        <Day key={index} date={date} dayName={daysNames[index]} workers={workers} roles={roles} />
      ))}
    </div>
  );
};

export default WeekCard;
