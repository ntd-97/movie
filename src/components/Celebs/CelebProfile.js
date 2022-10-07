import axios from "axios";

import React from "react";

import { useRef, useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import FilmList from "../FilmList";
import Loader from "../Loader";

const CelebProfile = () => {
  const { celebId } = useParams();

  const [data, setData] = useState();

  const [loading, setLoanding] = useState(true);

  const getData = useRef(async () => {
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

      setData(res.data);
      setLoanding(false);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getData.current();
  }, []);

  return (
    <>
      {/* loader */}
      <Loader
        classWidth="w-[50px]"
        classHeight="h-[50px]"
        classBorder="border-[4px]"
        classMargin="mt-10"
        loading={loading}
      />

      <div
        className={`${
          loading ? "opacity-0 hidden " : "opacity-1 block"
        } CelebProfile p-10 grid grid-cols-12 gap-x-10 gap-y-14 text-[#ececec]`}
      >
        <div className="col-span-4">
          <img
            loading="lazy"
            src={`${process.env.REACT_APP_API_PATH_IMG_W500}${data?.profile_path}`}
            alt="profile img"
          />
        </div>

        <div className="col-span-8 mt-5 flex flex-col gap-y-4">
          <h1 className="text-5xl ">{data?.name}</h1>

          <h2 className="text-[#b5b5b5] text-2xl">
            {data?.birthday && data?.deathday
              ? `(${data?.birthday} / ${data?.deathday})`
              : `(${data?.birthday})`}
            {data?.place_of_birth ? ` - ${data?.place_of_birth}` : ""}
          </h2>

          {data?.biography ? (
            <p className="leading-[28px] mt-4 text-justify">
              {data?.biography}
            </p>
          ) : (
            <h3 className="text-2xl text-primary">Info not found</h3>
          )}
        </div>

        <div className="col-span-12">
          <FilmList
            title="Movies"
            specifyClass="moviesCelebProfile"
            type="movies"
            films={data?.movies}
          />
        </div>

        <div className="col-span-12">
          <FilmList
            title="TV Series"
            specifyClass="tvseriesCelebProfile"
            type="tvseries"
            films={data?.tvseries}
          />
        </div>
      </div>
    </>
  );
};

export default CelebProfile;
