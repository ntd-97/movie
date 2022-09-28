import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="Navbar px-10 text-[#8F8F91] flex gap-x-10 py-5 sticky top-0 z-50 bg-[#252229] bg-opacity-95">
      <NavLink
        to="/"
        className={({ isActive }) =>
          (isActive ? "text-primary" : "") +
          " " +
          "relative navItem hover:text-primary transition-all duration-500 text-[18px] font-semibold"
        }
      >
        Movies
      </NavLink>
      <NavLink
        to="tvseries"
        className={({ isActive }) =>
          (isActive ? "text-primary" : "") +
          " " +
          "relative navItem hover:text-primary transition-all duration-500 text-[18px] font-semibold"
        }
      >
        TV Series
      </NavLink>
    </header>
  );
};

export default Navbar;
