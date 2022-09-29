import { AiFillStar } from "react-icons/ai";
import { BsPlayCircleFill } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import posterImgNotFound from "../assets/images/poster_not_found.jpg";

const FilmItem = ({ type, filmID, info }) => {
  const navigate = useNavigate();

  const btnFilmClickHandler = () => {
    navigate(`/${type}/${filmID}`);
  };

  return (
    <div className="FilmItem relative rounded-[20px] bg-[#33292E] bg-opacity-60 p-3 text-[#ECECEC]">
      <img
        loading="lazy"
        className="object-cover w-full h-[350px] rounded-[10px] mb-4"
        src={
          info.poster_path
            ? `${process.env.REACT_APP_API_PATH_IMG_W500}${info.poster_path}`
            : posterImgNotFound
        }
        alt="poster film"
      />

      <h3 className="mb-3 truncate">
        {type === "tvseries" ? info.name : info.title}
      </h3>

      <div className="mb-4 flex justify-between items-center text-sm text-[#7D7D7D] font-medium">
        <span>
          {new Date(
            type === "tvseries" ? info.first_air_date : info.release_date
          ).getFullYear()}
        </span>

        <span className="flex items-center">
          {info.vote_average > 0
            ? info.vote_average.toString().slice(0, 3)
            : "0"}
          <AiFillStar className="text-yellow-400 text-[20px] inline-block ml-1" />
        </span>
      </div>

      <button className="absolute top-5 right-5 bg-[#4B444C] opacity-60 px-2 py-2 rounded-full transition-all hover:bg-gray-500 hover:opacity-100">
        <MdOutlineAdd className="text-2xl" />
      </button>

      <button
        onClick={btnFilmClickHandler}
        className="bg-primary px-5 py-2 rounded-[10px] w-full outline-none font-medium transition-all hover:bg-red-400 flex justify-center items-center"
      >
        Watch now
        <BsPlayCircleFill className="inline-block text-xl ml-2" />
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
