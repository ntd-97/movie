import React from "react";
import SearchSideBarItem from "./SearchSideBarItem";

const SearchSideBarList = ({ title }) => {
  return (
    <div className="SearchSideBarList">
      <h2 className="text-2xl text-[#ECECEC] font-medium mb-5">{title}</h2>
      <div className="flex flex-col gap-y-[15px]">
        <SearchSideBarItem></SearchSideBarItem>
        <SearchSideBarItem></SearchSideBarItem>
        <SearchSideBarItem></SearchSideBarItem>
      </div>
      <button className="bg-primary px-5 py-2 mt-[15px] rounded-[10px] w-full outline-none font-medium transition-all hover:bg-red-400 ">
        See more
      </button>
    </div>
  );
};

export default SearchSideBarList;
