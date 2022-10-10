import React, { useState, useContext } from "react";

import LogoImg from "../../assets/images/logo.png";

import { LoginContext } from "../../App";

import {
  BsArrowRightCircleFill,
  BsGrid1X2Fill,
  BsPlayCircleFill,
} from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut, IoMdLogIn } from "react-icons/io";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

import { Link, NavLink, useNavigate } from "react-router-dom";

import axios from "axios";

import avatarDefault from "../../assets/images/avatar_default.png";

import Loader from "../Loader";

const MenuSideBar = () => {
  const { loginInfo, setLoginInfo } = useContext(LoginContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const menuClickHanler = () => {
    setShowMenu(!showMenu);
  };

  const navClickHandler = async (e) => {
    setShowMenu(false);
  };

  const logoutHandler = async () => {
    try {
      setLoading(true);
      const res_delete_session = await axios.delete(
        `${process.env.REACT_APP_API_PATH_SESSION_DELETE}${process.env.REACT_APP_API_KEY}`,
        { data: { session_id: localStorage.getItem("session_id") } }
      );

      if (res_delete_session.data.success) {
        localStorage.clear();
        setLoginInfo({});
        setLoading(false);
        setShowMenu("close");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("menu-render");

  return (
    <div
      className={`${
        showMenu ? "h-[428px]" : "h-[74px]"
      } fixed top-0 right-0 left-0 z-[100] flex select-none flex-col overflow-hidden bg-[#181818] p-5 text-[#ececec] transition-all duration-300 ease-in lg:relative lg:z-auto lg:col-span-1 lg:h-screen lg:justify-between lg:border-r-2 lg:border-[#353535] lg:px-2 2xl:px-0`}
    >
      <HiOutlineMenuAlt1
        onClick={menuClickHanler}
        className="visible absolute right-5 top-0 flex h-[74px]  text-3xl transition-all hover:cursor-pointer hover:text-primary lg:hidden"
      ></HiOutlineMenuAlt1>

      <div className="flex flex-col gap-y-6 lg:gap-y-10 2xl:ml-4">
        <img
          className="w-[55px] justify-self-center hover:cursor-pointer lg:w-[55%]"
          src={LogoImg}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />

        <div className="flex flex-col gap-y-3 lg:gap-y-4 lg:text-sm 2xl:gap-y-6 2xl:text-base">
          <h4 className="text-sm font-medium uppercase text-[#505050] 2xl:tracking-[4px]">
            Categories
          </h4>

          <div className="ml-3 flex flex-col gap-y-6 lg:ml-0 lg:gap-y-3 2xl:ml-3 2xl:gap-y-6">
            <NavLink
              className={({ isActive }) =>
                (isActive ? "text-primary" : "") +
                " " +
                "flex items-center leading-[25px] transition-colors hover:text-primary"
              }
              to="movies"
              onClick={navClickHandler}
            >
              <BsPlayCircleFill className="mr-[6px] inline-block " />
              Movies
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                (isActive ? "text-primary" : "") +
                " " +
                "flex items-center leading-[25px] transition-colors hover:text-primary"
              }
              to="tvseries"
              onClick={navClickHandler}
            >
              <BsGrid1X2Fill className="mr-[6px] inline-block lg:text-[12px] 2xl:text-sm" />
              TV Series
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                (isActive ? "text-primary" : "") +
                " " +
                "flex items-center leading-[25px] transition-colors hover:text-primary"
              }
              to="celebs"
              onClick={navClickHandler}
            >
              <FaUserCircle className="mr-[6px] inline-block lg:text-[15px] 2xl:text-[17px]" />
              Celebs
            </NavLink>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-y-3 lg:mt-0 lg:gap-y-4 2xl:gap-y-6">
        <h4 className="text-sm font-medium uppercase text-[#505050] 2xl:ml-4 2xl:tracking-[4px]">
          General
        </h4>

        <div className="ml-3 flex flex-col lg:ml-0 2xl:ml-7">
          {Object.keys(loginInfo).length > 0 && (
            <>
              {!loading ? (
                <Link
                  className="flex items-center transition-colors hover:text-primary lg:text-sm 2xl:text-base"
                  onClick={logoutHandler}
                >
                  <IoMdLogOut className="mr-[6px] inline-block text-[19px] lg:text-base 2xl:text-[18px]" />
                  Log out
                </Link>
              ) : (
                <Loader
                  classWidth="w-5"
                  classHeight="h-5"
                  classBorder="border-2"
                  classMargin="mt-0"
                  loading={loading}
                />
              )}
            </>
          )}

          {Object.keys(loginInfo).length <= 0 && (
            <Link
              className="flex items-center transition-colors hover:text-primary lg:text-sm 2xl:text-base"
              to="login"
              onClick={navClickHandler}
            >
              <IoMdLogIn className="mr-[6px] inline-block text-[19px] lg:text-base 2xl:text-[18px]" />
              Log in
            </Link>
          )}
        </div>

        {Object.keys(loginInfo).length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-start border-t-2 border-t-primary pt-[20px] lg:mt-0 lg:justify-center lg:border-0 lg:pt-0 2xl:p-2">
            <img
              className="mr-[6px] inline-block h-[35px] w-[35px] rounded-full border-2 border-primary  object-cover lg:mb-[6px] lg:mr-0"
              src={
                loginInfo.avatar
                  ? `${process.env.REACT_APP_API_PATH_IMG_W500}${loginInfo.avatar}`
                  : avatarDefault
              }
              alt="avatar img"
            />

            <span className="truncate text-primary lg:text-sm 2xl:text-base">
              {loginInfo.user_name}
            </span>
          </div>
        )}

        {Object.keys(loginInfo).length <= 0 && (
          <Link
            to={"signup"}
            onClick={navClickHandler}
            className="mt-9 flex w-full items-center justify-center rounded-[10px] bg-primary py-2 font-bold uppercase transition-colors hover:bg-red-400 lg:mx-auto lg:mt-0 lg:w-full lg:text-sm 2xl:w-[82%] 2xl:text-base"
          >
            Sign up
            <BsArrowRightCircleFill className="ml-[6px] inline-block lg:text-sm 2xl:text-[18px]" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default MenuSideBar;
