import React, { useEffect, useState } from "react";

import { AiFillStar } from "react-icons/ai";

import PropTypes from "prop-types";

import posterImgNotFound from "../../assets/images/poster_not_found.jpg";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const SearchSideBarItem = ({ film, type, showSearchOnMobile }) => {
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
        showSearchOnMobile(false);
        navigate(`/${type === "movie" ? "movies" : "tvseries"}/${film?.id}`);
      }}
      className="SearchSideBarItem grid grid-cols-12 rounded-[20px] bg-[#33292E] bg-opacity-60 p-3 text-[#ECECEC] transition-all hover:scale-105 hover:cursor-pointer"
    >
      <img
        src={
          film?.poster_path
            ? `${process.env.REACT_APP_API_PATH_IMG_W500}${film?.poster_path}`
            : posterImgNotFound
        }
        alt="poster film"
        className="col-span-3 my-auto w-full rounded-[10px] object-cover lg:col-span-4 lg:h-[145px] 2xl:col-span-3 2xl:h-[135px]"
      />

      <div className="grid-row-4 col-span-9 ml-[10px] grid lg:col-span-8 2xl:col-span-9">
        <h4 className="row-span-1 truncate text-base 2xl:text-[17px]">
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

        <div className="row-span-1 flex flex-wrap gap-x-2 gap-y-1 2xl:flex-nowrap 2xl:gap-y-0">
          {genres?.map((genre) => (
            <p
              onClick={(e) => {
                e.stopPropagation();
                showSearchOnMobile(false);
                navigate(
                  `/${
                    type === "movie" ? "movies" : "tvseries"
                  }/list/page/1?with_genres=${genre?.id?.toString()}`
                );
              }}
              key={genre?.id}
              className={`${
                genres.length > 1 ? "flex-1" : ""
              } flex items-center justify-center rounded-[10px] border-2 border-[#474749] px-2 py-[2px] text-center text-sm transition-all hover:cursor-pointer hover:border-white 2xl:py-0 2xl:text-[13.5px]`}
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
