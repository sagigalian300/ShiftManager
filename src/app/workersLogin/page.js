"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { workerLogin } from "../../services/worker";
import Loader from "../../components/UI/Loader";

// 1. Import the icons from react-icons (using Feather icons for a modern look)
import { FiUser, FiLock } from "react-icons/fi"; 

const useClientSearchParams = () => {
  const [params, setParams] = useState(new URLSearchParams(""));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.search;
      setParams(new URLSearchParams(currentUrl));
    }
  }, []);

  return {
    get: (key) => params.get(key),
  };
};

const Page = () => {
  const router = useRouter();
  const searchParams = useClientSearchParams();
  const bossId = searchParams.get("boss_id");
  const weekId = searchParams.get("week_id");

  // State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await workerLogin(username, password, bossId, weekId);
      console.log("Login response:", res);

      if (res.success) {
        router.push("/workersShiftAssignments");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter opacity-30 animate-blob animation-delay-4000"></div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white/80 shadow-2xl rounded-3xl p-8 border border-white/50 relative z-10 transition-all duration-300 hover:shadow-purple-500/20">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 transform rotate-3">
            {/* Using React Icon here */}
            <FiUser className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Please access your shift assignments
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r shadow-sm animate-pulse">
            <p className="font-medium">Access Denied</p>
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Username */}
          <div className="group space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {/* React Icon in input */}
                <FiUser className="h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Enter your username"
                className="block w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white transition-all shadow-inner"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="group space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {/* React Icon in input */}
                <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="block w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white transition-all shadow-inner"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="ml-2">Signing in...</span>
              </>
            ) : (
              "Access Shifts"
            )}
          </button>
            {isLoading && <Loader />}
        </form>

        {/* Footer Text */}
        <p className="mt-8 text-center text-xs text-gray-400">
          Protected Area • Shift Management System
        </p>
      </div>
    </div>
  );
};

export default Page;