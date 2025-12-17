import { useState, useEffect } from "react";
import { useTranslations } from "use-intl";
import ShiftCard from "./ShiftCard";
import { getShiftsByDayId } from "../../services/shifts";
import Loader from "../UI/Loader";

const Day = ({ id, date, dayName, workers, roles }) => {
  const t = useTranslations("Day");
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
      <h1 className="text-xl font-bold text-gray-700">
        {date} 
      </h1>
      <h2>{t(dayName.toLowerCase())}</h2>
      {loading && <Loader />}
      <div className="space-y-4">
        {shifts.map((shift) => (
          <ShiftCard
            key={shift.id}
            id={shift.id}
            type={shift.type}
            workers={workers}
            roles={roles}
            setShifts={setShifts}
          />
        ))}
      </div>
    </div>
  );
};

export default Day;
