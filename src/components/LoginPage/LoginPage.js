import React from "react";

import { useState, useEffect } from "react";

import { BsCheckLg } from "react-icons/bs";

import bgImage from "../../assets/images/login_bg.jpg";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";

import { useContext } from "react";

import { LoginContext } from "../../App";

import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  username: yup.string().required("Please enter your Username!"),
  password: yup.string().required("Please enter your Password!"),
});

const LoginPage = () => {
  const [checked, setChecked] = useState(false);

  const [errorMsg, setErrorMsg] = useState(false);

  const { setLoginInfo } = useContext(LoginContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setFocus,
    reset,
    getValues,
  } = useForm({ resolver: yupResolver(validationSchema), mode: "onChange" });

  const loginHandler = async () => {
    if (isValid) {
      try {
        const { username, password } = getValues();

        const res_reqToken = await axios.get(
          `${process.env.REACT_APP_API_PATH_REQUEST_TOKEN}${process.env.REACT_APP_API_KEY}`
        );

        if (res_reqToken.data.success) {
          let res_sessionLogin = {};
          try {
            res_sessionLogin = await axios.post(
              `${process.env.REACT_APP_API_PATH_SESSION_LOGIN}${process.env.REACT_APP_API_KEY}`,
              {
                username: username,
                password: password,
                request_token: res_reqToken.data.request_token,
              }
            );
          } catch (error) {
            if (error.response.status === 401) {
              setErrorMsg(true);
            }
          }

          if (res_sessionLogin.data.success) {
            const res_session = await axios.post(
              `${process.env.REACT_APP_API_PATH_SESSION}${process.env.REACT_APP_API_KEY}`,
              {
                request_token: res_sessionLogin.data.request_token,
              }
            );

            if (res_session.data.success) {
              const res_accountInfo = await axios.get(
                `${process.env.REACT_APP_API_PATH_ACCOUNT_INFO}${process.env.REACT_APP_API_KEY}&session_id=${res_session.data.session_id}`
              );

              localStorage.setItem("session_id", res_session.data.session_id);
              localStorage.setItem("user_id", res_accountInfo.data.id);
              localStorage.setItem("user_name", res_accountInfo.data.username);
              localStorage.setItem(
                "avatar",
                res_accountInfo.data.avatar.tmdb.avatar_path
              );

              setLoginInfo({
                session_id: res_session.data.session_id,
                user_id: res_accountInfo.data.id,
                user_name: res_accountInfo.data.username,
                avatar: res_accountInfo.data.avatar.tmdb.avatar_path,
              });

              reset({
                username: "",
                password: "",
                showPassword: false,
              });

              setChecked(false);

              navigate("/");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  return (
    <div
      className="LoginPage bg_overlay w-full h-[100vh] flex justify-center items-center  select-none"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-[#181818] w-[45%] bg-opacity-90 text-[#ececec] z-50 p-10 rounded-[15px]">
        <h3 className="text-2xl mb-4 font-bold tracking-[2px]">LOGIN</h3>
        <form
          className="flex flex-col gap-y-5"
          onSubmit={handleSubmit(loginHandler)}
        >
          <div className="flex flex-col relative">
            <label htmlFor="username">User name:</label>
            <input
              {...register("username")}
              className="text-[#181818] bg-[#ececec]  focus:outline-none p-[6px] rounded-[10px] mt-2 border-2 border-transparent hover:border-primary focus:border-primary"
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
            />
            {errors?.username && (
              <p className="absolute font-medium -bottom-7 right-0 text-primary text-base">
                {errors.username?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password">Password:</label>
            <input
              {...register("password")}
              className="text-[#181818] bg-[#ececec]  focus:outline-none p-[6px] rounded-[10px] mt-2 border-2 border-transparent hover:border-primary focus:border-primary"
              type={checked ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Password"
            />
            {errors?.password && (
              <p className="absolute font-medium -bottom-7 right-0 text-primary text-base">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="flex items-center gap-x-1 relative">
            <input
              {...register("showPassword")}
              type="checkbox"
              id="showPass"
              name="showPass"
              className="hidden"
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
              checked={checked}
            />
            <label
              htmlFor="showPass"
              className={`${
                checked ? "bg-primary" : "bg-gray-400"
              } w-4 h-4 absolute rounded top-1/2 -translate-y-1/2  cursor-pointer flex items-center justify-center transition-all`}
            >
              <BsCheckLg
                className={`text-xs ${
                  checked ? "opacity-100" : "opacity-0"
                } transition-all z-50`}
              />
            </label>
            <label htmlFor="showPass" className="ml-5 cursor-pointer">
              Show password
            </label>
          </div>
          {errorMsg && (
            <p className="text-primary">
              The username or Password is invalid. Please try again!
            </p>
          )}
          <button
            type="submit"
            className={`${
              isSubmitting
                ? "hover:cursor-default"
                : "hover:cursor-pointer hover:bg-red-400"
            } font-bold text-[18px] h-[43px] bg-primary py-2 rounded-[10px] flex items-center justify-center`}
            aria-disabled={isSubmitting ? true : false}
          >
            {isSubmitting ? (
              <div className="mx-auto w-5 h-5 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "LOGIN"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
