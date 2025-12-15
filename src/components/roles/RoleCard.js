import React from "react";
import { useTranslations } from "use-intl";
import { FaTrash, FaEdit } from "react-icons/fa";

const RoleCard = ({ role, onDelete }) => {
  const t = useTranslations("RoleCard");

  return (
    <div className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-5 md:items-center justify-between">
      
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
            title="Edit role"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
          >
            <FaEdit size={16} />
          </button>
          
          <button
            onClick={() => onDelete(role.id)}
            title="Delete role"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;