import React, { useState, useEffect, useContext } from "react";

import { BsCheckLg } from "react-icons/bs";

import bgImage from "../../assets/images/login_bg.jpg";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";

import { LoginContext } from "../../App";

import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

// Yup validation schema
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

  const [loading, setLoading] = useState(true);

  const loginHandler = async () => {
    if (isValid) {
      try {
        // get username and password from form
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
            // username or password is invalid
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

              // reset form
              reset({
                username: "",
                password: "",
                showPassword: false,
              });
              // uncheck check box
              setChecked(false);
              // navigate to home page
              navigate("/");
            }
          }
        }
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  return (
    <div className="LoginPage bg_overlay relative flex h-screen w-full items-center justify-center">
      <img
        src={bgImage}
        alt="bg-img"
        className="absolute inset-0 h-screen object-cover"
        onLoad={() => {
          setLoading(false);
        }}
      />

      {/* loader */}
      <Loader
        classWidth="w-[50px]"
        classHeight="h-[50px]"
        classBorder="border-[4px]"
        classMargin="mt-0 z-50"
        loading={loading}
      />

      {!loading && (
        <div className="z-50 w-[94%] rounded-[15px] bg-[#181818] bg-opacity-90 p-10 text-[#ececec] md:w-[75%] lg:w-[45%]">
          <h3 className="mb-4 text-2xl font-bold tracking-[2px]">LOGIN</h3>
          <form
            className="flex flex-col gap-y-6 lg:gap-y-5"
            onSubmit={handleSubmit(loginHandler)}
          >
            <div className="relative flex flex-col">
              <label htmlFor="username">User name:</label>
              <input
                {...register("username")}
                className="mt-2 rounded-[10px]  border-2 border-transparent bg-[#ececec] p-[6px] text-[#181818] hover:border-primary focus:border-primary focus:outline-none"
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
              />
              {errors?.username && (
                <p className="absolute -bottom-7 right-0 text-base font-medium text-primary">
                  {errors.username?.message}
                </p>
              )}
            </div>
            <div className="relative flex flex-col">
              <label htmlFor="password">Password:</label>
              <input
                {...register("password")}
                className="mt-2 rounded-[10px]  border-2 border-transparent bg-[#ececec] p-[6px] text-[#181818] hover:border-primary focus:border-primary focus:outline-none"
                type={checked ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Password"
              />
              {errors?.password && (
                <p className="absolute -bottom-7 right-0 text-base font-medium text-primary">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="relative flex items-center gap-x-1">
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
                } absolute top-1/2 flex h-4 w-4 -translate-y-1/2  cursor-pointer items-center justify-center rounded transition-all`}
              >
                <BsCheckLg
                  className={`text-xs ${
                    checked ? "opacity-100" : "opacity-0"
                  } z-50 transition-all`}
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
              } flex h-[43px] select-none items-center justify-center rounded-[10px] bg-primary py-2 text-[18px] font-bold`}
              aria-disabled={isSubmitting ? true : false}
            >
              {isSubmitting ? (
                <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-t-2 border-white border-t-transparent"></div>
              ) : (
                "LOGIN"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
