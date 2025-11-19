"use client";

import { useState } from "react";
import { loginUser } from "../database/users";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    // Add actual login logic here
    console.log("Attempting sign in with:", username, password);
    loginUser(username, password)
      .then((data) => {
        console.log("Login successful:", data.success);
        if (data.success) {
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        // Handle login error (e.g., show error message to user)
      });
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE (Marketing/Splash) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 to-purple-500 text-white p-12 relative overflow-hidden">
        {/* abstract shapes - adjusted for LTR positioning */}
        <div className="absolute top-10 left-10 w-24 h-24 border-4 border-white rounded-xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-36 h-36 border-4 border-white rounded-full opacity-20" />

        <div className="relative z-10 mt-20">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg opacity-90">
            Log in to access your existing account.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center px-6 md:px-16 py-16">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Sign In</h2>

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-full px-4 py-3 
                            text-gray-800 focus:outline-none focus:ring-2 
                            focus:ring-purple-500 focus:border-purple-500"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-full px-4 py-3 
                            text-gray-800 focus:outline-none focus:ring-2 
                            focus:ring-purple-500 focus:border-purple-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm text-gray-600 px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-purple-600" />
                Remember Me
              </label>

              <a className="hover:underline cursor-pointer text-purple-600">
                Forgot Password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-full bg-purple-600 text-white py-3 font-medium 
                            hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            New here?{" "}
            <a href="#" className="text-purple-600 hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
