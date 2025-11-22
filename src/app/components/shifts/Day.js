import { useState, useEffect } from "react";
import ShiftCard from "./ShiftCard";
import { getShiftsByDayId } from "../../database/shifts";
import Loader from "../Loader";

const Day = ({ id, date, dayName, workers, roles }) => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getShiftsByDayId(id).then((res) => {
      setShifts(res.shifts);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-gray-50 p-5 rounded-2xl shadow-lg border border-gray-200 mb-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        {date} {dayName}
      </h1>
      {loading && <Loader />}
      <div className="space-y-4">
        {shifts.map((shift) => (
          <ShiftCard
            key={shift.id}
            id={shift.id}
            type={shift.type}
            workers={workers}
            roles={roles}
          />
        ))}
      </div>
    </div>
  );
};

export default Day;
