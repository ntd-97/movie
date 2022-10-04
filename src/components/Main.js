import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import CelebProfile from "./Celebs/CelebProfile";
import CelebsHomePage from "./Celebs/CelebsHomePage";
import FilmDetails from "./FilmDetails/FilmDetails";
import MoviesHomePage from "./MoviesHomePage/MoviesHomePage";
import FilmsListPage from "./FilmsListPage/FilmsListPage";
// import Navbar from "./Navbar";
import PageNotFound from "./PageNotFound";
import TVSeriesHomePage from "./TVSeriesHomePage/TVSeriesHomePage";
import SignUpPage from "./SignUpPage/SignUpPage";
import LoginPage from "./LoginPage/LoginPage";

const Main = () => {
  return (
    <div className="Main h-full relative col-span-5">
      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="movies" />}></Route>
          <Route path="movies" element={<MoviesHomePage />}></Route>
          <Route path="movies/:filmId" element={<FilmDetails />}></Route>
          <Route
            path="movies/list/page/:page"
            element={<FilmsListPage />}
          ></Route>
          <Route path="tvseries" element={<TVSeriesHomePage />}></Route>
          <Route path="tvseries/:filmId" element={<FilmDetails />}></Route>
          <Route
            path="tvseries/list/page/:page"
            element={<FilmsListPage />}
          ></Route>
          <Route
            path="celebs"
            element={<Navigate to="/celebs/page/1" />}
          ></Route>
          <Route path="celebs/page/:page" element={<CelebsHomePage />}></Route>
          <Route
            path="celebs/profile/:celebId"
            element={<CelebProfile />}
          ></Route>
          <Route path="signup" element={<SignUpPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Main;
