import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import CelebProfile from "./Celebs/CelebProfile";
import CelebsHomePage from "./Celebs/CelebsHomePage";
import FilmDetails from "./FilmDetails/FilmDetails";
import MoviesHomePage from "./MoviesHomePage/MoviesHomePage";
// import Navbar from "./Navbar";
import PageNotFound from "./PageNotFound";
import TVSeriesHomePage from "./TVSeriesHomePage/TVSeriesHomePage";

const Main = () => {
  return (
    <div className="Main h-full relative col-span-5 pb-5">
      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="movies" />}></Route>
          <Route path="movies" element={<MoviesHomePage />}></Route>
          <Route path="movies/:filmId" element={<FilmDetails />}></Route>
          <Route path="tvseries" element={<TVSeriesHomePage />}></Route>
          <Route path="tvseries/:filmId" element={<FilmDetails />}></Route>
          <Route
            path="celebs"
            element={<Navigate to="/celebs/page/1" />}
          ></Route>
          <Route path="celebs/page/:page" element={<CelebsHomePage />}></Route>
          <Route
            path="celebs/profile/:celebId"
            element={<CelebProfile />}
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Main;
