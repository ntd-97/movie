import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import FilmItem from "../FilmItem";
import FilterBar from "./FilterBar";
import Loader from "../Loader";

import ReactPaginate from "react-paginate";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const FilmsListPage = () => {
  const [loading, setLoading] = useState(true);

  const [filmsList, setFilmsList] = useState();

  const navigate = useNavigate();
  let { pathname, search } = useLocation();
  let { page } = useParams();

  const timeOutId = useRef();

  const getFilmsList = useRef(async (page, search, pathname) => {
    try {
      setLoading(true);

      let path = "";

      // set path base on list's type
      if (pathname.includes("movies")) {
        path = `${process.env.REACT_APP_API_PATH_DISCOVER_MOVIE}${
          process.env.REACT_APP_API_KEY
        }&language=en-US&certification_country=US&page=${page}${search.replace(
          "?",
          "&"
        )}`;
      } else if (pathname.includes("tvseries")) {
        path = `${process.env.REACT_APP_API_PATH_DISCOVER_TV}${
          process.env.REACT_APP_API_KEY
        }&language=en-US&page=${page}${search.replace("?", "&")}`;
      }

      const res = await axios.get(path);

      setFilmsList(res.data);

      // set timeout to prevent jerking
      timeOutId.current = setTimeout(() => {
        setLoading(false);
      }, [200]);
    } catch (error) {
      console.log(error);
      setLoading(false);
      navigate("/error");
    }
  });

  // get data when page, search are changed
  useEffect(() => {
    getFilmsList.current(page, search, pathname);

    return () => {
      clearTimeout(timeOutId.current);
    };
  }, [page, search, pathname]);

  return (
    <>
      <div className="MoviesListPage mt-[100px] px-3 pb-[90px] md:px-5 lg:mt-0 lg:p-10">
        <h1 className="mb-7 text-center text-2xl font-medium text-[#cecece] lg:mb-10 2xl:text-3xl">
          {pathname.includes("movies") ? "Movies List" : "TV Series List"}
        </h1>

        {/* FilterBar */}
        <FilterBar type={pathname.includes("movies") ? "movie" : "tv"} />

        {/* loader */}
        <Loader
          classWidth="w-[50px]"
          classHeight="h-[50px]"
          classBorder="border-[4px]"
          classMargin="mt-10"
          loading={loading}
        />

        {/* Film list */}
        {filmsList?.results?.filter((film) => film.poster_path).length > 0 ? (
          <div
            className={`${
              loading ? "hidden opacity-0" : "opacity-1 grid"
            } grid-cols-2 gap-3 transition-all md:grid-cols-4 2xl:grid-cols-5`}
          >
            {filmsList?.results
              ?.filter((film) => film.poster_path)
              .map((film) => (
                <FilmItem
                  key={film.id}
                  type={pathname.includes("movies") ? "movies" : "tvseries"}
                  filmID={film.id}
                  info={film}
                ></FilmItem>
              ))}
          </div>
        ) : (
          <h3
            className={`${
              loading ? "hidden opacity-0" : "opacity-1 block"
            } mt-20 text-center text-xl text-primary transition-all 2xl:text-2xl`}
          >
            Not found
          </h3>
        )}

        {/* pagination */}
        {filmsList?.results?.filter((film) => film.poster_path).length > 0 ? (
          <ReactPaginate
            pageCount={
              filmsList?.total_pages >= 500 ? 500 : filmsList?.total_pages
            }
            className="mt-10 flex items-center justify-center gap-x-2 text-[15px] text-[#ececec] lg:gap-x-3 lg:text-base"
            pageLinkClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
            previousClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
            nextClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
            activeClassName="text-primary"
            disabledClassName="opacity-40"
            disabledLinkClassName="hover:cursor-default"
            renderOnZeroPageCount={null}
            forcePage={parseInt(page) - 1}
            disableInitialCallback={true}
            pageRangeDisplayed={2}
            marginPagesDisplayed={window.innerHeight <= 1024 ? 1 : 3}
            onPageChange={(e) => {
              navigate(
                `/${
                  pathname.includes("movies") ? "movies" : "tvseries"
                }/list/page/${(e.selected + 1).toString()}${
                  search ? search : ""
                }`
              );
            }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default FilmsListPage;
