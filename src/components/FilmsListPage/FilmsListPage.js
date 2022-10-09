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

  const getFilmsList = useRef(async (page, search) => {
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
      } else {
        path = `${process.env.REACT_APP_API_PATH_DISCOVER_TV}${
          process.env.REACT_APP_API_KEY
        }&language=en-US&page=${page}${search.replace("?", "&")}`;
      }

      const res = await axios.get(path);

      setFilmsList(res.data);

      // set timeout to prevent jerking
      setTimeout(() => {
        setLoading(false);
      }, [200]);
    } catch (error) {
      console.log(error);
    }
  });

  // get data when page, search are changed
  useEffect(() => {
    getFilmsList.current(page, search);
  }, [page, search]);

  return (
    <>
      <div className="MoviesListPage p-10">
        <h1 className="mb-10 text-center font-medium text-[#cecece] lg:text-2xl 2xl:text-3xl">
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
            } grid-cols-4 gap-5 transition-all`}
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
            } mt-20 text-center text-2xl text-primary transition-all`}
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
            className="mt-10 flex items-center justify-center gap-x-3 text-[#ececec] "
            pageLinkClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
            previousClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
            nextClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
            activeClassName="text-primary"
            disabledClassName="opacity-40"
            disabledLinkClassName="hover:cursor-default"
            renderOnZeroPageCount={null}
            forcePage={parseInt(page) - 1}
            disableInitialCallback={true}
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
