"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react"; // removed Globe, we don't need it here anymore
import { logoutUser } from "../../services/users";
import { useRouter } from "next/navigation";
import { status } from "../../services/auth";

// IMPORT YOUR NEW COMPONENT
// (Adjust the path if your component is in a different folder)
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [links, setLinks] = useState([
    { name: "shifts", path: "/shifts" },
    { name: "workers", path: "/workers" },
    { name: "roles", path: "/roles" },
  ]);

  useEffect(() => {
    status()
      .then((res) => {
        console.log("Auth status:", res.roles);
        if (res.roles.includes("admin")) {
          setLinks([
            { name: "shifts", path: "/shifts" },
            { name: "workers", path: "/workers" },
            { name: "roles", path: "/roles" },
            { name: "admin", path: "/admin" },
          ]);
        }
      })
      .catch((err) => {
        console.error("Auth status check failed:", err);
        router.push("/login");
      });
  }, []);

  const handleNavigate = (path) => {
    router.push(path);
    setOpen(false);
  };

  // REMOVED switchLanguage function from here (it's in the component now)

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 h-screen bg-gradient-to-b from-purple-700 to-purple-500 text-white p-6 flex-col justify-between shadow-2xl">
        {/* TOP SECTION */}
        <div>
          <div className="text-3xl font-bold mb-10 tracking-wide">
            Shift manager
          </div>

          <nav className="flex flex-col gap-4">
            {links.map((link, index) => (
              <button
                key={index}
                className="text-start px-4 py-2 rounded-xl transition-all duration-300 
                           hover:bg-white/20 hover:translate-x-1 active:scale-95 font-medium"
                onClick={() => handleNavigate(link.path)}
              >
                {t(link.name)}
              </button>
            ))}
          </nav>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/20 pt-4 flex flex-col gap-2">
          {/* USAGE 1: Desktop */}
          <LanguageSwitcher languages={["en", "he"]} />

          <button
            className="w-full text-start px-4 py-2 rounded-xl transition-all duration-300 
                       hover:bg-white/20 hover:translate-x-1 active:scale-95 font-medium"
            onClick={() => {
              logoutUser().then((res) => {
                router.push("/login");
              });
            }}
          >
            {t("logout")}
          </button>
        </div>
      </div>

      {/* Mobile Navbar (Top bar) */}
      <div className="md:hidden w-full bg-gradient-to-r from-purple-700 to-purple-500 text-white shadow-md flex items-center justify-between px-4 py-3">
        <div className="text-2xl font-bold">Shift manager</div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-white/20 transition"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Slide-In Sidebar */}
      <div
        className={`fixed top-0 start-0 h-full w-64 bg-gradient-to-b from-purple-700 to-purple-500 text-white 
                    flex flex-col justify-between shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
                    ${
                      open
                        ? "translate-x-0"
                        : "ltr:-translate-x-full rtl:translate-x-full"
                    }`}
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
                className="text-start px-4 py-2 rounded-xl transition-all duration-300 
                           hover:bg-white/20 active:scale-95 font-medium"
                onClick={() => handleNavigate(link.path)}
              >
                {t(link.name)}
              </button>
            ))}
          </nav>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/20 pt-4 p-6 flex flex-col gap-2">
          {/* USAGE 2: Mobile */}
          <LanguageSwitcher />

          <button
            className="w-full text-start px-4 py-2 rounded-xl transition-all duration-300 
                       hover:bg-white/20 active:scale-95 font-medium"
            onClick={() => {
              logoutUser().then((res) => {
                console.log(res);
              });
            }}
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
