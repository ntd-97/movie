import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { TrailerModalContext } from "../../App";
import { useContext } from "react";

const FDTrailerItem = ({ videoKey }) => {
  const { setOpenModal, setTrailerKey } = useContext(TrailerModalContext);
  return (
    <div
      className="relative group hover:cursor-pointer"
      onClick={() => {
        setTrailerKey(videoKey);
        setOpenModal(true);
      }}
    >
      <img
        className="w-full h-full object-cover"
        src={`${process.env.REACT_APP_API_PATH_YOUTUBE_IMG}${videoKey}/0.jpg`}
        alt="trailer thumb"
      />
      <BsFillPlayFill className="absolute opacity-0 transition-all group-hover:opacity-100 text-white text-[55px] top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default FDTrailerItem;
