import axios from "axios";

import React from "react";

import { useEffect, useRef, useState } from "react";

import { FiSearch } from "react-icons/fi";

import { useLocation, useNavigate } from "react-router-dom";

import useDebounce from "../../hooks/useDebounce";

import SearchSideBarList from "./SearchSideBarList";

const SearchSideBar = () => {
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);

  const [type, setType] = useState({});

  const [searchQuery, setSearchQuery] = useState();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { pathname } = useLocation();
  const navigate = useRef(useNavigate());

  const getData = useRef(async () => {
    setLoading(true);

    const resMoviesTrending = await axios.get(
      `${process.env.REACT_APP_API_PATH_TRENDING}movie/day?api_key=${process.env.REACT_APP_API_KEY}`
    );

    const resTvTrending = await axios.get(
      `${process.env.REACT_APP_API_PATH_TRENDING}tv/day?api_key=${process.env.REACT_APP_API_KEY}`
    );

    setData({
      moviesTrending: resMoviesTrending.data.results.slice(0, 3),
      tvTrending: resTvTrending.data.results.slice(0, 3),
    });

    setTimeout(() => {
      setLoading(false);
    }, 300);
  });

  useEffect(() => {
    if (pathname.includes("movies"))
      setType({ path: "movie", pathSearch: "movies", name: "Movies" });

    if (pathname.includes("tvseries"))
      setType({ path: "tv", pathSearch: "tvseries", name: "TV Series" });

    if (pathname.includes("celebs"))
      setType({ path: "person", pathSearch: "celebs", name: "Celebs" });

    console.log("path effect");
  }, [pathname]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      navigate.current(
        `/${type.pathSearch}/search/page/1?query=${debouncedSearchQuery}`
      );
      setSearchQuery("");
    }
    console.log("path debound");
  }, [debouncedSearchQuery, type]);

  useEffect(() => {
    getData.current();
  }, []);

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
          <SearchSideBarList
            title="Movies Trending"
            type="movie"
            loading={loading}
            films={data.moviesTrending}
          />

          <SearchSideBarList
            title="TV Series Trending"
            type="tv"
            loading={loading}
            films={data.tvTrending}
          />
        </div>

        {/* <SearchSideBarList title="Watchlists" type={type} loading={loading} /> */}
      </div>
    </div>
  );
};

export default SearchSideBar;
