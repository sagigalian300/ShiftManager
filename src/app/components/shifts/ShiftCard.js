import React, { useEffect, useState } from "react";
import ShiftRole from "./ShiftRole";

const ShiftCard = ({ type, workers, roles }) => {
  const [rolesWorkers, setRolesWorkers] = useState(
    Array.from({ length: roles.length }, () => [])
  );

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 border border-gray-200">
      {type == 0 ? (
        <div>
          <h1 className="text-xl font-semibold text-blue-600 mb-2">
            Morning Shift
          </h1>
        </div>
      ) : (
        <h1 className="text-xl font-semibold text-purple-600 mb-2">
          Evening Shift
        </h1>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {roles.map((role, index) => (
          <ShiftRole
            role={role}
            workers={workers}
            index={index}
            setRolesWorkers={setRolesWorkers}
            key={role.id}
          />
        ))}
      </div>

      <button
        onClick={() => {
          console.log(rolesWorkers);
        }}
        className="w-full sm:w-auto mt-4 px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
      >
        save
      </button>
    </div>
  );
};

export default ShiftCard;
