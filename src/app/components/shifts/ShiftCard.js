import { useEffect, useState } from "react";
import ShiftRole from "./ShiftRole";
import {
  addShiftAssignments,
  getShiftsAssignments,
} from "../../database/shifts";
import Loader from "../Loader";

const ShiftCard = ({ id, type, workers, roles }) => {
  const [open, setOpen] = useState(false);
  const [rolesWorkers, setRolesWorkers] = useState(
    Array.from({ length: roles.length }, () => [])
  );
  const [unSelectedWorkers, setUnSelectedWorkers] = useState(workers);
  const [shiftAssignments, setShiftAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      getShiftsAssignments(id).then((res) => {
        setShiftAssignments(res.shift_assignments);
        setLoading(false);
      });
    }
  }, [open]);

  const handleSaveShift = () => {
    setLoading(true);
    const shift_data = { shift_id: id, shift_assignments: rolesWorkers };
    // console.log(shift_data);
    addShiftAssignments(shift_data)
      .then((res) => {
        setLoading(false);
        alert("Data saved successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* Shift header */}
      <div className="flex flex-row items-center mb-2">
        <h1
          className={`text-xl font-semibold m-2 ${
            type === 0 ? "text-blue-600" : "text-purple-600"
          }`}
        >
          {type === 0 ? "Morning Shift" : "Evening Shift"}
        </h1>

        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="w-full sm:w-auto m-2 px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
        >
          {open ? "Close" : "Open"}
        </button>
      </div>

      <h1>Shift with id = {id}</h1>

      {/* Closed state: empty */}
      {!open ? null : (
        // Full-screen modal overlay
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start pt-20">
          <div className="bg-white w-full max-w-6xl rounded-2xl shadow-lg p-6 mx-4 overflow-y-auto max-h-[80vh]">
            {/* Modal header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {type === 0 ? "Morning Shift" : "Evening Shift"}
              </h2>
              <button
                onClick={() => {
                  setUnSelectedWorkers(workers);

                  setOpen(false);
                }}
                className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
              >
                Close
              </button>
            </div>
                {loading && <Loader />}
            {/* Roles grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {roles.map((role, index) => (
                <ShiftRole
                  role={role}
                  workers={workers}
                  index={index}
                  setRolesWorkers={setRolesWorkers}
                  setUnSelectedWorkers={setUnSelectedWorkers}
                  unSelectedWorkers={unSelectedWorkers}
                  shiftAssignments={shiftAssignments}
                  key={role.id}
                />
              ))}
            </div>

            {/* Save button */}
            <button
              onClick={handleSaveShift}
              className="mt-6 w-full sm:w-auto px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftCard;
