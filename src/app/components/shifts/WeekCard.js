import React, { useEffect, useState } from "react";
import Day from "./Day";
import { getDaysByWeekId } from "../../database/shifts";
import Loader from "../Loader";
const WeekCard = ({ workers, roles, week_id }) => {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get days of week from DB
    if (open) {
      setLoading(true);
      getDaysByWeekId(week_id).then((fetchedDays) => {
        setDays(fetchedDays.days);
        setLoading(false);
      });
      console.log("fetching days for week_id:", week_id);
    }
  }, [open]);

  return (
    <div>
      {open ? (
        <div>
          <div className="flex flex-row overflow-x-scroll gap-2 p-1 m-1">
            {days.map((day, index) => (
              <Day
                id={day.id}
                key={index}
                date={day.date}
                dayName={day.name}
                workers={workers}
                roles={roles}
              />
            ))}
            <div className="flex justify-center items-center w-full">{loading && <Loader />}</div>
          </div>
          <button
            className="mt-4 px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </button>
        </div>
      ) : (
        <div
          onClick={() => setOpen(true)}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6 cursor-pointer 
             border border-gray-200 hover:shadow-xl transition-all"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Week Overview
          </h2>
        </div>
      )}
    </div>
  );
};

export default WeekCard;
