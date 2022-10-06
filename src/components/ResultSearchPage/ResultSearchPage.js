import axios from "axios";

import React, { useEffect, useRef, useState } from "react";

import FilmItem from "../FilmItem";

import ReactPaginate from "react-paginate";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import CelebItem from "../Celebs/CelebItem";

const ResultSearchPage = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();

  const navigate = useNavigate();
  let { pathname, search } = useLocation();
  let { page } = useParams();

  const type = useRef({});

  const getData = useRef(async (page, search) => {
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

      // set timeout to prevent jerking
      setTimeout(() => {
        setLoading(false);
        setData(res.data);
      }, [200]);
    } catch (error) {
      console.log(error);
    }
  });

  // get data when page, search was changed
  useEffect(() => {
    getData.current(page, search);
  }, [page, search]);

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

        {data?.results?.filter((film) => film.poster_path).length <= 0 &&
          data?.results?.filter((celeb) => celeb.profile_path).length <= 0 && (
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
          data?.results?.filter((film) => film.poster_path).length > 0 && (
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

        {/* Celebs list */}
        {type.current.subType === "celebs" &&
          data?.results?.filter((celeb) => celeb.profile_path).length > 0 && (
            <div
              className={`${
                loading ? "opacity-0 hidden" : "opacity-1 grid"
              } grid-cols-5 gap-5 transition-all`}
            >
              {data?.results
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
