import React, { useEffect, useState } from "react";

import { AiFillStar } from "react-icons/ai";

import PropTypes from "prop-types";

import posterImgNotFound from "../../assets/images/poster_not_found.jpg";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const SearchSideBarItem = ({ film, type }) => {
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getGenres = async () => {
      const resGenres = await axios.get(
        `${process.env.REACT_APP_API_PATH_GENRES}${type}/list?api_key=${process.env.REACT_APP_API_KEY}`
      );

      const genresResult = film.genre_ids.map((genre) => {
        return resGenres.data.genres.find(
          (genreListItem) => genre === genreListItem.id
        );
      });

      setGenres(genresResult.slice(0, 3));
    };

    getGenres();
  }, [type, film]);

  return (
    <div
      onClick={() => {
        navigate(`/${type === "movie" ? "movies" : "tvseries"}/${film?.id}`);
      }}
      className="SearchSideBarItem grid rounded-[20px] bg-[#33292E] bg-opacity-60 p-3 text-[#ECECEC] transition-all hover:scale-105 hover:cursor-pointer lg:grid-cols-8 2xl:grid-cols-4"
    >
      <img
        src={
          film?.poster_path
            ? `${process.env.REACT_APP_API_PATH_IMG_W500}${film?.poster_path}`
            : posterImgNotFound
        }
        alt="poster film"
        className=" w-full rounded-[10px] object-cover lg:col-span-3 lg:max-h-[145px] 2xl:col-span-1 2xl:max-h-[135px]"
      />

      <div className="grid-row-4 ml-[10px] grid lg:col-span-5 2xl:col-span-3">
        <h4 className="row-span-1 truncate lg:text-base 2xl:text-[17px]">
          {type === "tv" ? film?.name : film?.title}
        </h4>
        <div className="items-top row-span-2 flex justify-between text-[13.5px] text-[#AFAFAF]">
          <p>
            {new Date(
              type === "tv" ? film?.first_air_date : film?.release_date
            ).getFullYear()}
          </p>
          <p>
            {film?.vote_average > 0
              ? film?.vote_average?.toString().slice(0, 3)
              : "0"}
            <AiFillStar className="ml-1 mb-1 inline-block text-[20px] text-yellow-400" />
          </p>
        </div>

        <div className="row-span-1 flex gap-x-2 lg:flex-wrap lg:gap-y-1">
          {genres?.map((genre) => (
            <p
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  `/${
                    type === "movie" ? "movies" : "tvseries"
                  }/list/page/1?with_genres=${genre?.id}`
                );
              }}
              key={genre?.id}
              className={`${
                genres.length > 1 ? "flex-1" : ""
              } lg flex items-center justify-center rounded-[10px] border-2 border-[#474749] px-2 text-center transition-all hover:cursor-pointer hover:border-white lg:py-1 lg:text-xs 2xl:text-[13.5px]`}
            >
              {genre?.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

SearchSideBarItem.propTypes = {
  type: PropTypes.string,
  film: PropTypes.object,
};

export default SearchSideBarItem;
