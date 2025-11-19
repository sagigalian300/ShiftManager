import React from "react";
import ShiftCard from "./ShiftCard";
import Workers from "../workers/Workers";

const Day = ({ date, dayName, workers, roles }) => {
  return (
    <div className="bg-gray-50 p-5 rounded-2xl shadow-lg border border-gray-200 mb-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">{date} {dayName}</h1>

      <div className="space-y-4">
        <ShiftCard type={0} workers={workers} roles={roles}/>
        <ShiftCard type={1} workers={workers} roles={roles}/>
      </div>
    </div>
  );
};

export default Day;
