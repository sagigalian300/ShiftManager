import React from "react";

const WorkerCard = ({ index, worker }) => {
  return (
    <div
      key={index}
      className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 
                       hover:shadow-xl transition-all"
    >
      <div className="flex flex-col items-start mb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          {worker.first_name} {worker.last_name}
        </h2>

        {/* Display multiple roles as tags */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          {worker.roles.map((role) => (
            <span
              key={role.id}
              className={"px-3 py-1 rounded-full text-center text-sm bg-gray-100 text-gray-600"}
            >
              {role.name}
            </span>
          ))}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-1">
        📧 {worker.email ? worker.email : "None"}
      </p>
      <p className="text-gray-600 text-sm mb-1">📞 {worker.phone}</p>
      <p className="text-gray-700 font-medium mt-2">
        💰 Salary per hour:{" "}
        <span className="text-purple-700">{worker.salary}₪</span>
      </p>
    </div>
  );
};

export default WorkerCard;
