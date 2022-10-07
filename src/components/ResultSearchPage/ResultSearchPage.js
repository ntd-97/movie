import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import FilmItem from "../FilmItem";
import CelebItem from "../Celebs/CelebItem";
import Loader from "../Loader";

import ReactPaginate from "react-paginate";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const ResultSearchPage = () => {
  const [loading, setLoading] = useState(false);

  const [resultSearch, setResultSearch] = useState();

  const navigate = useNavigate();
  let { pathname, search } = useLocation();
  let { page } = useParams();

  const type = useRef({});

  const getResultSearch = useRef(async (page, search) => {
    try {
      setLoading(true);

      let path = "";

      // set API's path and title base on pathname
      if (pathname.includes("movies")) {
        type.current = {
          title: "Movies Search List",
          envPath: process.env.REACT_APP_API_PATH_SEARCH_MOVIE,
          subType: "movies",
        };
      }

      if (pathname.includes("tvseries")) {
        type.current = {
          title: "TV Series Search List",
          envPath: process.env.REACT_APP_API_PATH_SEARCH_TV,
          subType: "tvseries",
        };
      }

      if (pathname.includes("celebs")) {
        type.current = {
          title: "Celebs Search List",
          envPath: process.env.REACT_APP_API_PATH_SEARCH_PEOPLE,
          subType: "celebs",
        };
      }

      path = `${type.current.envPath}${
        process.env.REACT_APP_API_KEY
      }&language=en-US&page=${page}${search.replace("?", "&")}`;

      const res = await axios.get(path);

      setResultSearch(res.data);
      // set timeout to prevent jerking
      setTimeout(() => {
        setLoading(false);
      }, [200]);
    } catch (error) {
      console.log(error);
    }
  });

  // get data when page, search was changed
  useEffect(() => {
    getResultSearch.current(page, search);
  }, [page, search]);

  return (
    <>
      <div className="MoviesListPage p-10">
        <h1 className="text-3xl font-medium text-[#cecece] text-center mb-10">
          {type?.current?.title}
        </h1>

        {/* loader */}
        <Loader
          classWidth="w-[50px]"
          classHeight="h-[50px]"
          classBorder="border-[4px]"
          classMargin="mt-10"
          loading={loading}
        />

        {/* not found msg */}
        {resultSearch?.results?.filter((film) => film.poster_path).length <=
          0 &&
          resultSearch?.results?.filter((celeb) => celeb.profile_path).length <=
            0 && (
            <h3
              className={`${
                loading ? "opacity-0 hidden" : "opacity-1 block"
              } transition-all text-primary text-center text-2xl mt-20`}
            >
              Not found
            </h3>
          )}

        {/* Film list */}
        {type.current.subType !== "celebs" &&
          resultSearch?.results?.filter((film) => film.poster_path).length >
            0 && (
            <div
              className={`${
                loading ? "opacity-0 hidden" : "opacity-1 grid"
              } grid-cols-4 gap-5 transition-all`}
            >
              {resultSearch?.results
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

        {/* Celebs list */}
        {type.current.subType === "celebs" &&
          resultSearch?.results?.filter((celeb) => celeb.profile_path).length >
            0 && (
            <div
              className={`${
                loading ? "opacity-0 hidden" : "opacity-1 grid"
              } grid-cols-5 gap-5 transition-all`}
            >
              {resultSearch?.results
                ?.filter((celeb) => celeb.profile_path)
                .map((celeb) => (
                  <CelebItem
                    key={celeb.id}
                    celebId={celeb.id}
                    name={celeb.name}
                    profilePath={celeb.profile_path}
                  />
                ))}
            </div>
          )}

        {/* pagination */}
        {resultSearch?.results?.filter((film) => film.poster_path).length >
        0 ? (
          <ReactPaginate
            pageCount={
              resultSearch?.total_pages >= 500 ? 500 : resultSearch?.total_pages
            }
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
                `/${type.current.subType}/search/page/${(
                  e.selected + 1
                ).toString()}${search ? search : ""}`
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

export default ResultSearchPage;
