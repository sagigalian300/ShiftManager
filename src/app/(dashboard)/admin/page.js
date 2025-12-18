"use client";
import React, { useEffect, useMemo, useState } from "react";
import { getAllBosses } from "../../../services/admin";
import Loader from "../../../components/UI/Loader";
import BossCard from "../../../components/admin/BossCard";

const Page = () => {
  const [bosses, setBosses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllBosses()
      .then((res) => {
        setBosses(res.data || []);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const stats = useMemo(() => {
    const total = bosses.length;
    const withRoles = bosses.filter(
      (b) => Array.isArray(b.roles) && b.roles.length
    ).length;
    return { total, withRoles };
  }, [bosses]);

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50/40 to-white p-6">
      {loading && <Loader />}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
              Admin
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Boss Management
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              Review all bosses, their roles, and quickly jump to worker views.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
            <button className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-semibold shadow hover:bg-purple-700 transition">
              Add Boss
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Bosses</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {stats.total}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">With Roles</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {stats.withRoles}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">No Roles</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {stats.total - stats.withRoles}
            </p>
          </div>
        </div>

        {/* Boss list */}
        {bosses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-800">
              No bosses found
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Add your first boss to get started.
            </p>
            <button className="mt-4 px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-semibold shadow hover:bg-purple-700 transition">
              Add Boss
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bosses.map((boss) => (
              <BossCard
                key={boss.id}
                id={boss.id}
                username={boss.username}
                roles={boss.roles}
                setBosses={setBosses}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
