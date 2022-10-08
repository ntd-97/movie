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
    <div className="col-span-1 flex h-screen flex-col justify-between border-r-2 border-[#353535] bg-[#181818] py-5 text-[#ececec]">
      <div className="ml-4 flex flex-col gap-y-10">
        <img
          className="w-[55%] justify-self-center hover:cursor-pointer"
          src={LogoImg}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />

        <div className="flex flex-col gap-y-6">
          <h4 className="text-[14px] font-medium uppercase tracking-[4px] text-[#505050] ">
            Categories
          </h4>

          <div className="ml-3 flex flex-col gap-y-6">
            <NavLink
              className={({ isActive }) =>
                (isActive ? "text-primary" : "") +
                " " +
                "flex items-center leading-[25px] transition-colors hover:text-primary"
              }
              to="movies"
            >
              <BsPlayCircleFill className="mr-[6px] inline-block" />
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
              <BsGrid1X2Fill className="mr-[6px] inline-block text-[14px]" />
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
              <FaUserCircle className="mr-[6px] inline-block text-[17px]" />
              Celebs
            </NavLink>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-6">
        <h4 className="ml-4 text-[14px] font-medium uppercase tracking-[4px] text-[#505050]">
          General
        </h4>
        <div className="ml-7 flex flex-col gap-y-6">
          {Object.keys(loginInfo).length > 0 && (
            <>
              {!loading ? (
                <Link
                  className="flex items-center transition-colors hover:text-primary"
                  onClick={logoutHandler}
                >
                  <IoMdLogOut className="mr-[6px] inline-block text-[18px]" />
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
              className="flex items-center transition-colors hover:text-primary"
              to="login"
            >
              <IoMdLogIn className="mr-[6px] inline-block text-[18px]" />
              Log in
            </Link>
          )}
        </div>

        {Object.keys(loginInfo).length > 0 && (
          <div className="flex flex-wrap items-center justify-center p-2">
            <img
              className="mr-[6px] mb-[6px] inline-block h-[35px] w-[35px] rounded-full border-2  border-primary object-cover"
              src={
                loginInfo.avatar
                  ? `${process.env.REACT_APP_API_PATH_IMG_W500}${loginInfo.avatar}`
                  : avatarDefault
              }
              alt="avatar img"
            />

            <span className="truncate text-primary">{loginInfo.user_name}</span>
          </div>
        )}

        {Object.keys(loginInfo).length <= 0 && (
          <Link
            to={"signup"}
            className="mx-auto flex w-[82%] items-center justify-center rounded-[10px] bg-primary py-2 font-bold uppercase transition-colors hover:bg-red-400"
          >
            Sign up
            <BsArrowRightCircleFill className="ml-[6px] inline-block text-[18px]" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default MenuSideBar;
