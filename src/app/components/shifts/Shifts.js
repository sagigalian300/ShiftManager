"use client";
import React, { useEffect, useState } from "react";
import Day from "./Day";
import { getAllWorkers } from "../../database/worker";
import { getAllRoles } from "../../database/role";
import Loader from "../Loader";
import WeekCard from "./WeekCard";

const Shifts = () => {
  const [workers, setWorkers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllWorkers().then((fetchedWorkers) => {
      setWorkers(fetchedWorkers.data);
    });

    getAllRoles().then((fetchedRoles) => {
      setRoles(fetchedRoles);
      setLoading(false);
    });

  }, []);


  return (
    <div className="flex flex-col w-full p-6 overflow-x-scroll">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shift</h1>
      {loading && <Loader />}
      <WeekCard workers={workers} roles={roles} />
    </div>
  );
};

export default Shifts;
