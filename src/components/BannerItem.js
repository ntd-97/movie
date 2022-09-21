import React from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";

const BannerItem = () => {
  return (
    <div className="BannerItem relative">
      <img
        src="https://images.unsplash.com/photo-1563381013529-1c922c80ac8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1413&q=80"
        alt="banner img"
        className="w-full h-[40vh] object-cover rounded-[20px]"
      />
      <div className="absolute bottom-8 left-8 text-white">
        <h2 className="text-4xl font-bold mb-5">Avenger:Endgame</h2>
        <div className="mb-5 flex items-center">
          <AiFillStar className="text-yellow-400 text-[26px] inline-block mr-2" />
          <p className="text-xl font-bold mr-1">7.2</p>
          <p className="text-[#545454] font-bold ">/10</p>
        </div>
        <div className="flex gap-x-5">
          <button className="bg-primary px-5 py-2 rounded-[10px] outline-none font-medium transition-all hover:bg-red-500">
            Watch
            <BsPlayCircleFill className="inline-block text-xl ml-1" />
          </button>
          <button className="bg-[#4B444C] bg-opacity-80 px-2 py-2 rounded-full transition-all hover:bg-gray-500">
            <MdOutlineAdd className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerItem;
