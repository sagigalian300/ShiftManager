// roles.js
"use client";
import React, { useEffect, useState } from "react";
import RolesList from "../../../components/roles/RolesList";
import RoleForm from "../../../components/roles/RoleForm";
import { addRole, getAllRoles, deleteRole } from "../../../services/role";
import Loader from "../../../components/UI/Loader";
import { useTranslations } from "use-intl";

const Roles = () => {
  const t = useTranslations("Roles");
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRoles().then((fetchedRoles) => {
      setRoles(fetchedRoles);
      setLoading(false);
    });
  }, []);

  // Function to add a new role
  const handleAddRole = async (newRoleData) => {
    setLoading(true);
    addRole(newRoleData.name, newRoleData.description, newRoleData.numOfWorkers)
      .then((res) => {
        console.log("Role added:", res); // here the new id is hiding.
        setRoles([
          ...roles,
          {
            name: newRoleData.name,
            desc: newRoleData.description,
            id: res.data.id,
          },
        ]);
        setShowForm(false); // Hide the form after adding
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // Function to delete an existing role
  const handleDeleteRole = async (roleId) => {
    setLoading(true);
    deleteRole(roleId)
      .then((res) => {
        setRoles(roles.filter((role) => role.id !== roleId));
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="flex flex-col w-full p-2 pt-0">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{t("title")}</h1>
        </div>
        {/* BUTTON TO ADD A NEW ROLE */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-fit sm:w-auto px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
          >
            {t("add")}
          </button>
        )}
      </div>
      {/* ROLE FORM (ADD/EDIT) */}
      {showForm && (
        <RoleForm
          onSaveRole={handleAddRole}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading && <Loader />}
      {/* LIST OF ROLES */}
      {!showForm && (
        <RolesList
          roles={roles}
          onDeleteRole={handleDeleteRole}
          setRoles={setRoles}
        />
      )}
    </div>
  );
};

export default Roles;
