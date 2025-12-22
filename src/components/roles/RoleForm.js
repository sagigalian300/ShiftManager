// RoleForm.js
import React, { useState } from "react";
import { useTranslations } from "use-intl";

const RoleForm = ({ onSaveRole, onCancel }) => {
  const t = useTranslations("RoleForm");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [numOfWorkers, setNumOfWorkers] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return; // Basic validation
    
    onSaveRole({ name, description, numOfWorkers });
    setName("");
    setDescription("");
    setNumOfWorkers(0);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("title")}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-1">
            {t("nameLabel")}
          </label>
          <input
            type="text"
            id="roleName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder={t("namePlaceholder")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="roleDescription" className="block text-sm font-medium text-gray-700 mb-1">
            {t("descriptionLabel")}
          </label>
          <textarea
            id="roleDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder={t("descriptionPlaceholder")}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="numOfWorkers" className="block text-sm font-medium text-gray-700 mb-1">
            {t("numLabel")}
          </label>
          <input
            type="number"
            id="numOfWorkers"
            value={numOfWorkers}
            onChange={(e) => setNumOfWorkers(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder={t("numPlaceholder")}
            min="0"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition-colors duration-300"
          >
            {t("save")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;