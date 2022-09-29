import React from "react";
import LogoImg from "../../assets/images/logo.png";

import { BsGrid1X2Fill, BsPlayCircleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";

import { NavLink } from "react-router-dom";

const MenuSideBar = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-[12.5%] border-r-2 border-[#353535] h-full fixed text-[#ececec] bg-[#181818] px-6 py-5 flex flex-col justify-between">
        <div className="flex flex-col gap-y-10">
          <img
            className="w-[65px] justify-self-center"
            src={LogoImg}
            alt="logo"
          />

          <div className="flex flex-col gap-y-6">
            <h4 className="uppercase text-[#505050] text-[14px] font-medium tracking-[4px] ">
              Categories
            </h4>

            <div className="px-3 flex flex-col gap-y-6">
              <NavLink
                className={({ isActive }) =>
                  (isActive ? "text-primary" : "") +
                  " " +
                  "flex items-center transition-colors hover:text-primary leading-[25px]"
                }
                to="movies"
              >
                <BsPlayCircleFill className="inline-block mr-[6px]" />
                Movies
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  (isActive ? "text-primary" : "") +
                  " " +
                  "flex items-center transition-colors hover:text-primary leading-[25px]"
                }
                to="tvseries"
              >
                <BsGrid1X2Fill className="inline-block mr-[6px] text-[14px]" />
                TV Series
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  (isActive ? "text-primary" : "") +
                  " " +
                  "flex items-center transition-colors hover:text-primary leading-[25px]"
                }
                to="celebs"
              >
                <FaUserCircle className="inline-block mr-[6px] text-[17px]" />
                Celebs
              </NavLink>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-6">
          <h4 className="uppercase text-[#505050] text-[14px] font-medium tracking-[4px]">
            General
          </h4>
          <div className="px-3 flex flex-col gap-y-6">
            <a
              className="flex items-center transition-colors hover:text-primary"
              href="#demo"
            >
              <RiSettings4Fill className="inline-block mr-[6px] text-[18px]" />
              Settings
            </a>

            <a
              className="flex items-center transition-colors hover:text-primary"
              href="#demo"
            >
              <IoLogOut className="inline-block mr-[6px] text-[18px]" />
              Log out
            </a>

            <div className="flex items-center flex-wrap">
              <img
                className="w-[40px] h-[40px] rounded-full object-cover inline-block mr-3"
                src="https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt=""
              />
              <span>User name</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSideBar;
