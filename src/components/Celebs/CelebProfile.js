import axios from "axios";

import React from "react";

import { useRef, useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import FilmList from "../FilmList";
import Loader from "../Loader";

const CelebProfile = () => {
  const { celebId } = useParams();

  const [celebInfo, setCelebInfo] = useState();

  const [loading, setLoanding] = useState(true);

  const timeOutId = useRef();

  const navigate = useNavigate();

  const getCelebInfo = useRef(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_PATH_PEOPLE}${celebId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=movie_credits,tv_credits`
      );

      const moviesCast =
        res.data.movie_credits.cast &&
        res.data.movie_credits.cast.filter((movie) => movie.poster_path);

      const moviesCrew =
        res.data.movie_credits.crew &&
        res.data.movie_credits.crew.filter((movie) => movie.poster_path);

      // remove duplicate movie
      const movies = [
        ...new Map(
          [...moviesCast, ...moviesCrew].map((m) => [m.id, m])
        ).values(),
      ];

      const tvseriesCast =
        res.data.tv_credits.cast &&
        res.data.tv_credits.cast.filter((tv) => tv.poster_path);

      const tvseriesCrew =
        res.data.tv_credits.crew &&
        res.data.tv_credits.crew.filter((tv) => tv.poster_path);

      // remove duplicate tvseries
      const tvseries = [
        ...new Map(
          [...tvseriesCast, ...tvseriesCrew].map((m) => [m.id, m])
        ).values(),
      ];

      res.data = {
        ...res.data,
        movies,
        tvseries,
      };

      setCelebInfo(res.data);

      timeOutId.current = setTimeout(() => {
        setLoanding(false);
      }, 300);
    } catch (error) {
      console.log(error);
      setLoanding(false);
      navigate("/error");
    }
  });

  useEffect(() => {
    getCelebInfo.current();

    return () => {
      clearTimeout(timeOutId.current);
    };
  }, []);

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

      <div
        className={`${
          loading ? "hidden opacity-0 " : "opacity-1 block"
        } CelebProfile mt-[74px] grid grid-cols-1 gap-y-4 px-3 py-8 pb-[90px] text-[#ececec] md:px-5 lg:mt-0 lg:grid-cols-12 lg:gap-y-14 lg:gap-x-10 lg:p-10`}
      >
        <div className="col-span-1 lg:col-span-4">
          <img
            className="mx-auto w-[70%] md:w-[50%] lg:w-full"
            loading="lazy"
            src={`${process.env.REACT_APP_API_PATH_IMG_W500}${celebInfo?.profile_path}`}
            alt="profile img"
          />
        </div>

        <div className="col-span-1 flex flex-col gap-y-2 text-center lg:col-span-8 lg:mt-5 lg:gap-y-4 lg:text-left">
          <h1 className="text-3xl lg:text-5xl ">{celebInfo?.name}</h1>

          <h2 className="text-xl text-[#b5b5b5] lg:text-2xl">
            {celebInfo?.birthday && celebInfo?.deathday
              ? `(${celebInfo?.birthday} / ${celebInfo?.deathday})`
              : `(${celebInfo?.birthday})`}
            {celebInfo?.place_of_birth ? ` - ${celebInfo?.place_of_birth}` : ""}
          </h2>

          {celebInfo?.biography ? (
            <p className="mt-4 px-1 text-justify leading-[28px] lg:px-0">
              {celebInfo?.biography}
            </p>
          ) : (
            <h3 className="text-xl text-primary 2xl:text-2xl">
              Info not found
            </h3>
          )}
        </div>

        <div className="col-span-1 mt-3 lg:col-span-12 lg:mt-0">
          <FilmList
            title="Movies"
            specifyClass="moviesCelebProfile"
            type="movies"
            films={celebInfo?.movies}
          />
        </div>

        <div className="col-span-1 lg:col-span-12">
          <FilmList
            title="TV Series"
            specifyClass="tvseriesCelebProfile"
            type="tvseries"
            films={celebInfo?.tvseries}
          />
        </div>
      </div>
    </>
  );
};

export default CelebProfile;
