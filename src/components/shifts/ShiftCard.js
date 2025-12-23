import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import ShiftRole from "./ShiftRole";
import {
  addShiftAssignments,
  deleteShift,
  getShiftsAssignments,
} from "../../services/shifts";
import Loader from "../UI/Loader";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import ShiftWorkersSuggestions from "./ShiftWorkersSuggestions";
import { Sun, Moon } from "lucide-react";

const ShiftCard = ({ id, type, workers, roles, setShifts }) => {
  const t = useTranslations("ShiftCard");
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
      <div className="flex flex-col items-start mb-2 border-b border-gray-300 pb-2">
        <h1
          className={`text-xl font-semibold m-2 ${
            type === 0 ? "text-blue-600" : "text-purple-600"
          }`}
        >
          {type === 0 ? <Sun className="inline ml-2" /> : <Moon className="inline ml-2" />}
          {type === 0 ? t("morning") : t("evening")}
        </h1>
    
        <div className="flex flex-row gap-2 items-center justify-between">
          <button
            onClick={() => setOpen(!open)}
            className="w-fit inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium shadow hover:bg-purple-700 transition"
          >
            <MdOutlineModeEditOutline className="text-lg" />
            <span className="hidden md:inline mr-2">
              {open ? t("close") : t("open")}
            </span>
          </button>
          <button
            onClick={() => {
              setShifts((prev) => prev.filter((shift) => shift.id !== id));
              deleteShift(id)
                .then((res) => {
                  setLoading(true);
                })
                .catch((err) => {
                  console.log(err);
                  alert("Error deleting shift");
                });
            }}
            className="w-fit inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium shadow hover:bg-red-700 transition"
          >
            <MdDelete className="text-lg" />
            <span className="hidden md:inline mr-2">{t("delete")}</span>
          </button>
        </div>
      </div>

      {/* Closed state: empty */}
      {!open ? null : (
        // Full-screen modal overlay
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start pt-20">
          <div className="bg-white w-full max-w-6xl rounded-2xl shadow-lg p-6 mx-4 overflow-y-auto max-h-[80vh]">
            {/* Worker Suggestions for that shift */}

            {/* Modal header */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-semibold">
                {type === 0 ? t("morningShift") : t("eveningShift")}
              </h2>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setUnSelectedWorkers(workers);

                    setOpen(false);
                  }}
                  className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
                >
                  {t("close")}
                </button>
              </div>
            </div>
            <ShiftWorkersSuggestions shift_id={id} />
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
              {t("save")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftCard;
