import { AiFillStar } from "react-icons/ai";
import { BsPlayCircleFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import posterImgNotFound from "../../assets/images/poster_not_found.jpg";

import { useState } from "react";

const FilmItem = ({ type, filmID, info }) => {
  const navigate = useNavigate();

  const clickFilmItemHandler = (event) => {
    navigate(`/${type}/${filmID?.toString()}`);
  };

  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      onClick={clickFilmItemHandler}
      className="FilmItem relative select-none rounded-[20px] bg-[#33292E] bg-opacity-60 p-3 text-[#ECECEC] transition-all hover:scale-95 hover:cursor-pointer"
    >
      <img
        loading="lazy"
        className={`${
          imgLoaded ? "" : "animate-pulse bg-[#252229]"
        } mb-3 h-[230px] w-full rounded-[10px] object-cover sm:h-[250px] md:h-[250px] lg:mb-4 xl:h-[250px]  2xl:h-[310px]`}
        src={
          info?.poster_path
            ? `${process.env.REACT_APP_API_PATH_IMG_W500}${info?.poster_path}`
            : posterImgNotFound
        }
        alt="poster film"
        onLoad={() => {
          setImgLoaded(true);
        }}
      />

      <h3 className="mb-2 truncate lg:mb-3 lg:text-base 2xl:text-lg">
        {type === "tvseries" ? info?.name : info?.title}
      </h3>

      <div className="mb-3 flex items-center justify-between text-sm font-medium text-[#7D7D7D] lg:mb-4">
        <span>
          {new Date(
            type === "tvseries" ? info?.first_air_date : info?.release_date
          )
            .getFullYear()
            .toString()}
        </span>

        <span className="flex items-center">
          {info?.vote_average > 0
            ? info?.vote_average?.toString().slice(0, 3)
            : "0"}
          <AiFillStar className="ml-1 inline-block text-[20px] text-yellow-400" />
        </span>
      </div>

      <button
        onClick={clickFilmItemHandler}
        className="flex w-full items-center justify-center rounded-[10px] bg-primary py-2 font-medium outline-none transition-all hover:bg-red-400"
      >
        Watch now
        <BsPlayCircleFill className="ml-2 hidden text-xl xl:inline-block" />
      </button>
    </div>
  );
};

FilmItem.propTypes = {
  type: PropTypes.string,
  filmID: PropTypes.number,
  info: PropTypes.object,
};

export default FilmItem;
