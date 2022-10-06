import axios from "axios";

import React, { useContext } from "react";

import { useEffect, useRef, useState } from "react";

import { FiSearch } from "react-icons/fi";

import { useLocation, useNavigate } from "react-router-dom";

import useDebounce from "../../hooks/useDebounce";

import SearchSideBarList from "./SearchSideBarList";

import { LoginContext } from "../../App";

const SearchSideBar = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [type, setType] = useState({});

  const typeRef = useRef("");

  const [searchQuery, setSearchQuery] = useState("");

  const { loginInfo } = useContext(LoginContext);

  // preventing call API a lots of times when the user types in the search input
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { pathname } = useLocation();
  const navigate = useRef(useNavigate());

  const getData = useRef(async () => {
    setLoading(true);

    const user_id = localStorage.getItem("user_id");
    const session_id = localStorage.getItem("session_id");

    let resMoviesWatchlist = {};
    let resTvWatchlist = {};
    let resMoviesFavorite = {};
    let resTvFavorite = {};

    let results = [];

    const resMoviesTrending = await axios.get(
      `${process.env.REACT_APP_API_PATH_TRENDING}movie/day?api_key=${process.env.REACT_APP_API_KEY}`
    );

    const resTvTrending = await axios.get(
      `${process.env.REACT_APP_API_PATH_TRENDING}tv/day?api_key=${process.env.REACT_APP_API_KEY}`
    );

    results = [
      {
        films: resMoviesTrending.data.results.slice(0, 3),
        title: "Movies Trending",
        type: "movie",
        pathNavigate: "/movies/trending",
      },
      {
        films: resTvTrending.data.results.slice(0, 3),
        title: "TV Series Trending",
        type: "tv",
        pathNavigate: "/tvseries/trending",
      },
    ];

    if (user_id) {
      resMoviesWatchlist = await axios.get(
        `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`
      );

      resTvWatchlist = await axios.get(
        `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`
      );

      resMoviesFavorite = await axios.get(
        `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`
      );

      resTvFavorite = await axios.get(
        `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`
      );

      results = [
        ...results,
        {
          films:
            resMoviesWatchlist.data.results.length > 3
              ? resMoviesWatchlist.data.results.slice(0, 3)
              : resMoviesWatchlist.data.results,
          title: "Movies Watchlist",
          type: "movie",
          pathNavigate: "/movies/watchlist",
        },
        {
          films:
            resTvWatchlist.data.results.length > 3
              ? resTvWatchlist.data.results.slice(0, 3)
              : resTvWatchlist.data.results,
          title: "TV Series Watchlist",
          type: "tv",
          pathNavigate: "/tvseries/watchlist",
        },
        {
          films:
            resMoviesFavorite.data.results.length > 3
              ? resMoviesFavorite.data.results.slice(0, 3)
              : resMoviesFavorite.data.results,
          title: "Favorite Movies",
          type: "movie",
          pathNavigate: "/movies/favorite",
        },
        {
          films:
            resTvFavorite.data.results.length > 3
              ? resTvFavorite.data.results.slice(0, 3)
              : resTvFavorite.data.results,
          title: "Favorite TV Series",
          type: "tv",
          pathNavigate: "/tvseries/favorite",
        },
      ];
    }

    setData(results);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  });

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
      navigate.current(
        `/${typeRef.current}/search/page/1?query=${debouncedSearchQuery}`
      );
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    getData.current();
  }, [loginInfo]);

  return (
    <div className="w-full h-screen col-span-2">
      <div className="w-[25%] h-full border-l-2 border-[#353535] fixed text-[#ececec] bg-[#181818] px-6 pb-5 flex flex-col overflow-scroll no-scrollbar">
        <div className="sticky top-0 z-50 py-5 bg-[#181818] bg-opacity-95">
          <FiSearch className="absolute top-1/2 right-[15px] text-[22px] text-[#9CA3AF] -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${type.name}`}
            className="px-[15px] py-[10px] w-full rounded-[10px] bg-[#252229] focus:outline-[#353535] outline-none"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            value={searchQuery}
          />
        </div>
        <div className="grid mt-5 gap-y-10">
          {data.map((list) => (
            <SearchSideBarList
              key={list.pathNavigate}
              title={list.title}
              type={list.type}
              pathNavigate={list.pathNavigate}
              loading={loading}
              films={list.films}
            />
          ))}
        </div>

        {/* <SearchSideBarList title="Watchlists" type={type} loading={loading} /> */}
      </div>
    </div>
  );
};

export default SearchSideBar;
