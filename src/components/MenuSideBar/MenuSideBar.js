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

import { Link, NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import avatarDefault from "../../assets/images/avatar_default.png";

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
    <div className="w-full h-screen">
      <div className="w-[12.5%] border-r-2 border-[#353535] h-full fixed text-[#ececec] bg-[#181818] py-5 flex flex-col justify-between">
        <div className="flex flex-col px-6 gap-y-10">
          <img
            className="w-[65px] justify-self-center hover:cursor-pointer"
            src={LogoImg}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
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
          <h4 className="uppercase pl-6 text-[#505050] text-[14px] font-medium tracking-[4px]">
            General
          </h4>
          <div className="ml-6 px-3 flex flex-col gap-y-6">
            {Object.keys(loginInfo).length > 0 && (
              <>
                {!loading ? (
                  <Link
                    className="flex items-center transition-colors hover:text-primary"
                    onClick={logoutHandler}
                  >
                    <IoMdLogOut className="inline-block mr-[6px] text-[18px]" />
                    Log out
                  </Link>
                ) : (
                  <div className="mx-auto w-5 h-5 border-2 border-primary border-t-2 border-t-transparent rounded-full animate-spin"></div>
                )}
              </>
            )}

            {Object.keys(loginInfo).length <= 0 && (
              <Link
                className="flex items-center transition-colors hover:text-primary"
                to="login"
              >
                <IoMdLogIn className="inline-block mr-[6px] text-[18px]" />
                Log in
              </Link>
            )}
          </div>

          {Object.keys(loginInfo).length > 0 && (
            <div className="flex items-center justify-center flex-wrap border-2 border-primary rounded-3xl py-2 w-[82%] mx-auto">
              <img
                className="w-[35px] h-[35px] rounded-full object-cover inline-block mr-[6px]"
                src={
                  loginInfo.avatar
                    ? `${process.env.REACT_APP_API_PATH_IMG_W500}${loginInfo.avatar}`
                    : avatarDefault
                }
                alt="avatar img"
              />

              <span>{loginInfo.user_name}</span>
            </div>
          )}

          {Object.keys(loginInfo).length <= 0 && (
            <Link
              to={"signup"}
              className="flex items-center justify-center w-[82%] mx-auto bg-primary py-2 rounded-[10px] transition-colors uppercase font-bold hover:bg-red-400"
            >
              Sign up
              <BsArrowRightCircleFill className="inline-block ml-[6px] text-[18px]" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuSideBar;
