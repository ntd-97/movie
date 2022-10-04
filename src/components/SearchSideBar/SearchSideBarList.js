import React from "react";
import SearchSideBarItem from "./SearchSideBarItem";

import PropTypes from "prop-types";

const SearchSideBarList = ({ title, type, loading, films }) => {
  return (
    <div className="SearchSideBarList">
      <h2 className="text-2xl text-[#ECECEC] font-medium mb-5">{title}</h2>
      {loading && (
        <div className="mx-auto w-8 h-8 border-2 border-primary border-t-2 border-t-transparent rounded-full animate-spin"></div>
      )}

      {loading || (
        <>
          <div className="flex flex-col gap-y-[15px]">
            {films?.map((film) => (
              <SearchSideBarItem key={film?.id} type={type} film={film} />
            ))}
          </div>
          <button className="text-[18px] bg-primary px-5 py-2 mt-[15px] rounded-[10px] w-full outline-none font-medium transition-all hover:bg-red-400 ">
            See more
          </button>
        </>
      )}
    </div>
  );
};

SearchSideBarList.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  films: PropTypes.array,
};

export default SearchSideBarList;
