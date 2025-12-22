import { useState } from "react";
import { useTranslations } from "use-intl";

const EditRole = ({ role, onSave, setEditing }) => {
  const t = useTranslations("EditRole");

  const [name, setName] = useState(role.name || "");
  const [desc, setDesc] = useState(role.desc || "");
  const [numOfWorkers, setNumOfWorkers] = useState(role.numOfWorkers ?? 0);

  const saveChanges = () => {
    if (!name.trim()) {
      alert(t("errorNoName"));
      return;
    }

    onSave({
      role_id: role.id,
      name: name.trim(),
      desc: desc.trim(),
      numOfWorkers,
    });

    setEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start pt-20">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 mx-4 overflow-y-auto max-h-[80vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {t("title")} – {role.name}
          </h2>

          <button
            onClick={() => setEditing(false)}
            className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
          >
            {t("close")}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            className="border border-gray-300 rounded-xl p-3"
            placeholder={t("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            min={0}
            className="border border-gray-300 rounded-xl p-3"
            placeholder={t("numOfWorkers")}
            value={numOfWorkers}
            onChange={(e) => setNumOfWorkers(Number(e.target.value))}
          />

          <textarea
            className="sm:col-span-2 border border-gray-300 rounded-xl p-3 min-h-[120px]"
            placeholder={t("description")}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <button
          onClick={saveChanges}
          className="mt-2 w-full sm:w-auto px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
        >
          {t("save")}
        </button>
      </div>
    </div>
  );
};

export default EditRole;
