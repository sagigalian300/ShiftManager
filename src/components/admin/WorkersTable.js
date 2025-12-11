import React from "react";

const WorkersTable = ({ workers }) => {
  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">
                Employee
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">
                Contact
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">
                Rank
              </th>
              <th className="px-6 py-4 text-right font-medium text-gray-500 uppercase tracking-wider text-xs">
                Salary
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {workers.map((worker) => (
              <tr
                key={worker.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">
                      {worker.username} {worker.last_name}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      ID: {worker.id}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-700">{worker.email}</span>
                    <span className="text-xs text-gray-500">
                      {worker.phone}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                    {worker.rank}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-gray-700">
                  {worker.salary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkersTable;
