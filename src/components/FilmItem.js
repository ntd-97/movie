import { AiFillStar } from "react-icons/ai";
import { BsPlayCircleFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import posterImgNotFound from "../assets/images/poster_not_found.jpg";

const FilmItem = ({ type, filmID, info }) => {
  const navigate = useNavigate();

  const btnFilmClickHandler = () => {
    navigate(`/${type}/${filmID?.toString()}`);
  };

  return (
    <div className="FilmItem relative rounded-[20px] bg-[#33292E] bg-opacity-60 p-3 text-[#ECECEC] transition-all hover:scale-95">
      <img
        loading="lazy"
        className="mb-3 h-[230px] w-full rounded-[10px] object-cover lg:mb-4 lg:h-[250px]  2xl:h-[310px]"
        src={
          info?.poster_path
            ? `${process.env.REACT_APP_API_PATH_IMG_W500}${info?.poster_path}`
            : posterImgNotFound
        }
        alt="poster film"
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
        onClick={btnFilmClickHandler}
        className="flex w-full items-center justify-center rounded-[10px] bg-primary px-5 py-2 font-medium outline-none transition-all hover:bg-red-400"
      >
        Watch now
        <BsPlayCircleFill className="ml-2 hidden text-xl lg:inline-block" />
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
