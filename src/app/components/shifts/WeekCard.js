import React, { useEffect, useState } from "react";
import Day from "./Day";
import {
  getDaysByWeekId,
  getEncryptedBossAndWeek,
} from "../../database/shifts";
import Loader from "../Loader";
import { selfDomain } from "../../selfDomain";

const WeekCard = ({ workers, roles, week_id }) => {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [encryptedBoss, setEncryptedBoss] = useState("");
  const [encryptedWeek, setEncryptedWeek] = useState("");

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
            <div className="flex justify-center items-center w-full">
              {loading && <Loader />}
            </div>
          </div>
          <button
            className="mt-4 px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </button>

          <a
            href={`${selfDomain}workersLogin?boss_id=${encryptedBoss}&week_id=${encryptedWeek}`}
            target="_blank"
          >
            Click here to assign shifts
          </a>
        </div>
      ) : (
        <div
          className="flex flex-row justify-between items-center bg-white rounded-2xl shadow-lg p-6 mb-6
             border border-gray-200 hover:shadow-xl transition-all"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            Week Overview
          </h2>

          <button
            onClick={() => setOpen(true)}
            className="w-auto m-2 px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
          >
            Open
          </button>
        </div>
      )}
    </div>
  );
};

export default WeekCard;
