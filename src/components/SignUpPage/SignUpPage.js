import React from "react";

import bgImage from "../../assets/images/login_bg.jpg";

const SignUpPage = () => {
  return (
    <div
      className="SignUpPage bg_overlay w-full h-[100vh] p-10 flex items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
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
  );
};

export default SignUpPage;
