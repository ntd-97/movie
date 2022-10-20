import React, { useContext } from "react";

import { BsFillPlayFill } from "react-icons/bs";

import { TrailerModalContext } from "../../App";

import PropTypes from "prop-types";
import { useState } from "react";

const FDTrailerItem = ({ videoKey }) => {
  // get props from TrailerModalContext
  const { setOpenModal, setTrailerKey } = useContext(TrailerModalContext);

  const [imgTrailerLoaded, setImgTrailerLoaded] = useState(false);

  return (
    <div
      className="group relative hover:cursor-pointer"
      onClick={() => {
        // open modal and update videoKey for iframe
        setTrailerKey(videoKey);
        setOpenModal(true);
      }}
    >
      <img
        className={`${
          imgTrailerLoaded ? "" : "animate-pulse bg-[#33292E]"
        } h-full w-full object-cover`}
        loading="lazy"
        src={`${process.env.REACT_APP_API_PATH_YOUTUBE_IMG}${videoKey}/0.jpg`}
        alt="trailer thumb"
        onLoad={() => {
          setImgTrailerLoaded(true);
        }}
      />
      <BsFillPlayFill className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-[55px] text-white opacity-0 transition-all group-hover:opacity-100" />
    </div>
  );
};

FDTrailerItem.propTypes = {
  videoKey: PropTypes.string,
};

export default FDTrailerItem;
