import axios from "axios";

import React, { useEffect, useRef, useState } from "react";

import FilmItem from "./FilmItem";

import ReactPaginate from "react-paginate";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const CommonListPage = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();

  const navigate = useNavigate();
  let { pathname } = useLocation();
  let { page } = useParams();

  const type = useRef({});

  const getData = useRef(async (page, pathname) => {
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
          path: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`,
          pathPagination: "/movies/watchlist",
          subType: "movies",
        };
      }

      if (pathname.includes("tvseries") && pathname.includes("watchlist")) {
        type.current = {
          title: "TV Series Watchlist",
          path: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`,
          pathPagination: "/tvseries/watchlist",
          subType: "tvseries",
        };
      }

      if (pathname.includes("movies") && pathname.includes("favorite")) {
        type.current = {
          title: "Favorite Movies",
          path: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`,
          pathPagination: "/movies/favorite",
          subType: "movies",
        };
      }

      if (pathname.includes("tvseries") && pathname.includes("favorite")) {
        type.current = {
          title: "Favorite TV Series",
          path: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`,
          pathPagination: "/tvseries/favorite",
          subType: "tvseries",
        };
      }

      const res = await axios.get(type.current.path);

      // set timeout to prevent jerking
      setTimeout(() => {
        setLoading(false);
        setData(res.data);
      }, [200]);
    } catch (error) {
      console.log(error);
    }
  });

  // get data when page was changed
  useEffect(() => {
    getData.current(page, pathname);
  }, [page, pathname]);

  return (
    <>
      <div className="MoviesListPage p-10">
        <h1 className="text-3xl font-medium text-[#cecece] text-center mb-10">
          {type?.current?.title}
        </h1>
        {/* loader */}
        <div
          className={`${
            loading ? "opacity-1 block" : "opacity-0 hidden"
          }  w-[50px] h-[50px] border-[4px] border-y-primary border-l-primary border-r-transparent rounded-full animate-spin mx-auto mt-10 transtion-all`}
        ></div>

        {data?.results?.filter((film) => film.poster_path).length <= 0 && (
          <h3
            className={`${
              loading ? "opacity-0 hidden" : "opacity-1 block"
            } transition-all text-primary text-center text-2xl mt-20`}
          >
            Not found
          </h3>
        )}

        {/* Film list */}
        {data?.results?.filter((film) => film.poster_path).length > 0 && (
          <div
            className={`${
              loading ? "opacity-0 hidden" : "opacity-1 grid"
            } grid-cols-4 gap-5 transition-all`}
          >
            {data?.results
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
        {data?.results?.filter((film) => film.poster_path).length > 0 ? (
          <ReactPaginate
            pageCount={data?.total_pages >= 500 ? 500 : data?.total_pages}
            className="flex justify-center items-center mt-10 gap-x-3 text-[#ececec] "
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
                `${type.current.subType}/page/${(e.selected + 1).toString()}`
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
