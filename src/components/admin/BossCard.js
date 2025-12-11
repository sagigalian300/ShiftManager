import React, { useState } from "react";
import { getAllWorkersForBossId } from "../../services/admin";
import Loader from "../UI/Loader";
import WorkersTable from "./WorkersTable";

const BossCard = ({ id, username, roles }) => {
  const [workers, setWorker] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showWorkers, setShowWorkers] = useState(false);

  const handleViewWorkers = () => {
    if (showWorkers) {
      setShowWorkers(false);
      return;
    }
    setShowWorkers(true);
    setLoading(true);
    getAllWorkersForBossId(id)
      .then((res) => {
        setWorker(res.data);
        console.log("Workers for boss ID", id, ":", res);
      })
      .catch((error) => {
        console.error("Failed to fetch workers for boss ID", id, ":", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 max-w-xs border border-gray-200 flex flex-col gap-4 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold shrink-0">
          {username ? username[0].toUpperCase() : "B"}
        </div>
        <div className="flex flex-col">
          <h3 className="m-0 text-lg font-semibold text-gray-800 leading-tight">
            {username || "Unknown Boss"}
          </h3>
          <span className="text-xs text-gray-500 mt-0.5">ID: {id}</span>
        </div>
      </div>

      {/* Body */}
      <div className="py-2">
        <p className="mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Current Roles
        </p>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(roles) &&
            roles.map((role, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200"
              >
                {role}
              </span>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-100">
        <button
          onClick={handleViewWorkers}
          className="text-blue-500 text-sm font-semibold hover:text-blue-600 transition-colors"
        >
          {showWorkers ? "Hide Workers" : "View Workers"}
        </button>
        <div className="flex gap-2">
          <button className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors">
            Edit
          </button>
          <button className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-red-100 transition-colors">
            Delete
          </button>
        </div>
      </div>

      {loading && <Loader />}
      {/* Workers List */}
      {showWorkers && workers.length > 0 && <WorkersTable workers={workers} />}
    </div>
  );
};

export default BossCard;
