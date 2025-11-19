import React, { useEffect } from "react";
import WorkersPicker from "../workers/WorkersPicker";
const ShiftRole = ({ role, workers, index, setRolesWorkers }) => {
  const [selectedWorkers, setSelectedWorkers] = React.useState([]);

  useEffect(() => {
    setRolesWorkers((prev) => {
      const copy = [...prev]; // shallow copy outer array
      copy[index] = selectedWorkers; // update inner array immutably
      return copy;
    });
  }, [selectedWorkers]);

  return (
    <div key={role.id}>
      <h1>{role.name}</h1>
      <WorkersPicker
        roleId={role.id}
        workers={workers}
        selectedWorkers={selectedWorkers}
        setSelectedWorkers={setSelectedWorkers}
      />
      <div className="text-gray-500 italic">
        {selectedWorkers.length === 0
          ? "No workers assigned yet..."
          : `${selectedWorkers.length} workers assigned`}
      </div>
    </div>
  );
};

export default ShiftRole;
