import React from "react";
import { useTranslations } from "use-intl";
import { FaTrash, FaEdit } from "react-icons/fa";
import { LuBriefcase } from "react-icons/lu";

const RoleCard = ({ role, onDelete }) => {
  const t = useTranslations("RoleCard");

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_88px_auto] items-center gap-4 p-4 bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
      <div className="flex items-start gap-4 min-w-0 justify-between items-center">
        <div className="min-w-0 flex flex-row items-center justify-center">
          <div className="flex-shrink-0 p-2">
            <LuBriefcase size={30} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {role.name}
            </h3>
            <p
              className="text-sm text-gray-600 mt-1 text-ellipsis overflow-hidden"
              style={{
                WebkitLineClamp: 2,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
              }}
            >
              {role.desc}
            </p>
          </div>

          {role.tags && role.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {role.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 bg-white/60 border border-gray-100 rounded-full text-gray-700"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* center: fixed-width stat column (always vertically centered) */}
      <div className="w-20 flex-shrink-0 text-center flex flex-col items-center justify-center">
        <div className="text-sm text-gray-500">{t("workers")}</div>
        <div className="text-lg font-semibold text-gray-800">
          {role.numOfWorkers ?? 0}
        </div>
      </div>

      {/* right: actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => onDelete(role.id)}
          title="Delete role"
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-shadow shadow-sm"
        >
          <span className="text-sm font-medium">{t("delete")} </span>
          <FaTrash />
        </button>
        <button
          // onClick={() => onDelete(role.id)}
          title="Edit role"
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-shadow shadow-sm"
        >
          <span className="text-sm font-medium">{t("edit")}</span> <FaEdit />
        </button>
      </div>
    </div>
  );
};

export default RoleCard;
