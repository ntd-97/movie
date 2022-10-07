import React from "react";

import SearchSideBarItem from "./SearchSideBarItem";

import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

import axios from "axios";

import { useContext } from "react";
import { AccountStateContext } from "../../App";

const SearchSideBarListMW = ({ title, type, pathNavigate, apiPath }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [films, setfilms] = useState([]);

  const { accountState } = useContext(AccountStateContext);

  const getData = useRef(async () => {
    setLoading(true);
    const res = await axios.get(apiPath);

    if (res.data.results.length < 3) {
      setfilms(res.data.results);
    } else {
      setfilms(res.data.results.slice(0, 3));
    }

    setTimeout(() => {
      setLoading(false);
    }, 300);
  });

  useEffect(() => {
    getData.current();
  }, []);

  useEffect(() => {
    if (
      accountState.changed === "watchlist" &&
      accountState.mediaType === "movie"
    ) {
      getData.current();
    }
  }, [accountState]);

  return (
    <div className="SearchSideBarList">
      <h2 className="text-2xl text-[#ECECEC] font-medium mb-5">{title}</h2>

      {loading && (
        <div className="mx-auto w-10 h-10 border-2 border-primary border-t-2 border-t-transparent rounded-full animate-spin"></div>
      )}

      {films.length <= 0 && !loading && (
        <h3 className="text-primary text-center text-xl"> Not found</h3>
      )}

      {films.length > 0 && !loading && (
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

SearchSideBarListMW.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  pathNavigate: PropTypes.string,
  apiPath: PropTypes.string,
};

export default SearchSideBarListMW;
