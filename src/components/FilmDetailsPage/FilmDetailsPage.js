import React, { useRef, useState, useEffect } from "react";

import axios from "axios";

import { AiFillStar } from "react-icons/ai";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import FilmList from "../common/FilmList";
import FDActorList from "./FDActorList";
import FDTrailerList from "./FDTrailerList";
import Loader from "../common/Loader";

import coverImgNotFound from "../../assets/images/cover_not_found.jpg";
import posterImgNotFound from "../../assets/images/poster_not_found.jpg";

import useBuildApiPath from "../../hooks/useBuildApiPath";

import {
  updateAccountBothList,
  updateAccountWatchList,
  updateAccountFavorite,
} from "../../redux/slices/accountFilmStateSlice";
import { useDispatch, useSelector } from "react-redux";

const FilmDetailsPage = () => {
  const [loading, setLoading] = useState(true);

  const [filmDetails, setFilmDetails] = useState({});

  const type = useRef("");

  const navigate = useNavigate();

  const accountFilmState = useSelector((state) => state.accountFilmState);
  const dispatch = useDispatch();

  let { pathname } = useLocation();
  let { filmId } = useParams();

  const loginInfo = useSelector((state) => state.loginInfo);

  const timeOutId = useRef();

  const filmPosterPath = useBuildApiPath({
    tag: "Img500",
    imgPath: filmDetails?.poster_path,
  });

  const filmImgBannerPath = useBuildApiPath({
    tag: "ImgOriginal",
    imgPath: filmDetails?.backdrop_path,
  });

  const watchlistClickHandler = () => {
    const mediaType = pathname.includes("tvseries") ? "tv" : "movie";
    dispatch(
      updateAccountWatchList({
        watchlist: accountFilmState.watchlist,
        changed: "watchlist",
        mediaType: mediaType,
        user_id: loginInfo.user_id,
        session_id: loginInfo.session_id,
        filmId: filmId,
      })
    );
  };

  const favoriteClickHandler = () => {
    const mediaType = pathname.includes("tvseries") ? "tv" : "movie";

    dispatch(
      updateAccountFavorite({
        favorite: accountFilmState.favorite,
        changed: "favorite",
        mediaType: mediaType,
        user_id: loginInfo.user_id,
        session_id: loginInfo.session_id,
        filmId: filmId,
      })
    );
  };

  useEffect(() => {
    const getFilmDetails = async (filmId, pathname) => {
      try {
        // get API path base on type(movies, tvseries)
        const path = pathname.includes("tvseries")
          ? process.env.REACT_APP_API_PATH_TVSERIES
          : process.env.REACT_APP_API_PATH_MOVIES;

        // build API path
        const res = await axios.get(
          `${path}${filmId}?api_key=${process.env.REACT_APP_API_KEY}${
            loginInfo.session_id ? `&session_id=${loginInfo.session_id}` : ""
          }&append_to_response=videos,credits,${
            type.current === "movies" ? "release_dates" : "content_ratings"
          },${loginInfo.session_id ? "account_states" : ""},similar`
        );

        // Add or remove film in favorite and watchlist
        if (loginInfo.user_id) {
          dispatch(
            updateAccountBothList({
              changed: "all",
              watchlist: res.data.account_states.watchlist,
              favorite: res.data.account_states.favorite,
            })
          );
        }

        setFilmDetails((prevData) => {
          // refactor data
          if (type.current === "movies") {
            // refactor movie's time
            const [hours, minutes] = [
              Math.floor(res.data.runtime / 60),
              res.data.runtime % 60,
            ];

            // get certification
            const USCertification = res.data.release_dates?.results?.filter(
              (item) => item.iso_3166_1 === "US"
            );
            const certification = USCertification[0]?.release_dates?.filter(
              (item) => item.certification !== ""
            )[0]?.certification;

            res.data = {
              ...res.data,
              hours,
              minutes,
              certification,
            };
          } else {
            const [hours, minutes] = [
              Math.floor(res.data.episode_run_time / 60),
              res.data.episode_run_time % 60,
            ];

            const certification = res.data.content_ratings.results.filter(
              (item) => item.iso_3166_1 === "US"
            )[0]?.rating;

            res.data = {
              ...res.data,
              hours,
              minutes,
              certification,
            };
          }

          // refactor vote average
          const vote_average = res.data.vote_average.toString().slice(0, 3);

          // get director
          const director = res.data.credits.crew
            .filter((person) => person.known_for_department === "Directing")
            .map((person) => person.name)
            .join(", ");

          res.data = {
            ...res.data,
            vote_average,
            director,
          };
          return res.data;
        });

        timeOutId.current = setTimeout(() => {
          setLoading(false);
        }, [200]);
      } catch (error) {
        console.log(error);
        setLoading(false);
        navigate("/error");
      }
    };

    setLoading(true);
    // set type
    type.current = pathname.includes("tvseries") ? "tvseries" : "movies";
    // call function getData
    getFilmDetails(filmId, pathname);

    return () => {
      clearTimeout(timeOutId.current);
    };
  }, [
    pathname,
    filmId,
    dispatch,
    loginInfo.session_id,
    loginInfo.user_id,
    navigate,
  ]);

  useEffect(() => {
    // nav to error page
    if (accountFilmState.error) {
      navigate("/error");
    }
  }, [navigate, accountFilmState.error]);

  return (
    <>
      {/* loader */}
      <Loader
        classWidth="w-[50px]"
        classHeight="h-[50px]"
        classBorder="border-[4px]"
        classMargin="mt-[100px] lg:mt-10"
        loading={loading}
      />

      {!loading && (
        <div className="FilmDetail relative mt-[74px] grid grid-cols-1 gap-y-8 pb-[90px] transition-all lg:mt-0 lg:gap-y-12 lg:pb-0">
          {/* banner */}
          <div
            className="coverImgFilmDetails relative col-span-1 grid bg-cover px-4 py-8 md:px-5 lg:my-auto lg:grid-cols-12 lg:gap-10 lg:py-16 lg:px-10 2xl:py-10"
            style={{
              backgroundImage: `url(${
                filmDetails?.backdrop_path
                  ? filmImgBannerPath
                  : coverImgNotFound
              })`,
            }}
          >
            <div className="z-50 lg:col-span-5 2xl:col-span-4">
              <img
                className="mx-auto w-[70%] object-cover text-primary sm:w-[50%] md:w-[40%] lg:mx-0 lg:w-full"
                src={
                  filmDetails?.poster_path ? filmPosterPath : posterImgNotFound
                }
                alt="poster img not found"
              />
            </div>

            <div className="z-50 mt-8 flex flex-col justify-between text-[#ececec] lg:col-span-7 lg:mt-5 2xl:col-span-8">
              <div className="flex flex-col gap-y-2 text-center lg:gap-y-4 lg:text-left">
                <h1 className="text-3xl lg:text-5xl">
                  {type.current === "movies"
                    ? filmDetails?.title
                    : filmDetails?.name}
                </h1>

                <h2 className="text-xl text-[#b5b5b5] lg:text-2xl">
                  {type.current === "movies"
                    ? filmDetails?.original_title
                    : filmDetails?.original_name}
                  (
                  {new Date(
                    type.current === "movies"
                      ? filmDetails?.release_date
                      : filmDetails?.first_air_date
                  ).getFullYear()}
                  )
                </h2>

                <p>
                  <span
                    className={`${
                      parseInt(filmDetails?.hours) ? "" : "hidden"
                    }`}
                  >
                    {filmDetails?.hours} hour{" "}
                  </span>
                  <span
                    className={`${
                      parseInt(filmDetails?.minutes) ? "" : "hidden"
                    } mr-5`}
                  >
                    {filmDetails?.minutes} minutes
                    {type.current === "tvseries" ? "/episode" : ""}
                  </span>
                  {filmDetails?.certification && (
                    <span className="rounded-[6px] bg-[#363636] px-2">
                      {filmDetails?.certification}
                    </span>
                  )}
                </p>

                <p className="flex items-center justify-center lg:justify-start">
                  <AiFillStar className="mr-1 inline-block text-[20px] text-yellow-400" />
                  {filmDetails?.vote_average ? filmDetails?.vote_average : "0"}
                </p>
              </div>

              <div className="mt-5">
                {filmDetails?.director && (
                  <p className="mb-1">
                    <span className="mr-2 uppercase text-[#b5b5b5]">
                      Director:
                    </span>
                    {filmDetails?.director}
                  </p>
                )}

                <p className="mb-1">
                  <span className="mr-2 uppercase text-[#b5b5b5]">Nation:</span>
                  {filmDetails?.production_countries
                    ?.map((country) => country.name)
                    .join(", ")}
                </p>

                <p className="mb-1">
                  <span className="mr-2 uppercase text-[#b5b5b5]">
                    Release date:
                  </span>
                  {type.current === "movies"
                    ? filmDetails?.release_date
                    : filmDetails?.first_air_date}
                </p>

                <p className="mt-5 text-justify leading-[24px]">
                  {filmDetails?.overview}
                </p>
              </div>

              <div className="mt-10 flex justify-between gap-x-4 ">
                <div className="flex gap-x-2">
                  {loginInfo.user_id && (
                    <button
                      onClick={watchlistClickHandler}
                      className="group flex h-10 w-10 items-center justify-center rounded-xl  bg-[#292326] bg-opacity-90 px-2 py-2 transition-all lg:hover:bg-gray-500"
                    >
                      <Loader
                        classWidth="w-4"
                        classHeight="h-4"
                        classBorder="border-2"
                        classMargin="mt-0"
                        loading={accountFilmState.loadingBtnWatchList}
                      />

                      {accountFilmState?.watchlist &&
                        !accountFilmState.loadingBtnWatchList && (
                          <MdOutlineRemove className="text-xl transition-all lg:group-hover:text-2xl" />
                        )}

                      {!accountFilmState?.watchlist &&
                        !accountFilmState.loadingBtnWatchList && (
                          <MdOutlineAdd className="text-xl transition-all lg:group-hover:text-2xl" />
                        )}
                    </button>
                  )}

                  {loginInfo.user_id && (
                    <button
                      className={`${
                        accountFilmState?.favorite
                          ? "text-primary  lg:hover:text-[#ececec]"
                          : " lg:hover:text-primary"
                      } group flex h-10 w-10 items-center justify-center  rounded-full bg-[#292326] bg-opacity-90 px-2 py-2 transition-all lg:hover:bg-transparent lg:hover:opacity-100`}
                      onClick={favoriteClickHandler}
                    >
                      <Loader
                        classWidth="w-4"
                        classHeight="h-4"
                        classBorder="border-2"
                        classMargin="mt-0"
                        loading={accountFilmState.loadingBtnFavorite}
                      />

                      {!accountFilmState.loadingBtnFavorite && (
                        <FaHeart className="text-xl transition-all lg:group-hover:text-2xl" />
                      )}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap justify-end gap-x-5 gap-y-3">
                  {filmDetails?.genres?.map((genre) => {
                    return (
                      <span
                        key={genre.id}
                        className="my-auto rounded-[10px] border-2 border-[#474749] bg-[#292326] bg-opacity-70 px-[10px] py-[5px] text-sm transition-all hover:cursor-pointer hover:border-white lg:text-base"
                        onClick={() => {
                          navigate(
                            `/${type.current}/list/page/1?with_genres=${genre.id}`
                          );
                        }}
                      >
                        {genre.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* actors list */}
          <div className="relative col-span-1 mx-3 text-[#ececec] lg:col-span-12 lg:mx-10">
            <h4 className="mb-6 text-xl font-medium lg:mb-10 2xl:text-2xl">
              Actors
            </h4>
            {filmDetails?.credits?.cast?.length > 0 ? (
              <FDActorList
                specifyClass="film-details-actor-list"
                actors={filmDetails?.credits?.cast}
              />
            ) : (
              <h3 className="text-center text-xl text-primary 2xl:text-2xl">
                Actor not found
              </h3>
            )}
          </div>

          {/* trailers list */}
          <div className="relative col-span-1 mx-3 text-[#ececec] lg:col-span-12 lg:mx-10">
            <h4 className="mb-6 text-xl font-medium lg:mb-10 2xl:text-2xl">
              Trailers
            </h4>
            {filmDetails?.videos?.results.length > 0 ? (
              <FDTrailerList
                specifyClass="film-details-trailer-list"
                trailers={filmDetails?.videos?.results}
              />
            ) : (
              <h3 className="text-center text-xl text-primary 2xl:text-2xl">
                Trailer not found
              </h3>
            )}
          </div>

          {/* similar films list */}
          <div className="relative col-span-1 mx-3 text-[#ececec] lg:col-span-12 lg:mx-10">
            <FilmList
              title={
                type.current === "movies"
                  ? "Similar Movies"
                  : "Similar TV Series"
              }
              type={type.current}
              films={filmDetails?.similar?.results?.filter(
                (film) => film.poster_path
              )}
              specifyClass="film-details-similar-movies-list"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FilmDetailsPage;
