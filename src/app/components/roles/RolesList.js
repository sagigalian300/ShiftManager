// RolesList.js
import React from 'react';
import RoleCard from './RoleCard';

const RolesList = ({ roles, onDeleteRole }) => {
  return (
    <div className="space-y-4 mt-6">
      {roles.length === 0 ? (
        <p className="text-gray-500 italic">No roles available. Click "Add New Role" to create one.</p>
      ) : (
        roles.map((role) => (
          <RoleCard key={role.id} role={role} onDelete={onDeleteRole} />
        ))
      )}
    </div>
  );
};

export default RolesList;