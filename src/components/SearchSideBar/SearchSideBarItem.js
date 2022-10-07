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
      className="SearchSideBarItem grid grid-cols-4 rounded-[20px] bg-[#33292E] bg-opacity-60 p-3 text-[#ECECEC] hover:cursor-pointer hover:scale-105 transition-all"
    >
      <img
        src={
          film?.poster_path
            ? `${process.env.REACT_APP_API_PATH_IMG_W500}${film?.poster_path}`
            : posterImgNotFound
        }
        alt="poster film"
        className="w-[100px] h-[120px]  rounded-[10px] object-cover col-span-1"
      />

      <div className="grid grid-row-4 col-span-3 ml-[10px]">
        <h4 className="text-[17px] truncate">
          {type === "tv" ? film?.name : film?.title}
        </h4>
        <div className="row-span-2 flex items-top justify-between text-[13.5px] text-[#AFAFAF]">
          <p>
            {new Date(
              type === "tv" ? film?.first_air_date : film?.release_date
            ).getFullYear()}
          </p>
          <p>
            {film?.vote_average > 0
              ? film?.vote_average?.toString().slice(0, 3)
              : "0"}
            <AiFillStar className="text-yellow-400 text-[20px] inline-block ml-1 mb-1" />
          </p>
        </div>

        <div className=" grid grid-cols-3 gap-x-2">
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
              className="flex justify-center items-center text-[13.5px] px-[10px] py-[5px] border-2 rounded-[10px] conte border-[#474749] hover:cursor-pointer hover:border-white transition-all"
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
