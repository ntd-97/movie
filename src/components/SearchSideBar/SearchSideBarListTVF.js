import React, { useState, useEffect, useRef, useContext } from "react";

import SearchSideBarItem from "./SearchSideBarItem";

import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { AccountStateContext } from "../../App";

import Loader from "../Loader";

const SearchSideBarListTVF = ({
  title,
  type,
  pathNavigate,
  apiPath,
  showSearchOnMobile,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [films, setFilms] = useState([]);

  const { accountState } = useContext(AccountStateContext);

  const getFilms = useRef(async () => {
    setLoading(true);
    const res = await axios.get(apiPath);

    if (res.data.results.length < 3) {
      setFilms(res.data.results);
    } else {
      setFilms(res.data.results.slice(0, 3));
    }

    setTimeout(() => {
      setLoading(false);
    }, 300);
  });

  useEffect(() => {
    getFilms.current();
  }, []);

  useEffect(() => {
    if (
      accountState.changed === "favorite" &&
      accountState.mediaType === "tv"
    ) {
      getFilms.current();
    }
  }, [accountState]);

  return (
    <div className="SearchSideBarList">
      <h2 className="mb-5 text-xl font-medium text-[#ECECEC] 2xl:text-2xl">
        {title}
      </h2>

      <Loader
        classWidth="w-10"
        classHeight="h-10"
        classBorder="border-2"
        classMargin="mt-0"
        loading={loading}
      />

      {films.length <= 0 && !loading && (
        <h3 className="text-center text-xl text-primary"> Not found</h3>
      )}

      {films.length > 0 && !loading && (
        <>
          <div className="flex flex-col gap-y-[15px]">
            {films?.map((film) => (
              <SearchSideBarItem
                key={film?.id}
                type={type}
                film={film}
                showSearchOnMobile={showSearchOnMobile}
              />
            ))}
          </div>
          <button
            onClick={() => {
              showSearchOnMobile(false);
              navigate(`${pathNavigate}/page/1`);
            }}
            className="mt-[15px] w-full rounded-[10px] bg-primary px-5 py-2 font-medium outline-none transition-all hover:bg-red-400 lg:text-base 2xl:text-[18px] "
          >
            See more
          </button>
        </>
      )}
    </div>
  );
};

SearchSideBarListTVF.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  pathNavigate: PropTypes.string,
  apiPath: PropTypes.string,
};

export default SearchSideBarListTVF;
