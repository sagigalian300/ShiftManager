// RoleCard.js
import React from 'react';

const RoleCard = ({ role, onDelete }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{role.name}</h3>
        <p className="text-gray-600 mt-1">{role.desc}</p>
      </div>
      <button
        onClick={() => onDelete(role.id)}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
      >
        Delete
      </button>
    </div>
  );
};

export default RoleCard;