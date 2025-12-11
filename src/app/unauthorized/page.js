"use client";

import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        {/* Lock Icon */}
        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto text-red-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
          </svg>
        </div>

        {/* Error Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-4xl font-bold text-red-600 mb-4">
            Unauthorized Access
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            You must be authenticated to view this page.
          </p>
          <p className="text-gray-600 text-base">
            Please log in with valid credentials to access.
          </p>
        </div>

        {/* Additional Info */}
        <p className="mt-8 text-gray-500 text-sm">
          If you need access, please contact your manager.
        </p>
      </div>
    </div>
  );
};

export default Page;
