import { useState } from "react";

const EditWorkerCard = ({ worker, roles, onSave, setEditing }) => {
  const [firstName, setFirstName] = useState(worker.first_name);
  const [lastName, setLastName] = useState(worker.last_name);
  const [email, setEmail] = useState(worker.email || "");
  const [phone, setPhone] = useState(worker.phone);
  const [salary, setSalary] = useState(worker.salary);

  // NEW: State for Password (blank, so user only enters if changing it)
  const [password, setPassword] = useState("");
  
  // NEW: State for Rank
  const [rank, setRank] = useState(worker.rank);

  // 1. Initialize with role objects (worker.roles already contains objects)
  const [selectedRoles, setSelectedRoles] = useState(worker.roles);

  const toggleRole = (roleToToggle) => {
    setSelectedRoles((prev) => {
      // Check if the role ID is already selected
      const isSelected = prev.some((r) => r.id === roleToToggle.id);

      if (isSelected) {
        // Remove the role object
        return prev.filter((r) => r.id !== roleToToggle.id);
      } else {
        // Add the new role object
        return [...prev, roleToToggle];
      }
    });
  };

  const saveChanges = () => {
    // 2. Check if at least one role is selected
    if (selectedRoles.length > 0) {
      // 3. Pass the role objects to onSave, including the new fields
      onSave({
        worker_id: worker.id,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        salary,
        password, 
        rank, 
        updatedRoles: selectedRoles,
      });

      setEditing(false);
    } else {
      alert("Worker must have at least one role.");
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start pt-20">
        <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 mx-4 overflow-y-auto max-h-[80vh]">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Edit Worker – {worker.first_name} {worker.last_name}
            </h2>

            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
            >
              Close
            </button>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Standard Fields (Name, Contact) */}
            <input
              type="text"
              className="border border-gray-300 rounded-xl p-3"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              className="border border-gray-300 rounded-xl p-3"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              type="email"
              className="border border-gray-300 rounded-xl p-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              className="border border-gray-300 rounded-xl p-3"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* NEW FIELD: Password */}
            <input
              type="password"
              className="border border-gray-300 rounded-xl p-3"
              placeholder="Change Password (leave blank if no change) 🔒💰"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {/* NEW FIELD: Rank */}
            <input
              type="number"
              className="border border-gray-300 rounded-xl p-3"
              placeholder="Rank 🥇💰"
              value={rank}
              onChange={(e) => setRank(Number(e.target.value))}
            />

            {/* Salary Field */}
            <input
              type="number"
              className="border border-gray-300 rounded-xl p-3"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
            />
          </div>

          {/* Roles section */}
          <h3 className="text-lg font-semibold mb-3">Roles</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {roles.map((role) => (
              <button
                key={role.id}
                // 4. Pass the entire role object to toggleRole
                onClick={() => toggleRole(role)}
                className={`px-3 py-2 rounded-full text-sm transition-all border 
                  ${
                    // 5. Check if the role ID is present in the selectedRoles array of objects
                    selectedRoles.some((r) => r.id === role.id)
                      ? "bg-purple-600 text-white border-purple-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }
                `}
              >
                {role.name}
              </button>
            ))}
          </div>

          {/* Save button */}
          <button
            onClick={saveChanges}
            className="mt-6 w-full sm:w-auto px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWorkerCard;