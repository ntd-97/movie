import React from "react";
import { Route, Routes } from "react-router-dom";
import MoviesHomePage from "./MoviesHomePage";
import NavBar from "./NavBar";

const TVHomePage = () => {
  return <div className="text-white">TV series</div>;
};

const Main = () => {
  return (
    <div className="Main col-span-5 px-10 py-5">
      <NavBar></NavBar>
      <Routes>
        <Route path="movies" element={<MoviesHomePage />}></Route>
        <Route path="tvseries" element={<TVHomePage />}></Route>
      </Routes>
    </div>
  );
};

export default Main;
