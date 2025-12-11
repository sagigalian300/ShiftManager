"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "../../services/users";
// Importing icons - added FiUserPlus for the register context
import { FiUser, FiLock, FiUserPlus } from "react-icons/fi"; 
import Loader from "../../components/UI/Loader";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Client-side Validation
    if (!username.trim() || !password) {
      setError("Please fill all required fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      console.log("Register (UI):", { username, password });
      
      const res = await registerUser(username, password);

      // Check for specific backend message
      if (res.data && res.data.message === "Username already exists.") {
        setError("Username already exists.");
        setLoading(false);
        return;
      }

      // Success -> navigate to login
      router.push("/login");

    } catch (err) {
      console.error(err);
      setError("Registration error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. Background: Modern Soft Gradient with animated blobs (Exact match to Login)
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter opacity-30 animate-blob animation-delay-4000"></div>

      {/* 2. The Glass Card */}
      <div className="w-full max-w-md bg-white/70 shadow-2xl rounded-3xl p-8 border border-white/50 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 transform rotate-3">
            {/* Using FiUserPlus to signify Registration */}
            <FiUserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">
            Create Account
          </h1>
          <p className="text-sm text-gray-500">
            Join now to manage your shifts
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r shadow-sm animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          
          {/* Username Input */}
          <div className="group space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white focus:border-transparent transition-all shadow-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="group space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type="password"
                className="block w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white focus:border-transparent transition-all shadow-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="group space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type="password"
                className="block w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white focus:border-transparent transition-all shadow-sm"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="ml-2">Creating Account...</span>
            ) : (
              "Register"
            )}
          </button>
          
          {/* Your Custom Loader placement */}
          {loading && <Loader />}
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-semibold text-purple-600 hover:text-purple-500 hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}