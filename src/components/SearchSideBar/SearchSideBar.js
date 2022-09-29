import React from "react";

import { FiSearch } from "react-icons/fi";

import SearchSideBarList from "./SearchSideBarList";

const SearchSideBar = () => {
  return (
    <div className="w-full h-screen col-span-2">
      <div className="w-[25%] h-full border-l-2 border-[#353535] fixed text-[#ececec] bg-[#181818] px-6 pb-5 flex flex-col gap-y-5 justify-between overflow-scroll no-scrollbar">
        <div className="sticky top-0 z-50 py-5 bg-[#181818] bg-opacity-95">
          <FiSearch className="absolute top-1/2 right-[15px] text-[22px] text-[#9CA3AF] -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="px-[15px] py-[10px] w-full rounded-[10px] bg-[#252229] focus:outline-[#353535] outline-none"
          />
        </div>

        <SearchSideBarList title="Trending" />

        <SearchSideBarList title="Watchlists" />
      </div>
    </div>
  );
};

export default SearchSideBar;
