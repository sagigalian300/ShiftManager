import { useTranslations } from "use-intl";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import EditRole from "./EditRole";
import { updateRole } from "../../services/role";

const RoleCard = ({ role, onDelete, setRoles }) => {
  const t = useTranslations("RoleCard");
  const [editing, setEditing] = useState(false);

  const handleUpdateRole = (updatedRole) => {
    updateRole(
      updatedRole.role_id,
      updatedRole.name,
      updatedRole.desc,
      updatedRole.numOfWorkers
    )
      .then((res) => {
        setRoles((prevRoles) =>
          prevRoles.map((r) =>
            r.id === updatedRole.role_id
              ? {
                  ...r,
                  name: updatedRole.name,
                  desc: updatedRole.desc,
                  numOfWorkers: updatedRole.numOfWorkers,
                }
              : r
          )
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-5 md:items-center justify-between">
      {editing && (
        <EditRole
          role={role}
          onSave={handleUpdateRole}
          setEditing={setEditing}
        />
      )}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 truncate tracking-tight">
            {role.name}
          </h3>
          <p
            className="text-sm text-gray-500 leading-relaxed"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {role.desc}
          </p>
        </div>

        {role.tags && role.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {role.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 bg-gray-50 text-gray-600 rounded-md border border-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 justify-between md:justify-end border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 mt-2 md:mt-0">
        <div className="flex flex-col items-center justify-center bg-blue-50/50 px-4 py-2 rounded-xl border border-blue-100 min-w-[80px]">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            {t("workers")}
          </span>
          <span className="text-xl font-bold text-gray-900">
            {role.numOfWorkers ?? 0}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing(true)}
            className="flex items-center space-x-2 px-4 py-1.5 text-sm rounded-full 
               bg-purple-600 text-white 
               hover:bg-purple-700 transition-all font-medium shadow-sm"
          >
            <FaEdit size={14} />
            <span>{t("edit")}</span>
          </button>

          <button
            onClick={() => onDelete(role.id)}
            title="Delete role"
            className="flex items-center space-x-2 px-4 py-1.5 text-sm rounded-full 
               bg-red-500 text-white 
               hover:bg-red-600 transition-all font-medium shadow-sm"
          >
            <FaTrash size={14} />
            <span>{t("delete")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
