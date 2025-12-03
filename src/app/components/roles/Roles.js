// roles.js
"use client";
import React, { useEffect, useState } from "react";
import RolesList from "./RolesList";
import RoleForm from "./RoleForm";
import { addRole, getAllRoles, deleteRole } from "../../database/role";
import Loader from "../Loader";
const Roles = () => {
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
    const result = await addRole(newRole.name, newRole.desc, newRole.numOfWorkers).catch(
      (error) => {
        alert(error.message);
      }
    );
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
    <div className="p-4 sm:p-8 flex-1 overflow-y-scroll">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Roles Management 🎭
          </h1>
          <p className="text-gray-600">
            View, add, or remove available job roles.
          </p>
        </div>
        {/* BUTTON TO ADD A NEW ROLE */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 px-6 py-3 bg-purple-600 text-white rounded-xl shadow-md 
            hover:bg-purple-700 transition-all duration-300 mt-4 sm:mt-0"
          >
            Add New Role
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
