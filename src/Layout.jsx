import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden bg-black text-white ">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
