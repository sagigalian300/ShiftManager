import React, { useEffect } from "react";
import { useTranslations } from "use-intl";
import WorkersPicker from "../workers/WorkersPicker";

const ShiftRole = ({
  role,
  workers,
  index,
  setRolesWorkers,
  unSelectedWorkers,
  setUnSelectedWorkers,
  shiftAssignments,
}) => {
  const t = useTranslations("ShiftRole");
  const [selectedWorkers, setSelectedWorkers] = React.useState([]);

  useEffect(() => {
    if (!shiftAssignments || !role) return;

    const workersForRole = shiftAssignments
      .filter((assignment) => assignment.role_id === role.id)
      .flatMap((assignment) =>
        assignment.workers.map((worker) => ({
          ...worker,
          choosenRole: role.id, // add chosenRole field
        }))
      );

    setSelectedWorkers(workersForRole);

    setUnSelectedWorkers((prev) =>
      prev.filter(
        (worker) => !workersForRole.some((sel) => sel.id === worker.id)
      )
    );
  }, [shiftAssignments, role]);

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
        unSelectedWorkers={unSelectedWorkers}
        setUnSelectedWorkers={setUnSelectedWorkers}
      />
      <div className="text-gray-500 italic">
        {selectedWorkers.length === 0
          ? t("noWorkersAssigned")
          : `${selectedWorkers.length} ${t("workersAssigned")}`}
      </div>
    </div>
  );
};

export default ShiftRole;
