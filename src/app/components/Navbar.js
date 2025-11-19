"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // icons for mobile toggle

const Navbar = ({ setMode }) => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Shifts", mode: 0 },
    { name: "Workers", mode: 1 },
    { name: "Roles", mode: 2 },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 h-screen bg-gradient-to-b from-purple-700 to-purple-500 text-white p-6 flex-col justify-between shadow-2xl">
        {/* TOP SECTION */}
        <div>
          <div className="text-3xl font-bold mb-10 tracking-wide">MyApp</div>

          <nav className="flex flex-col gap-4">
            {links.map((link, index) => (
              <button
                key={index}
                className="text-left px-4 py-2 rounded-xl transition-all duration-300 
                           hover:bg-white/20 hover:translate-x-1 active:scale-95 font-medium"
                onClick={() => setMode(link.mode)}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/20 pt-4">
          <button
            className="w-full text-left px-4 py-2 rounded-xl transition-all duration-300 
                       hover:bg-white/20 hover:translate-x-1 active:scale-95 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Navbar (Top bar) */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gradient-to-r from-purple-700 to-purple-500 text-white z-50 shadow-md flex items-center justify-between px-4 py-3">
        <div className="text-2xl font-bold">MyApp</div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-white/20 transition"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Slide-In Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-purple-700 to-purple-500 text-white 
                    flex flex-col justify-between shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* TOP SECTION */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">MyApp</h1>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-white/20 transition"
            >
              <X size={26} />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {links.map((link, index) => (
              <button
                key={index}
                className="text-left px-4 py-2 rounded-xl transition-all duration-300 
                           hover:bg-white/20 active:scale-95 font-medium"
                onClick={() => {
                  setMode(link.mode);
                  setOpen(false);
                }}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/20 pt-4 p-6">
          <button
            className="w-full text-left px-4 py-2 rounded-xl transition-all duration-300 
                       hover:bg-white/20 active:scale-95 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
