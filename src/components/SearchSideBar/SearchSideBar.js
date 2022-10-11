import React, { useContext, useEffect, useRef, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useLocation, useNavigate } from "react-router-dom";

import useDebounce from "../../hooks/useDebounce";

import SearchSideBarList from "./SearchSideBarList";
import SearchSideBarListMW from "./SearchSideBarListMW";
import SearchSideBarListTVW from "./SearchSideBarListTVW";
import SearchSideBarListMF from "./SearchSideBarListMF";
import SearchSideBarListTVF from "./SearchSideBarListTVF";

import { LoginContext } from "../../App";

const SearchSideBar = () => {
  const [lists, setLists] = useState({});

  const [type, setType] = useState({});

  const [searchQuery, setSearchQuery] = useState("");

  const [openSearchSidebar, setOpenSearchSidebar] = useState(false);

  const typeRef = useRef("");

  const { loginInfo } = useContext(LoginContext);

  // preventing call API a lots of times when the user types in the search input
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { pathname } = useLocation();
  const navigate = useRef(useNavigate());

  const getLists = useRef(async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const session_id = localStorage.getItem("session_id");

      let results = {};

      results = {
        trending: [
          {
            apiPath: `${process.env.REACT_APP_API_PATH_TRENDING}movie/day?api_key=${process.env.REACT_APP_API_KEY}`,
            title: "Movies Trending",
            type: "movie",
            pathNavigate: "/movies/trending",
          },
          {
            apiPath: `${process.env.REACT_APP_API_PATH_TRENDING}tv/day?api_key=${process.env.REACT_APP_API_KEY}`,
            title: "TV Series Trending",
            type: "tv",
            pathNavigate: "/tvseries/trending",
          },
        ],
      };

      if (user_id) {
        results = {
          ...results,
          movieWatchlist: {
            apiPath: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`,
            title: "Movies Watchlist",
            type: "movie",
            pathNavigate: "/movies/watchlist",
          },
          tvWatchlist: {
            apiPath: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`,
            title: "TV Series Watchlist",
            type: "tv",
            pathNavigate: "/tvseries/watchlist",
          },
          movieFavorite: {
            apiPath: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`,
            title: "Favorite Movies",
            type: "movie",
            pathNavigate: "/movies/favorite",
          },
          tvFavorite: {
            apiPath: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`,
            title: "Favorite TV Series",
            type: "tv",
            pathNavigate: "/tvseries/favorite",
          },
        };
      }

      setLists(results);
    } catch (error) {
      console.log(error);
    }
  });

  const clickOpenSideBarHandler = () => {
    setOpenSearchSidebar(!openSearchSidebar);
  };

  useEffect(() => {
    // set search placeholder and path to navigate base on the pathname
    if (pathname.includes("movies")) {
      setType({
        pathSearch: "movies",
        name: "Movies",
      });

      typeRef.current = "movies";
    }

    if (pathname.includes("tvseries")) {
      setType({
        pathSearch: "tvseries",
        name: "TV Series",
      });

      typeRef.current = "tvseries";
    }

    if (pathname.includes("celebs")) {
      setType({
        pathSearch: "celebs",
        name: "Celebs",
      });

      typeRef.current = "celebs";
    }

    if (!pathname.includes("search")) {
      setSearchQuery("");
    }
  }, [pathname]);

  useEffect(() => {
    // navigation when the user types in the search input
    if (debouncedSearchQuery) {
      setOpenSearchSidebar(false);
      navigate.current(
        `/${typeRef.current}/search/page/1?query=${debouncedSearchQuery}`
      );
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    getLists.current();
  }, [loginInfo]);

  return (
    <div
      className={`${
        openSearchSidebar
          ? "h-full overflow-scroll"
          : "h-[68px] overflow-hidden"
      } no-scrollbar fixed bottom-0 left-0 right-0 z-[100] flex flex-col bg-[#181818] px-3  pb-4  text-[#ececec] transition-all duration-[300ms] ease-in lg:relative  lg:z-auto lg:col-span-3 lg:h-screen lg:overflow-scroll lg:border-l-2 lg:border-[#353535] lg:px-6 lg:pb-5`}
    >
      <div className="sticky top-0 z-50 flex gap-x-2 bg-[#181818] bg-opacity-95 py-3 lg:py-5">
        <FiSearch className="absolute top-1/2 right-[15px] -translate-y-1/2 text-[22px] text-[#9CA3AF]" />
        {!openSearchSidebar && (
          <IoIosArrowUp
            onClick={clickOpenSideBarHandler}
            className="rounded-[10px] bg-[#252229] p-2 text-[44px] lg:hidden"
          />
        )}

        {openSearchSidebar && (
          <IoIosArrowDown
            onClick={clickOpenSideBarHandler}
            className="rounded-[10px] bg-[#252229] p-2 text-[44px] lg:hidden"
          />
        )}

        <input
          type="text"
          placeholder={`Search ${type.name}`}
          className="w-full rounded-[10px] bg-[#252229] px-[15px] py-[10px] outline-none focus:outline-[#353535]"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
        />
      </div>

      <div className="mt-5 grid gap-y-10">
        {lists?.trending?.map((list) => (
          <SearchSideBarList
            key={list.pathNavigate}
            title={list.title}
            type={list.type}
            pathNavigate={list.pathNavigate}
            apiPath={list.apiPath}
            showSearchOnMobile={setOpenSearchSidebar}
          />
        ))}

        {localStorage.getItem("user_id") &&
          lists?.movieWatchlist?.apiPath &&
          lists?.tvWatchlist?.apiPath &&
          lists?.movieFavorite?.apiPath &&
          lists?.tvFavorite?.apiPath && (
            <>
              <SearchSideBarListMW
                key={lists?.movieWatchlist?.pathNavigate}
                title={lists?.movieWatchlist?.title}
                type={lists?.movieWatchlist?.type}
                pathNavigate={lists?.movieWatchlist?.pathNavigate}
                apiPath={lists?.movieWatchlist?.apiPath}
                showSearchOnMobile={setOpenSearchSidebar}
              />

              <SearchSideBarListMF
                key={lists?.movieFavorite?.pathNavigate}
                title={lists?.movieFavorite?.title}
                type={lists?.movieFavorite?.type}
                pathNavigate={lists?.movieFavorite?.pathNavigate}
                apiPath={lists?.movieFavorite?.apiPath}
                showSearchOnMobile={setOpenSearchSidebar}
              />

              <SearchSideBarListTVW
                key={lists?.tvWatchlist?.pathNavigate}
                title={lists?.tvWatchlist?.title}
                type={lists?.tvWatchlist?.type}
                pathNavigate={lists?.tvWatchlist?.pathNavigate}
                apiPath={lists?.tvWatchlist?.apiPath}
                showSearchOnMobile={setOpenSearchSidebar}
              />

              <SearchSideBarListTVF
                key={lists?.tvFavorite?.pathNavigate}
                title={lists?.tvFavorite?.title}
                type={lists?.tvFavorite?.type}
                pathNavigate={lists?.tvFavorite?.pathNavigate}
                apiPath={lists?.tvFavorite?.apiPath}
                showSearchOnMobile={setOpenSearchSidebar}
              />
            </>
          )}
      </div>
    </div>
  );
};

export default SearchSideBar;
