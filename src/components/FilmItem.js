import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsPlayCircleFill } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";

const FilmItem = () => {
  return (
    <div className="FilmItem relative rounded-[20px] bg-[#33292E] bg-opacity-60 p-3 text-[#ECECEC]">
      <img
        className="object-cover w-full h-[300px] rounded-[10px] mb-4"
        src="https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        alt="poster film"
      />

      <h3 className="mb-3">Spiderman - No way home</h3>
      <div className="mb-4 flex justify-between items-center text-sm text-[#7D7D7D] font-medium">
        <span>2022</span>
        <span className="flex items-center">
          7.2
          <AiFillStar className="text-yellow-400 text-[20px] inline-block ml-1" />{" "}
        </span>
      </div>
      <button className="absolute top-5 right-5 bg-[#4B444C] opacity-60 px-2 py-2 rounded-full transition-all hover:bg-gray-500 hover:opacity-100">
        <MdOutlineAdd className="text-2xl" />
      </button>
      <button className="bg-primary px-5 py-2 rounded-[10px] w-full outline-none font-medium transition-all hover:bg-red-500 flex justify-center items-center">
        Watch now
        <BsPlayCircleFill className="inline-block text-xl ml-1" />
      </button>
    </div>
  );
};

export default FilmItem;
