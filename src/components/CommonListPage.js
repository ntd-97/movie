import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import FilmItem from "./FilmItem";
import Loader from "./Loader";

import ReactPaginate from "react-paginate";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const CommonListPage = () => {
  const [loading, setLoading] = useState(false);

  const [films, setFilms] = useState();

  const navigate = useNavigate();
  let { pathname } = useLocation();
  let { page } = useParams();

  const type = useRef({});

  const timeOutId = useRef();

  const getFilms = useRef(async (page, pathname) => {
    try {
      setLoading(true);
      const user_id = localStorage.getItem("user_id");
      const session_id = localStorage.getItem("session_id");

      // set API's path and title base on pathname
      if (pathname.includes("movies") && pathname.includes("trending")) {
        type.current = {
          title: "Movies Trending",
          path: `${process.env.REACT_APP_API_PATH_TRENDING}movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
          pathPagination: "/movies/trending",
          subType: "movies",
        };
      }

      if (pathname.includes("tvseries") && pathname.includes("trending")) {
        type.current = {
          title: "TV Series Trending",
          path: `${process.env.REACT_APP_API_PATH_TRENDING}tv/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
          pathPagination: "/tvseries/trending",
          subType: "tvseries",
        };
      }

      if (pathname.includes("movies") && pathname.includes("watchlist")) {
        type.current = {
          title: "Movies Watchlist",
          path: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=${page}`,
          pathPagination: "/movies/watchlist",
          subType: "movies",
        };
      }

      if (pathname.includes("tvseries") && pathname.includes("watchlist")) {
        type.current = {
          title: "TV Series Watchlist",
          path: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=${page}`,
          pathPagination: "/tvseries/watchlist",
          subType: "tvseries",
        };
      }

      if (pathname.includes("movies") && pathname.includes("favorite")) {
        type.current = {
          title: "Favorite Movies",
          path: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=${page}`,
          pathPagination: "/movies/favorite",
          subType: "movies",
        };
      }

      if (pathname.includes("tvseries") && pathname.includes("favorite")) {
        type.current = {
          title: "Favorite TV Series",
          path: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=${page}`,
          pathPagination: "/tvseries/favorite",
          subType: "tvseries",
        };
      }

      const res = await axios.get(type.current.path);

      // set timeout to prevent jerking
      timeOutId.current = setTimeout(() => {
        setLoading(false);
        setFilms(res.data);
      }, [300]);
    } catch (error) {
      console.log(error);
      setLoading(false);
      navigate("/error");
    }
  });

  // get data when page was changed
  useEffect(() => {
    getFilms.current(page, pathname);

    return () => {
      clearTimeout(timeOutId.current);
    };
  }, [page, pathname]);

  return (
    <>
      <div className="MoviesListPage mt-[100px] px-3 pb-[90px] lg:mt-0 lg:p-10">
        <h1 className="mb-7 text-center text-2xl font-medium text-[#cecece] lg:mb-10 2xl:text-3xl">
          {type?.current?.title}
        </h1>

        {/* loader */}
        <Loader
          classWidth="w-[50px]"
          classHeight="h-[50px]"
          classBorder="border-[4px]"
          classMargin="mt-20 lg:mt-10"
          loading={loading}
        />

        {films?.results?.filter((film) => film.poster_path).length <= 0 && (
          <h3
            className={`${
              loading ? "hidden opacity-0" : "opacity-1 block"
            } mt-20 text-center text-xl text-primary transition-all 2xl:text-2xl`}
          >
            Not found
          </h3>
        )}

        {/* Film list */}
        {films?.results?.filter((film) => film.poster_path).length > 0 && (
          <div
            className={`${
              loading ? "hidden opacity-0" : "opacity-1 grid"
            } grid-cols-2 gap-3 transition-all lg:grid-cols-4 2xl:grid-cols-5`}
          >
            {films?.results
              ?.filter((film) => film.poster_path)
              .map((film) => (
                <FilmItem
                  key={film.id}
                  type={type?.current?.subType}
                  filmID={film.id}
                  info={film}
                ></FilmItem>
              ))}
          </div>
        )}

        {/* pagination */}
        {films?.results?.filter((film) => film.poster_path).length > 0 ? (
          <ReactPaginate
            pageCount={films?.total_pages >= 500 ? 500 : films?.total_pages}
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
                `${type.current.pathPagination}/page/${(
                  e.selected + 1
                ).toString()}`
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

export default CommonListPage;
