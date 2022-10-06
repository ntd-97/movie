import React from "react";
import SearchSideBarItem from "./SearchSideBarItem";

import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

const SearchSideBarList = ({ title, type, pathNavigate, films }) => {
  const navigate = useNavigate();

  return (
    <div className="SearchSideBarList">
      <h2 className="text-2xl text-[#ECECEC] font-medium mb-5">{title}</h2>

      {films.length <= 0 && (
        <h3 className="text-primary text-center text-xl"> Not found</h3>
      )}

      {films.length > 0 && (
        <>
          <div className="flex flex-col gap-y-[15px]">
            {films?.map((film) => (
              <SearchSideBarItem key={film?.id} type={type} film={film} />
            ))}
          </div>
          <button
            onClick={() => {
              navigate(`${pathNavigate}/page/1`);
            }}
            className="text-[18px] bg-primary px-5 py-2 mt-[15px] rounded-[10px] w-full outline-none font-medium transition-all hover:bg-red-400 "
          >
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
  pathNavigate: PropTypes.string,
  films: PropTypes.array,
};

export default SearchSideBarList;
