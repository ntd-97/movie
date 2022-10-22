import React, { useEffect, useRef, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useLocation, useNavigate } from "react-router-dom";

import useDebounce from "../../hooks/useDebounce";

import SearchSideBarList from "./SearchSideBarList";

import { useSelector } from "react-redux";

const SearchSideBar = () => {
  const [lists, setLists] = useState({});

  const [type, setType] = useState({});

  const [searchQuery, setSearchQuery] = useState("");

  const [openSearchSidebar, setOpenSearchSidebar] = useState(false);

  const typeRef = useRef("");

  const loginInfo = useSelector((state) => state.loginInfo);

  // preventing call API a lots of times when the user types in the search input
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { pathname } = useLocation();
  const navigate = useRef(useNavigate());

  const clickOpenSideBarHandler = () => {
    setOpenSearchSidebar(!openSearchSidebar);
  };

  useEffect(() => {
    const getLists = async () => {
      try {
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

        if (loginInfo.user_id) {
          results = {
            ...results,
            accountFilmList: [
              {
                apiPath: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${loginInfo.user_id}/watchlist/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${loginInfo.session_id}&sort_by=created_at.desc&page=1`,
                title: "Movies Watchlist",
                type: "movie",
                pathNavigate: "/movies/watchlist",
              },
              {
                apiPath: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${loginInfo.user_id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${loginInfo.session_id}&sort_by=created_at.desc&page=1`,
                title: "Favorite Movies",
                type: "movie",
                pathNavigate: "/movies/favorite",
              },
              {
                apiPath: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${loginInfo.user_id}/watchlist/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${loginInfo.session_id}&sort_by=created_at.desc&page=1`,
                title: "TV Series Watchlist",
                type: "tv",
                pathNavigate: "/tvseries/watchlist",
              },
              {
                apiPath: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${loginInfo.user_id}/favorite/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${loginInfo.session_id}&sort_by=created_at.desc&page=1`,
                title: "Favorite TV Series",
                type: "tv",
                pathNavigate: "/tvseries/favorite",
              },
            ],
          };
        }

        setLists(results);
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    };

    getLists();
  }, [loginInfo]);

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

  return (
    <div
      className={`${
        openSearchSidebar
          ? "h-full overflow-scroll"
          : "h-[68px] overflow-hidden"
      } no-scrollbar fixed bottom-0 left-0 right-0 z-[100] flex w-full flex-col bg-[#181818] pb-4 text-[#ececec] transition-all duration-200 ease-in lg:relative  lg:z-auto  lg:h-screen lg:w-[30%] lg:overflow-scroll lg:border-l-2 lg:border-[#353535] lg:pb-5 xl:w-[40%] 2xl:w-[35%]`}
    >
      <div className="sticky top-0 z-50 flex gap-x-2 bg-[#181818] bg-opacity-95 py-3 px-3 lg:py-5 xl:px-6">
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

        <FiSearch className="absolute top-1/2 right-[25px] -translate-y-1/2 text-[22px] text-[#9CA3AF] lg:right-[39px] lg:hidden xl:block" />

        <input
          type="text"
          placeholder={`Search ${type.name}`}
          className="w-full truncate rounded-[10px] bg-[#252229] px-[15px] py-[10px] outline-none focus:outline-[#353535]"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
        />
      </div>

      <div className="mt-5 grid gap-y-10 px-3 xl:px-6">
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

        {loginInfo.user_id &&
          lists?.accountFilmList?.map((list) => (
            <SearchSideBarList
              key={list.pathNavigate}
              title={list.title}
              type={list.type}
              pathNavigate={list.pathNavigate}
              apiPath={list.apiPath}
              showSearchOnMobile={setOpenSearchSidebar}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchSideBar;
