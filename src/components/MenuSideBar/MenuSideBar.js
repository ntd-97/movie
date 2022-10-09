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

import { Link, NavLink, useNavigate } from "react-router-dom";

import axios from "axios";

import avatarDefault from "../../assets/images/avatar_default.png";

import Loader from "../Loader";

const MenuSideBar = () => {
  const { loginInfo, setLoginInfo } = useContext(LoginContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-span-1 flex h-screen flex-col justify-between border-r-2 border-[#353535] bg-[#181818] py-5 text-[#ececec] lg:px-2 2xl:px-0">
      <div className="flex flex-col gap-y-10 2xl:ml-4">
        <img
          className="w-[55%] justify-self-center hover:cursor-pointer"
          src={LogoImg}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />

        <div className="flex flex-col lg:gap-y-4 lg:text-sm 2xl:gap-y-6 2xl:text-base">
          <h4 className="text-sm font-medium uppercase text-[#505050] 2xl:tracking-[4px]">
            Categories
          </h4>

          <div className="flex flex-col lg:gap-y-3 2xl:ml-3 2xl:gap-y-6">
            <NavLink
              className={({ isActive }) =>
                (isActive ? "text-primary" : "") +
                " " +
                "flex items-center leading-[25px] transition-colors hover:text-primary"
              }
              to="movies"
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
            >
              <FaUserCircle className="mr-[6px] inline-block lg:text-[15px] 2xl:text-[17px]" />
              Celebs
            </NavLink>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:gap-y-4 2xl:gap-y-6">
        <h4 className="text-sm font-medium uppercase text-[#505050] 2xl:ml-4 2xl:tracking-[4px]">
          General
        </h4>
        <div className="flex flex-col gap-y-6 2xl:ml-7">
          {Object.keys(loginInfo).length > 0 && (
            <>
              {!loading ? (
                <Link
                  className="flex items-center transition-colors hover:text-primary lg:text-sm 2xl:text-base"
                  onClick={logoutHandler}
                >
                  <IoMdLogOut className="mr-[6px] inline-block lg:text-base 2xl:text-[18px]" />
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
            >
              <IoMdLogIn className="mr-[6px] inline-block lg:text-base 2xl:text-[18px]" />
              Log in
            </Link>
          )}
        </div>

        {Object.keys(loginInfo).length > 0 && (
          <div className="flex flex-wrap items-center justify-center 2xl:p-2">
            <img
              className="mr-[6px] mb-[6px] inline-block h-[35px] w-[35px] rounded-full border-2  border-primary object-cover"
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
            className="mx-auto flex items-center justify-center rounded-[10px] bg-primary py-2 font-bold uppercase transition-colors hover:bg-red-400 lg:w-full lg:text-sm 2xl:w-[82%] 2xl:text-base"
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
