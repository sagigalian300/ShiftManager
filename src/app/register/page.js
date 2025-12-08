"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../services/users";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

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
      // UI-only: no DB call here yet
      console.log("Register (UI):", { username, password });
      registerUser(username, password).then((res) => {
        if (res.data.message === "Username already exists.") {
          setError("Username already exists.");
          setLoading(false);
          return;
        }
        // simulate success -> navigate to login
        router.push("/login");
      });
    } catch (err) {
      setError("Registration error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE (Marketing/Splash) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 to-purple-500 text-white p-12 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 border-4 border-white rounded-xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-36 h-36 border-4 border-white rounded-full opacity-20" />

        <div className="relative z-10 mt-20">
          <h1 className="text-4xl font-bold mb-4">Create your account</h1>
          <p className="text-lg opacity-90">
            Join now to manage shifts and submit availability.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center px-6 md:px-16 py-16">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Register</h2>

          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 border border-red-100 rounded">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-full py-3 font-medium transition-colors ${
                loading
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already registered?{" "}
            <a href="/login" className="text-purple-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
