import React from "react";

const TrashIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RoleCard = ({ role, onDelete }) => {
  const initials = (role.name || "")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_88px_auto] items-center gap-4 p-4 bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
      {/* left: avatar + content */}
      <div className="flex items-start gap-4 min-w-0">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 text-white flex items-center justify-center font-semibold text-lg shadow">
            {initials}
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{role.name}</h3>
          <p className="text-sm text-gray-600 mt-1 text-ellipsis overflow-hidden" style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
            {role.desc}
          </p>

          {role.tags && role.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {role.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 bg-white/60 border border-gray-100 rounded-full text-gray-700"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* center: fixed-width stat column (always vertically centered) */}
      <div className="w-20 flex-shrink-0 text-center flex flex-col items-center justify-center">
        <div className="text-sm text-gray-500">Workers</div>
        <div className="text-lg font-semibold text-gray-800">{role.numOfWorkers ?? 0}</div>
      </div>

      {/* right: actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => onDelete(role.id)}
          title="Delete role"
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-shadow shadow-sm"
        >
          <TrashIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default RoleCard;