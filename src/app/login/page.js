"use client";

import { useState } from "react";
import { setCookie } from "cookies-next";
import { loginUser } from "../../services/users";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiUser, FiLock, FiCheck } from "react-icons/fi"; // Feather icons for the modern look
import Loader from "../../components/UI/Loader";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Attempting sign in with:", username);
      const data = await loginUser(username, password);

      console.log("Login successful:", data.success);
      if (data.success) {
        if (data.token) {
          // הגדרת תוקף: 1000 * 60 * 60 * 24 (מ"שניות" ל"ימים")
          const maxAgeSeconds = 60 * 60 * 24;

          // שמירה בצד הלקוח עבור ה-Middleware
          setCookie("auth_token", data.token, {
            maxAge: maxAgeSeconds,
            path: "/",
            // הגדרות אלה מאפשרות ל-Middleware לראות את העוגייה
            sameSite: "lax",
            secure: true,
          });
          console.log("Client-side token set successfully for Middleware.");
        }
        router.push("/workers");
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 1. Background: Modern Soft Gradient with animated blobs
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
            {/* Using React Icon here */}
            <FiUser className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">
            Welcome Back!
          </h1>
          <p className="text-sm text-gray-500">
            Log in to access your dashboard
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-purple-600 checked:border-purple-600 transition-colors"
                />
                <FiCheck className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" />
              </div>
              <span className="text-gray-600 group-hover:text-gray-800 transition-colors">
                Remember Me
              </span>
            </label>

            <a
              href="#"
              className="font-medium text-purple-600 hover:text-purple-500 hover:underline transition-colors"
            >
              Forgot Password?
            </a>
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
              "Sign In"
            )}
          </button>
          {isLoading && <Loader />}
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-gray-500">
          New here?{" "}
          <Link
            href="/register"
            className="font-semibold text-purple-600 hover:text-purple-500 hover:underline transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
