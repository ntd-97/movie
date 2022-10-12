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

  const timeOutId = useRef();

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
      timeOutId.current = setTimeout(() => {
        setLoading(false);
      }, [200]);
    } catch (error) {
      console.log(error);
      setLoading(false);
      navigate("/error");
    }
  });

  // get data when page, search was changed
  useEffect(() => {
    getResultSearch.current(page, search);

    return () => {
      clearTimeout(timeOutId.current);
    };
  }, [page, search]);

  return (
    <>
      <div className="MoviesListPage mt-[100px] px-3 pb-[90px] md:px-5 lg:mt-0 lg:p-10">
        <h1 className="mb-7 text-center text-2xl font-medium text-[#cecece] lg:mb-10 2xl:text-3xl">
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
                loading ? "hidden opacity-0" : "opacity-1 block"
              } mt-20 text-center text-xl text-primary transition-all 2xl:text-2xl`}
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
                loading ? "hidden opacity-0" : "opacity-1 grid"
              } grid-cols-2 gap-3 transition-all sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5`}
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
                loading ? "hidden opacity-0" : "opacity-1 grid"
              } grid-cols-2 gap-3 transition-all sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}
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
            pageRangeDisplayed={2}
            marginPagesDisplayed={window.innerHeight <= 1024 ? 1 : 3}
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
