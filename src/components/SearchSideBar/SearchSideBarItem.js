import React from "react";
import { AiFillStar } from "react-icons/ai";

const SearchSideBarItem = () => {
  return (
    <div className="SearchSideBarItem flex rounded-[20px] bg-[#33292E] bg-opacity-60 p-3 text-[#ECECEC] gap-x-[10px]">
      <img
        src="https://is2-ssl.mzstatic.com/image/thumb/H4JfhPRO782ZNd7FgxmDFQ/1200x675mf.jpg"
        alt="poster film"
        className="w-[92px] h-[95px] rounded-[10px] object-cover"
      />
      <div className="flex-grow flex flex-col justify-between">
        <h4>Iron Man</h4>
        <div className="flex justify-between text-[13.5px] text-[#AFAFAF]">
          <p>2008</p>
          <p>
            8.0
            <AiFillStar className="text-yellow-400 text-[20px] inline-block ml-1" />
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-[13.5px] px-[10px] py-[5px] border-2 rounded-[10px] border-[#474749] hover:cursor-pointer hover:border-white transition-all">
            Action
          </p>
          <p className="text-[13.5px] px-[10px] py-[5px] border-2 rounded-[10px] border-[#474749] hover:cursor-pointer hover:border-white transition-all">
            Fantasy
          </p>
          <p className="text-[13.5px] px-[10px] py-[5px] border-2 rounded-[10px] border-[#474749] hover:cursor-pointer hover:border-white transition-all">
            Science Fiction
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchSideBarItem;
