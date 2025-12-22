// RolesList.js
import React from "react";
import { useTranslations } from "use-intl";
import RoleCard from "./RoleCard";

const RolesList = ({ roles, onDeleteRole, setRoles }) => {
  const t = useTranslations("RolesList");

  return (
    <div className="space-y-4 mt-6">
      {roles.length === 0 ? (
        <p className="text-gray-500 italic">{t("empty")}</p>
      ) : (
        roles.map((role) => (
          <RoleCard key={role.id} role={role} onDelete={onDeleteRole} setRoles={setRoles} />
        ))
      )}
    </div>
  );
};

export default RolesList;