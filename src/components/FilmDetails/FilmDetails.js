import axios from "axios";

import React, { useRef, useState } from "react";

import { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";

import { useLocation, useParams } from "react-router-dom";

import FilmList from "../FilmList";
import FDActorList from "./FDActorList";
import FDTrailerList from "./FDTrailerList";

const FilmDetails = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const type = useRef();

  let { pathname } = useLocation();
  let { filmId } = useParams();

  const getData = useRef(async (filmId, pathname) => {
    const path = pathname.includes("tvseries")
      ? process.env.REACT_APP_API_PATH_TVSERIES
      : process.env.REACT_APP_API_PATH_MOVIES;

    try {
      const res = await axios.get(
        `${path}${filmId}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,credits,release_dates,similar`
      );

      console.log(res.data);

      setData((prevData) => {
        if (type.current === "movies") {
          const [hours, minutes] = [
            Math.floor(res.data.runtime / 60),
            res.data.runtime % 60,
          ];

          const USCertification = res.data.release_dates.results.filter(
            (item) => item.iso_3166_1 === "US"
          );

          const certification = USCertification[0].release_dates.filter(
            (item) => item.certification !== ""
          )[0].certification;

          res.data = {
            ...res.data,
            hours,
            minutes,
            certification,
          };
        }

        const vote_average = res.data.vote_average.toString().slice(0, 3);

        const director = res.data.credits.crew
          .filter((person) => person.known_for_department === "Directing")
          .map((person) => person.name)
          .toString();

        res.data = {
          ...res.data,
          vote_average,
          director,
        };

        console.log(res.data);
        return res.data;
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    setLoading(true);
    type.current = pathname.includes("tvseries") ? "tvseries" : "movies";
    getData.current(filmId, pathname);
  }, [pathname, filmId]);

  return (
    <>
      <div
        className={`${
          loading ? "opacity-1 block" : "opacity-0 hidden"
        }  w-[50px] h-[50px] border-[4px] border-y-primary border-l-primary border-r-transparent rounded-full animate-spin mx-auto mt-10 transtion-all`}
      ></div>

      <div
        className={`${
          loading ? "opacity-0 hidden " : "opacity-1 block"
        } FilmDetail relative transition-all grid grid-cols-1 gap-y-20`}
      >
        <div className="relative coverImgFilmDetails">
          <img
            className="top-0 left-0 object-cover w-full h-[70vh] text-primary"
            src={`${process.env.REACT_APP_API_PATH_IMG_ORIGINAL}${data?.backdrop_path}`}
            alt="cover img not found"
          />
          <div className="absolute inset-0 grid grid-cols-12 gap-10 px-10 h-[75%] my-auto">
            <div className="col-span-4">
              <img
                className="w-full  object-cover text-primary"
                src={`${process.env.REACT_APP_API_PATH_IMG_W500}${data?.poster_path}`}
                alt="poster img not found"
              />
            </div>

            <div className="flex flex-col justify-between text-[#ececec] col-span-8 mt-5">
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
                {type.current === "movies" && (
                  <p>
                    {data?.hours} hour {data?.minutes} minutes
                    <span className="bg-[#363636] px-2 rounded-[6px] ml-5">
                      {data?.certification}
                    </span>
                  </p>
                )}
                <p className="flex items-center">
                  <AiFillStar className="text-yellow-400 text-[20px] inline-block mr-1" />
                  {data?.vote_average}
                </p>
              </div>

              <div>
                <p className="mb-1">
                  <span className="uppercase text-[#b5b5b5] mr-2">
                    Director:
                  </span>
                  {data?.director}
                </p>
                <p className="mb-1">
                  <span className="uppercase text-[#b5b5b5] mr-2">Nation:</span>
                  {data?.production_countries
                    .map((country) => country.name)
                    .toString()}
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

              <div className="flex justify-end gap-x-4 mt-10">
                {data?.genres?.map((genre) => {
                  return (
                    <span
                      key={genre.id}
                      className="px-[10px] py-[5px] border-2 rounded-[10px] border-[#474749] bg-[#292326] bg-opacity-70 hover:cursor-pointer hover:border-white transition-all"
                    >
                      {genre.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="text-[#ececec] col-span-12 relative px-10">
          <h4 className="mb-10 font-medium text-2xl">Actors</h4>
          <FDActorList
            specifyClass="film-details-actor-list"
            actors={data?.credits?.cast}
          />
        </div>

        <div className="text-[#ececec] col-span-12 relative px-10">
          <h4 className="mb-10 font-medium text-2xl">Trailers</h4>
          <FDTrailerList
            specifyClass="film-details-trailer-list"
            trailers={data?.videos?.results}
          />
        </div>

        <div className="text-[#ececec] col-span-12 relative px-10">
          <FilmList
            title={
              type.current === "movies" ? "Similar Movies" : "Similar TV Series"
            }
            type={type.current}
            films={data?.similar.results}
            specifyClass="film-details-similar-movies-list"
          />
        </div>
      </div>
    </>
  );
};

export default FilmDetails;
