import axios from "axios";

import React, { useRef, useState } from "react";

import { useEffect } from "react";

import { AiFillStar } from "react-icons/ai";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import FilmList from "../FilmList";
import FDActorList from "./FDActorList";
import FDTrailerList from "./FDTrailerList";

import coverImgNotFound from "../../assets/images/cover_not_found.jpg";
import posterImgNotFound from "../../assets/images/poster_not_found.jpg";
import { useContext } from "react";
import { AccountStateContext } from "../../App";

const FilmDetails = () => {
  const [loading, setLoading] = useState(false);

  const [loadingBtnWatchList, setLoadingBtnWatchList] = useState(false);
  const [loadingBtnFavorite, setLoadingBtnFavorite] = useState(false);

  const [data, setData] = useState({});

  const type = useRef("");

  const navigate = useNavigate();

  const { accountState, setAccountState } = useContext(AccountStateContext);

  let { pathname } = useLocation();
  let { filmId } = useParams();

  const userId = localStorage.getItem("user_id");
  const sessionId = localStorage.getItem("session_id");

  const watchlistClickHandler = async () => {
    try {
      setLoadingBtnWatchList(true);
      const mediaType = pathname.includes("tvseries") ? "tv" : "movie";
      await axios.post(
        `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${userId}/watchlist?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`,
        {
          media_type: mediaType,
          media_id: filmId,
          watchlist: !accountState.watchlist,
        },
        { "Content-Type": "application/json;charset=utf-8" }
      );

      setAccountState((prevState) => ({
        ...prevState,
        watchlist: !prevState.watchlist,
        changed: "watchlist",
        mediaType,
      }));

      setLoadingBtnWatchList(false);
    } catch (error) {
      console.log(error);
    }
  };

  const favoriteClickHandler = async () => {
    try {
      setLoadingBtnFavorite(true);
      const mediaType = pathname.includes("tvseries") ? "tv" : "movie";
      await axios.post(
        `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${userId}/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`,
        {
          media_type: mediaType,
          media_id: filmId,
          favorite: !accountState.favorite,
        },
        { "Content-Type": "application/json;charset=utf-8" }
      );

      setAccountState((prevState) => ({
        ...prevState,
        favorite: !prevState.favorite,
        changed: "favorite",
        mediaType,
      }));

      setLoadingBtnFavorite(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = useRef(async (filmId, pathname) => {
    // get API path base on type(movies, tvseries)
    setLoading(true);
    const path = pathname.includes("tvseries")
      ? process.env.REACT_APP_API_PATH_TVSERIES
      : process.env.REACT_APP_API_PATH_MOVIES;

    try {
      // build API path
      const res = await axios.get(
        `${path}${filmId}?api_key=${process.env.REACT_APP_API_KEY}${
          sessionId ? `&session_id=${sessionId}` : ""
        }&append_to_response=videos,credits,${
          type.current === "movies" ? "release_dates" : "content_ratings"
        },${sessionId ? "account_states" : ""},similar`
      );

      // Add or remove film in favorite and watchlist
      if (userId) {
        setAccountState({
          watchlist: res.data.account_states.watchlist,
          favorite: res.data.account_states.favorite,
        });
      }

      setData((prevData) => {
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

        const backdrop_path_full = res.data.backdrop_path
          ? `${process.env.REACT_APP_API_PATH_IMG_ORIGINAL}${res.data?.backdrop_path}`
          : coverImgNotFound;

        res.data = {
          ...res.data,
          vote_average,
          director,
          backdrop_path_full,
        };
        return res.data;
      });

      setTimeout(() => {
        setLoading(false);
      }, [300]);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    // set type
    type.current = pathname.includes("tvseries") ? "tvseries" : "movies";
    // call function getData
    getData.current(filmId, pathname);
  }, [pathname, filmId]);

  return (
    <>
      {/* loader */}
      <div
        className={`${
          loading ? "opacity-1 block" : "opacity-0 hidden"
        }  w-[50px] h-[50px] border-[4px] border-y-primary border-l-primary border-r-transparent rounded-full animate-spin mx-auto mt-10 transtion-all`}
      ></div>

      <div
        className={`${
          loading ? "opacity-0 hidden " : "opacity-1 block"
        } FilmDetail relative transition-all grid grid-cols-1 gap-y-12`}
      >
        {/* banner */}
        <div
          className="grid grid-cols-12 gap-10 px-10 my-auto bg-cover py-16 coverImgFilmDetails relative"
          style={{
            backgroundImage: `url(${data?.backdrop_path_full})`,
          }}
        >
          <div className="col-span-4 z-50">
            <img
              className="w-full  object-cover text-primary"
              loading="lazy"
              src={
                data?.poster_path
                  ? `${process.env.REACT_APP_API_PATH_IMG_W500}${data?.poster_path}`
                  : posterImgNotFound
              }
              alt="poster img not found"
            />
          </div>

          <div className="flex flex-col justify-between text-[#ececec] col-span-8 mt-5 z-50">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-5xl ">
                {type.current === "movies" ? data?.title : data?.name}
              </h1>

              <h2 className="text-[#b5b5b5] text-2xl">
                {type.current === "movies"
                  ? data?.original_title
                  : data?.original_name}
                (
                {new Date(
                  type.current === "movies"
                    ? data?.release_date
                    : data?.first_air_date
                ).getFullYear()}
                )
              </h2>

              <p>
                <span className={`${parseInt(data?.hours) ? "" : "hidden"}`}>
                  {data?.hours} hour{" "}
                </span>
                <span
                  className={`${parseInt(data?.minutes) ? "" : "hidden"} mr-5`}
                >
                  {data?.minutes} minutes
                  {type.current === "tvseries" ? "/episode" : ""}
                </span>
                {data?.certification && (
                  <span className="bg-[#363636] px-2 rounded-[6px]">
                    {data?.certification}
                  </span>
                )}
              </p>

              <p className="flex items-center">
                <AiFillStar className="text-yellow-400 text-[20px] inline-block mr-1" />
                {data?.vote_average ? data?.vote_average : "0"}
              </p>
            </div>

            <div className="mt-5">
              {data?.director && (
                <p className="mb-1">
                  <span className="uppercase text-[#b5b5b5] mr-2">
                    Director:
                  </span>
                  {data?.director}
                </p>
              )}

              <p className="mb-1">
                <span className="uppercase text-[#b5b5b5] mr-2">Nation:</span>
                {data?.production_countries
                  ?.map((country) => country.name)
                  .join(", ")}
              </p>

              <p className="mb-1">
                <span className="uppercase text-[#b5b5b5] mr-2">
                  Release date:
                </span>
                {type.current === "movies"
                  ? data?.release_date
                  : data?.first_air_date}
              </p>

              <p className="leading-[24px] mt-5 text-justify">
                {data?.overview}
              </p>
            </div>

            <div className="flex justify-between gap-x-4 mt-10 ">
              <div className="flex gap-x-2">
                {userId && (
                  <button
                    onClick={watchlistClickHandler}
                    className="group flex justify-center items-center bg-[#292326] w-10 h-10  bg-opacity-90 px-2 py-2 rounded-xl transition-all hover:bg-gray-500"
                  >
                    {loadingBtnWatchList && (
                      <div className="mx-auto w-4 h-4 border-2 border-primary border-t-2 border-t-transparent rounded-full animate-spin"></div>
                    )}

                    {accountState?.watchlist && !loadingBtnWatchList && (
                      <MdOutlineRemove className="text-xl group-hover:text-2xl transition-all" />
                    )}

                    {!accountState?.watchlist && !loadingBtnWatchList && (
                      <MdOutlineAdd className="text-xl group-hover:text-2xl transition-all" />
                    )}
                  </button>
                )}

                {userId && (
                  <button
                    className={`${
                      accountState?.favorite
                        ? "text-primary  hover:text-[#ececec]"
                        : " hover:text-primary"
                    } group flex justify-center items-center w-10 h-10  bg-[#292326] bg-opacity-90 px-2 py-2 rounded-full transition-all hover:opacity-100 hover:bg-transparent`}
                    onClick={favoriteClickHandler}
                  >
                    {loadingBtnFavorite && (
                      <div className="mx-auto w-4 h-4 border-2 border-primary border-t-2 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {!loadingBtnFavorite && (
                      <FaHeart className="text-xl group-hover:text-2xl transition-all" />
                    )}
                  </button>
                )}
              </div>
              <div className="flex gap-x-5">
                {data?.genres?.map((genre) => {
                  return (
                    <span
                      key={genre.id}
                      className="px-[10px] py-[5px] border-2 rounded-[10px] border-[#474749] bg-[#292326] bg-opacity-70 hover:cursor-pointer hover:border-white transition-all"
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
        <div className="text-[#ececec] col-span-12 relative px-10">
          <h4 className="mb-10 font-medium text-2xl">Actors</h4>
          {data?.credits?.cast?.filter((actor) => actor.profile_path).length >
          0 ? (
            <FDActorList
              specifyClass="film-details-actor-list"
              actors={data?.credits?.cast}
            />
          ) : (
            <h3 className="text-primary text-center text-2xl">
              Actor not found
            </h3>
          )}
        </div>

        {/* trailers list */}
        <div className="text-[#ececec] col-span-12 relative px-10">
          <h4 className="mb-10 font-medium text-2xl">Trailers</h4>
          {data?.videos?.results.length > 0 ? (
            <FDTrailerList
              specifyClass="film-details-trailer-list"
              trailers={data?.videos?.results}
            />
          ) : (
            <h3 className="text-primary text-center text-2xl">
              Trailer not found
            </h3>
          )}
        </div>

        {/* similar films list */}
        <div className="text-[#ececec] col-span-12 relative px-10">
          <FilmList
            title={
              type.current === "movies" ? "Similar Movies" : "Similar TV Series"
            }
            type={type.current}
            films={data?.similar?.results?.filter((film) => film.poster_path)}
            specifyClass="film-details-similar-movies-list"
          />
        </div>
      </div>
    </>
  );
};

export default FilmDetails;
