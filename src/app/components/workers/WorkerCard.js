import { useState } from "react";
import EditWorker from "./EditWorker";
import { updateWorkerDetails } from "../../database/worker";

const WorkerCard = ({ index, worker, setWorkers, roles }) => {
  const [editing, setEditing] = useState(false);

  const updateWorker = (updatedWorker) => {
    const {
      worker_id,
      first_name,
      last_name,
      email,
      phone,
      salary,
      updatedRoles,
    } = updatedWorker;

    // Find the worker in the local state
    const existingWorker = worker;
    // Compare changes
    const changed =
      existingWorker.first_name !== first_name ||
      existingWorker.last_name !== last_name ||
      existingWorker.email !== email ||
      existingWorker.phone !== phone ||
      existingWorker.salary !== salary ||
      JSON.stringify(existingWorker.roles.map((r) => r.id).sort()) !==
        JSON.stringify(updatedRoles.map((r) => r.id).sort());

    if (!changed) {
      console.log("No changes detected. Skipping update.");
      setEditing(false);
      return;
    }
    setWorkers((prev) =>
      prev.map((w) =>
        w.id === worker_id
          ? {
              ...w,
              first_name,
              last_name,
              email,
              phone,
              salary,
              roles: updatedRoles,
            }
          : w
      )
    );
    updateWorkerDetails(
      worker_id,
      first_name,
      last_name,
      email,
      phone,
      salary,
      updatedRoles
    )
      .then((res) => {
        console.log("DB updated", res);

        setEditing(false);
      })
      .catch((err) => {
        console.log("Error updating worker:", err);
      });
  };

  return (
    <div
      key={index}
      className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 
             hover:shadow-xl transition-all flex flex-col"
    >
      {editing && (
        <EditWorker
          worker={worker}
          roles={roles}
          onSave={updateWorker}
          setEditing={setEditing}
        />
      )}
      <div className="flex flex-col items-start mb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          {worker.first_name} {worker.last_name}
        </h2>
        <p className="text-gray-600 text-sm mt-1">📞 {worker.phone}</p>
        <p className="text-gray-700 font-medium mt-1">
          💰 Salary per hour:{" "}
          <span className="text-purple-700">{worker.salary}₪</span>
        </p>
        <p className="text-gray-600 text-sm mt-1">
          📧 {worker.email ? worker.email : "None"}
        </p>

        {/* Display multiple roles as tags */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          {worker.roles.map((role) => (
            <span
              key={role.id}
              className={
                "px-3 py-1 rounded-full text-center text-sm bg-gray-100 text-gray-600"
              }
            >
              {role.name}
            </span>
          ))}
        </div>
      </div>

      <br />
      <button
        className="mt-auto px-6 py-2 rounded-full bg-purple-600 text-white 
             hover:bg-purple-700 transition-all font-medium shadow-md"
        onClick={() => setEditing(true)}
      >
        Edit
      </button>
    </div>
  );
};

export default WorkerCard;
