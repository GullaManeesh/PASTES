import { isAction } from "@reduxjs/toolkit";
import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="w-full flex items-center p-5 justify-center gap-30">
      <NavLink
        className={({ isActive }) =>
          `hover:underline underline-offset-3 ${
            isActive ? " underline underline-offset-3" : ""
          }`
        }
        to="/">
        HOME
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `hover:underline underline-offset-3 ${
            isActive ? " underline underline-offset-3" : ""
          }`
        }
        to="/pastes">
        PASTES
      </NavLink>
    </div>
  );
}

export default Header;
