import React, { useEffect, useState } from "react";
import {useTranslations} from "use-intl";

const WorkersPicker = ({
  roleId,
  workers,
  selectedWorkers,
  setSelectedWorkers,
  unSelectedWorkers,
  setUnSelectedWorkers,
}) => {
  const t = useTranslations("WorkersPicker");

  const handleSelect = (e) => {
    const selectedWorkerId = Number(e.target.value);
    const workerObj = workers.find((w) => w.id === selectedWorkerId);
    workerObj["choosenRole"] = roleId;

    setUnSelectedWorkers((prev) =>
      prev.filter((w) => w.id !== selectedWorkerId)
    );

    if (workerObj && !selectedWorkers.some((w) => w.id === workerObj.id)) {
      setSelectedWorkers([...selectedWorkers, workerObj]);
    }

    e.target.value = ""; // reset select box
  };

  const handleRemove = (idToRemove) => {
    setSelectedWorkers(selectedWorkers.filter((w) => w.id !== idToRemove));
    const workerObj = workers.find((w) => Number(w.id) === Number(idToRemove));
    setUnSelectedWorkers((prev) => [...prev, workerObj]);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 transition-all border border-gray-200">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">{t("workers")}</h2>

      {/* Select Box */}
      <select
        className="border border-gray-300 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        onChange={handleSelect}
        defaultValue=""
      >
        <option value="" disabled>
          {t("selectWorker")}
        </option>
        {unSelectedWorkers.map((worker) => (
          <option key={worker.id} value={worker.id}>
            {worker.first_name} {worker.last_name}
          </option>
        ))}
      </select>

      {/* Chosen workers list */}
      {selectedWorkers.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedWorkers.map((worker) => (
            <div
              key={worker.id}
              className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
            >
              <span>
                {worker.first_name} {worker.last_name}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(worker.id)}
                className="ml-2 text-red-500 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkersPicker;
