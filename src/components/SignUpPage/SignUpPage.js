import React from "react";
import { useEffect, useState } from "react";

const SignUpPage = () => {
  const [loadingBG, setLoadingBG] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingBG(false);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          loadingBG ? "opacity-1 block" : "opacity-0 hidden"
        }  w-[50px] h-[50px] border-[4px] border-y-primary border-l-primary border-r-transparent rounded-full animate-spin mx-auto mt-10 transtion-all`}
      ></div>
      <div
        className={`${
          loadingBG ? "opacity-0 hidden " : "opacity-1 block"
        } SignUpPage bg_overlay w-full h-[100vh] p-10 flex items-center`}
      >
        <h2 className="text-3xl text-center text-[#ececec] leading-[45px] z-50">
          This web uses The movie DB API, so please go to the main page of The
          movie DB
          <a
            href="https://www.themoviedb.org/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary px-2 hover:text-red-400 trasition-all"
          >
            here
          </a>
          to sign up for an account.
        </h2>
      </div>
    </>
  );
};

export default SignUpPage;
