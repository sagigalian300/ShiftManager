import React, { useEffect, useState } from "react";

const AddWorker = ({ roles, handleAddWorker, newWorker, setNewWorker }) => {
  // Add role from select box
  const handleRoleSelect = (e) => {
    const selectedRoleId = Number(e.target.value);
    const roleObj = roles.find((r) => r.id === selectedRoleId);
    if (roleObj && !newWorker.roles.some((r) => r.id === roleObj.id)) {
      setNewWorker({
        ...newWorker,
        roles: [...newWorker.roles, roleObj],
      });
    }
    e.target.value = ""; // reset select box
  };

  // Remove role from chosen list
  const handleRemoveRole = (roleIdToRemove) => {
    setNewWorker({
      ...newWorker,
      roles: newWorker.roles.filter((r) => r.id !== roleIdToRemove),
    });
  };

  // Generic handler for input changes
  const handleChange = (field) => (e) => {
    setNewWorker({ ...newWorker, [field]: e.target.value });
  };

  return (
    <form
      onSubmit={handleAddWorker}
      className="bg-white shadow-lg rounded-2xl p-6 mb-6 space-y-4 transition-all"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Row 1: Name Fields */}
        <input
          type="text"
          placeholder="First Name"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={newWorker.first_name}
          onChange={handleChange("first_name")}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={newWorker.last_name}
          onChange={handleChange("last_name")}
        />

        {/* Row 2: Contact Fields */}
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={newWorker.email}
          onChange={handleChange("email")}
        />
        <input
          type="text"
          placeholder="Phone"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={newWorker.phone}
          onChange={handleChange("phone")}
        />

        {/* NEW FIELD: Password */}
        <input
          required
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={newWorker.password || ""} // Use || "" to handle undefined state gracefully
          onChange={handleChange("password")}
        />

        {/* NEW FIELD: Rank */}
        <input
          required
          type="number"
          placeholder="Rank"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={newWorker.rank || ""} // Use || "" to handle undefined state gracefully
          onChange={handleChange("rank")}
        />
        
        {/* Row 3 (Cont.): Salary Field */}
        <input
          required
          type="number"
          placeholder="Salary per hour (₪)"
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={newWorker.salary}
          onChange={handleChange("salary")}
        />

        {/* Row 3 (Cont.): Role Select */}
        <select
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleRoleSelect}
          defaultValue=""
        >
          <option value="" disabled>
            Select a role
          </option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

      </div>

      {/* Chosen roles display */}
      {newWorker.roles.length > 0 && (
        <div className="mt-2">
          <p className="font-medium mb-1">Chosen Roles:</p>
          <div className="flex flex-wrap gap-2">
            {newWorker.roles.map((role) => (
              <div
                key={role.id}
                className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{role.name}</span>
                <button
                  type="button"
                  className="ml-2 text-red-500 font-bold"
                  onClick={() => handleRemoveRole(role.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full sm:w-auto mt-4 px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
      >
        Add Worker
      </button>
    </form>
  );
};

export default AddWorker;