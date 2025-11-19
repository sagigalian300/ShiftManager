"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Workers from "../components/workers/Workers";
import Shifts from "../components/shifts/Shifts";
import Roles from "../components/roles/Roles";

const page = () => {
  const [mode, setMode] = React.useState(0);

  return (
    <div className="flex flex-row h-screen">
      <Navbar setMode={setMode} />
      {mode === 0 && <Shifts />}
      {mode === 1 && <Workers />}
      {mode === 2 && <Roles />}
    </div>
  );
};

export default page;
