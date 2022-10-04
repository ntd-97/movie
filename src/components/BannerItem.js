import React from "react";

import { BsPlayCircleFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import coverImgNotFound from "../assets/images/cover_not_found.jpg";

import PropTypes from "prop-types";

const BannerItem = ({ type, filmID, info }) => {
  const navigate = useNavigate();

  const btnFilmClickHandler = () => {
    navigate(`/${type}/${filmID}`);
  };

  return (
    <div className="BannerItem relative">
      <img
        src={
          info.backdrop_path
            ? `${process.env.REACT_APP_API_PATH_IMG_ORIGINAL}${info.backdrop_path}`
            : coverImgNotFound
        }
        loading="lazy"
        alt="banner img not found"
        className="w-full h-[55vh] object-cover rounded-[20px] text-primary"
      />

      <div className="absolute bottom-8 left-8 text-white">
        <h2 className="text-4xl font-bold mb-5">
          {type === "tvseries" ? info.name : info.title}
        </h2>

        <div className="mb-5 flex items-center">
          <AiFillStar className="text-yellow-400 text-[26px] inline-block mr-2" />
          <p className="text-xl font-bold mr-1">
            {info.vote_average ? info.vote_average : "0"}
          </p>
          <p className="text-[#545454] font-bold ">/10</p>
        </div>

        <button
          className="flex items-center bg-primary px-10 py-2 rounded-[10px] outline-none font-medium transition-all hover:bg-red-400"
          onClick={btnFilmClickHandler}
        >
          Watch
          <BsPlayCircleFill className="inline-block text-xl ml-1" />
        </button>
      </div>
    </div>
  );
};

BannerItem.propTypes = {
  type: PropTypes.string,
  filmID: PropTypes.number,
  info: PropTypes.object,
};

export default BannerItem;
