"use client";

import React, { useEffect, useState } from "react";
import AddWorker from "./AddWorker";
import WorkerCard from "./WorkerCard";
import { addWorker, getAllWorkers } from "../../database/worker";
import Loader from "../Loader";
import { getAllRoles } from "../../database/role";

export default function Workers() {
  const [showForm, setShowForm] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avgSalary, setAvgSalary] = useState(0);
  const [roles, setRoles] = useState([]);

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

  const [newWorker, setNewWorker] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    roles: [],
    salary: "",
  });

  const handleAddWorker = (e) => {
    e.preventDefault();
    if (newWorker.roles.length === 0) {
      alert("Please select at least one role for the worker.");
      return;
    }
    addWorker(
      newWorker.first_name,
      newWorker.last_name,
      newWorker.email,
      newWorker.phone,
      newWorker.salary,
      newWorker.roles
    );

    setWorkers([...workers, newWorker]);
    setNewWorker({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      roles: [],
      salary: "",
    });
    setShowForm(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex-1 overflow-x-scroll">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Workers</h1>
          <p className="text-gray-600">
            Manage your team and analyze salary performance.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-4 sm:mt-0 px-6 py-2 rounded-full bg-purple-600 text-white 
                     hover:bg-purple-700 transition-all font-medium shadow-md"
        >
          {showForm ? "Cancel" : "Add New Worker"}
        </button>
      </div>

      {/* SALARY ANALYSIS */}
      {!loading && (
        <div className="bg-white shadow-md rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Salary Analysis
            </h2>
            <p className="text-gray-600">
              Average salary per hour:{" "}
              <span className="font-semibold text-purple-700">
                {avgSalary}₪
              </span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0 text-sm text-gray-500">
            Total Workers:{" "}
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
          <WorkerCard key={index} worker={worker} setWorkers={setWorkers} roles={roles} />
        ))}
      </div>
    </div>
  );
}
