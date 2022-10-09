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
        className="w-full rounded-[20px] object-cover text-primary lg:max-h-[465px]  2xl:max-h-[570px]"
      />

      <div className="absolute bottom-8 left-8 text-white">
        <h2 className="mb-5 font-bold lg:text-3xl 2xl:text-4xl">
          {type === "tvseries" ? info.name : info.title}
        </h2>

        <div className="mb-5 flex items-center">
          <AiFillStar className="mr-2 inline-block text-[26px] text-yellow-400" />
          <p className="mr-1 text-xl font-bold">
            {info.vote_average ? info.vote_average : "0"}
          </p>
          <p className="font-bold text-[#545454] ">/10</p>
        </div>

        <button
          className="flex items-center rounded-[10px] bg-primary px-10 py-2 font-medium outline-none transition-all hover:bg-red-400"
          onClick={btnFilmClickHandler}
        >
          Watch
          <BsPlayCircleFill className="ml-1 inline-block text-xl" />
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
