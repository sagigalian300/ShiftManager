"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import AddWorker from "../../../components/workers/AddWorker";
import WorkerCard from "../../../components/workers/WorkerCard";
import { addWorker, delWorker, getAllWorkers } from "../../../services/worker";
import Loader from "../../../components/UI/Loader";
import { getAllRoles } from "../../../services/role";

export default function Workers() {
  const t = useTranslations("Workers");
  const [showForm, setShowForm] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avgSalary, setAvgSalary] = useState(0);
  const [roles, setRoles] = useState([]);
  const [newWorker, setNewWorker] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    rank: "",
    roles: [],
    salary: "",
    id: null,
  });

  useEffect(() => {
    getAllRoles().then((fetchedRoles) => setRoles(fetchedRoles));

    getAllWorkers()
      .then((fetchedWorkers) => {
        console.log(workers);
        setWorkers(fetchedWorkers.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddWorker = (e) => {
    e.preventDefault();
    if (newWorker.roles.length === 0) {
      alert("Please select at least one role for the worker.");
      return;
    }
    setLoading(true);
    addWorker(
      newWorker.first_name,
      newWorker.last_name,
      newWorker.email,
      newWorker.phone,
      newWorker.salary,
      newWorker.roles,
      newWorker.password,
      newWorker.rank
    ).then((res) => {
      console.log(res);

      setWorkers([...workers, { ...newWorker, id: res.newWorkerId }]);
      setNewWorker({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        roles: [],
        salary: "",
        password: "",
        rank: 0,
      });
      setShowForm(false);
      setLoading(false);
    });
  };

  const deleteWorker = (workerId) => {
    // delete localy
    setWorkers((prev) => prev.filter((worker) => worker.id != workerId));

    // delete from DB
    setLoading(true);
    delWorker(workerId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-3 pt-0 min-h-screen flex-1 overflow-x-scroll">
      {/* HEADER */}
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t("title")}</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="w-fit sm:w-auto px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all font-medium"
        >
          {showForm ? t("cancel") : t("add")}
        </button>
      </div>

      {/* SALARY ANALYSIS */}
      {!loading && (
        <div className="bg-white shadow-md rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              {t("salaryAnalysis")}
            </h2>
            <p className="text-gray-600">
              {t("avarageSalary")}:{" "}
              <span className="font-semibold text-purple-700">
                {avgSalary}₪
              </span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0 text-sm text-gray-500">
            {t("totalWorkers")}:{" "}
            <span className="font-semibold text-gray-700">
              {workers.length}
            </span>
          </div>
        </div>
      )}

      {/* ADD NEW WORKER FORM */}
      {showForm && (
        <AddWorker
          roles={roles}
          handleAddWorker={handleAddWorker}
          newWorker={newWorker}
          setNewWorker={setNewWorker}
        />
      )}

      {loading && <Loader />}
      {/* WORKERS LIST AS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map((worker, index) => (
          <WorkerCard
            key={index}
            worker={worker}
            setWorkers={setWorkers}
            roles={roles}
            deleteWorker={deleteWorker}
          />
        ))}
      </div>
    </div>
  );
}
