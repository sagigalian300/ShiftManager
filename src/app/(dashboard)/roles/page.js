// roles.js
"use client";
import React, { useEffect, useState } from "react";
import RolesList from "../../../components/roles/RolesList";
import RoleForm from "../../../components/roles/RoleForm";
import { addRole, getAllRoles, deleteRole } from "../../../services/role";
import Loader from "../../../components/UI/Loader";
import {useTranslations} from 'use-intl';

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
    // Generate a simple unique ID for the new role
    const newRole = {
      id: Date.now(), // Simple unique ID
      name: newRoleData.name,
      desc: newRoleData.description,
      numOfWorkers: newRoleData.numOfWorkers,
    };
    const result = await addRole(
      newRole.name,
      newRole.desc,
      newRole.numOfWorkers
    ).catch((error) => {
      alert(error.message);
    });
    setRoles([...roles, newRole]);
    setShowForm(false); // Hide the form after adding
  };

  // Function to delete an existing role
  const handleDeleteRole = async (roleId) => {
    const result = await deleteRole(roleId).catch((error) => {
      alert(error.message);
    });
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  return (
    <div className="flex flex-col w-full p-2 pt-0">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {t('title')}
          </h1>
          
        </div>
        {/* BUTTON TO ADD A NEW ROLE */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
                     className="w-fit sm:w-auto px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"

          >
            {t('add')}
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
      {!showForm && <RolesList roles={roles} onDeleteRole={handleDeleteRole} />}
    </div>
  );
};

export default Roles;
