import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header text-[#8F8F91] flex gap-x-10 pb-5">
      <NavLink
        to="movies"
        className={({ isActive }) =>
          (isActive ? "text-primary" : "") +
          " relative navItem hover:text-primary transition-all duration-500 text-[18px] font-semibold"
        }
      >
        Movies
      </NavLink>
      <NavLink
        to="tvseries"
        className={({ isActive }) =>
          (isActive ? "text-primary" : "") +
          " relative navItem hover:text-primary transition-all duration-500 text-[18px] font-semibold"
        }
      >
        TV Series
      </NavLink>
    </header>
  );
};

export default Navbar;
