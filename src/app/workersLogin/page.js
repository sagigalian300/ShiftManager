"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { workerLogin } from "../../services/worker";

// --- START: Replacement for next/navigation.useSearchParams ---
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
// --- END ---

// --- Icons ---
const UserIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    fill="currentColor"
  >
    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
  </svg>
);

const LockIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    fill="currentColor"
  >
    <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
  </svg>
);
// --- END ---

const Page = () => {
  const router = useRouter();
  const searchParams = useClientSearchParams();
  const bossId = searchParams.get("boss_id");
  const weekId = searchParams.get("week_id");

  // State for Login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    workerLogin(username, password, bossId, weekId)
      .then((res) => {
        if (res.success) {
          // Navigate to WorkerShiftAssignments page
          router.push("/workersShiftAssignments");
        } else {
          setError("Invalid credentials. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("An error occurred during login.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      {/* Header and Key Display */}
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          Application Access
        </h1>

        {bossId && weekId ? (
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
            <p className="text-sm font-semibold text-purple-700">
              URL Parameter Detected:
            </p>
            <p className="text-xl font-mono text-purple-900 break-all">
              boss_id: {bossId}
              <br />
              week_id: {weekId}
            </p>
          </div>
        ) : (
          <p className="text-lg text-gray-500 bg-gray-100 p-4 rounded-xl">
            Missing parameters in URL.
          </p>
        )}
      </div>

      {/* Login Section */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border-t-4 border-purple-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <UserIcon className="mr-3 text-purple-600 w-6 h-6" /> Worker Login
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold transition-all shadow-md bg-purple-600 hover:bg-purple-700"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
