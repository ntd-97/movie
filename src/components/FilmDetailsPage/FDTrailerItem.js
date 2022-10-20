import React, { useContext } from "react";

import { BsFillPlayFill } from "react-icons/bs";

import { TrailerModalContext } from "../../App";

import PropTypes from "prop-types";

const FDTrailerItem = ({ videoKey }) => {
  // get props from TrailerModalContext
  const { setOpenModal, setTrailerKey } = useContext(TrailerModalContext);

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
        className="h-full w-full object-cover"
        src={`${process.env.REACT_APP_API_PATH_YOUTUBE_IMG}${videoKey}/0.jpg`}
        alt="trailer thumb"
      />
      <BsFillPlayFill className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-[55px] text-white opacity-0 transition-all group-hover:opacity-100" />
    </div>
  );
};

FDTrailerItem.propTypes = {
  videoKey: PropTypes.string,
};

export default FDTrailerItem;
