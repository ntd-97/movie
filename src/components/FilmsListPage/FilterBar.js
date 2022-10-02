import axios from "axios";

import React, { useState, useEffect, useRef, memo } from "react";

import PropTypes from "prop-types";

import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

const FilterBar = memo(({ type }) => {
  const [data, setData] = useState({});

  const [filterSelected, setFilterSelected] = useState({});

  const navigate = useNavigate();
  let { search } = useLocation();

  const filterParams = useRef({});

  // change filter handler
  const selectionChangeHanler = (event) => {
    let name = event.target.name;
    let signYear = "";
    let filterYear = "";
    let filterYearLte = "";

    // filter year
    if (type === "movie") {
      signYear = "primary_release";
      filterYear = "primary_release_year";
      filterYearLte = "primary_release_date.lte";
    } else {
      signYear = "first_air_date";
      filterYear = "first_air_date_year";
      filterYearLte = "first_air_date.lte";
    }

    // change filter year's name
    if (
      event.target.name.includes(signYear) &&
      event.target.selectedOptions[0].innerText.includes("before") &&
      Object.keys(filterParams.current).includes(filterYear)
    ) {
      delete filterParams.current[filterYear];
      name = filterYearLte;
    } else if (
      event.target.name.includes(signYear) &&
      Object.keys(filterParams.current).includes(filterYearLte)
    ) {
      delete filterParams.current[filterYearLte];
    }

    // add filter to object
    if (event.target.value && event.target.value !== "none") {
      filterParams.current[name] = event.target.value;
    } else {
      delete filterParams.current[name];
    }

    //navigate to load new list when choose filter
    navigate({
      pathname: `/${type === "movie" ? "movies" : "tvseries"}/list/page/1`,
      search: createSearchParams(filterParams.current).toString(),
    });
  };

  const getData = useRef(async () => {
    // get genres data
    const resGenres = await axios.get(
      `${process.env.REACT_APP_API_PATH_GENRES}${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    // get certification data
    let resCertification;
    if (type === "movie") {
      resCertification = await axios.get(
        `${process.env.REACT_APP_API_PATH_CERTIFICATIONS}${type}/list?api_key=${process.env.REACT_APP_API_KEY}`
      );
    }

    // build list of years
    const yearNow = new Date().getFullYear();
    const years = [yearNow];
    for (let i = 1; i <= 10; i++) {
      years.push(yearNow - i);
    }

    // list of sort by
    let sortBy = [];
    if (type === "movie") {
      sortBy = [
        { id: 1, name: "popularity", value: "popularity.desc" },
        { id: 2, name: "release date", value: "release_date.desc" },
        {
          id: 3,
          name: "vote count",
          value: "vote_count.desc",
        },
      ];
    } else {
      sortBy = [
        { id: 1, name: "popularity", value: "popularity.desc" },
        { id: 2, name: "first air date", value: "first_air_date.desc" },
        {
          id: 3,
          name: "vote average",
          value: "vote_average.desc",
        },
      ];
    }

    //tv series types list
    const tvTypes = [
      { name: "Documentary", value: "0" },
      { name: "News", value: "1" },
      { name: "Miniseries", value: "2" },
      {
        name: "Reality",
        value: "3",
      },
      { name: "Scripted", value: "4" },
      { name: "Talk Show", value: "5" },
      {
        name: "Video",
        value: "6",
      },
    ];

    // set data to render select - option
    if (type === "movie") {
      setData({
        genres: resGenres.data.genres,
        certifications: resCertification.data.certifications.US,
        years,
        sortBy,
      });
    } else {
      setData({
        genres: resGenres.data.genres,
        years,
        sortBy,
        tvTypes,
      });
    }
  });

  // Get data when type change
  useEffect(() => {
    getData.current();
  }, [type]);

  // get filter params from URL when page reloaded and bind to select's value
  const buildFilterSearchObj = (search) => {
    if (search) {
      search = search.slice(1, search.length);
      const searchArr = search.split("&");
      const FilterSearchObj = searchArr.reduce((obj, filter) => {
        filter = filter.split("=");

        return {
          ...obj,
          [filter[0]]: filter[1],
        };
      }, {});
      return FilterSearchObj;
    }
  };

  // set filter params to oject
  useEffect(() => {
    filterParams.current = buildFilterSearchObj(search) || {};
    setFilterSelected(() => buildFilterSearchObj(search));
  }, [search]);

  return (
    <div className="FilterBar w-full py-5 px-1 grid grid-cols-4 gap-x-5 justify-between rounded-[20px] bg-[#33292E] bg-opacity-60 mb-5">
      {/* Genres */}
      <div className="flex justify-center flex-col px-[10px] items-start">
        <label className="text-[#ececec] mr-2" htmlFor="genres">
          Genres:
        </label>
        <select
          onChange={selectionChangeHanler}
          name="with_genres"
          className="py-1 px-2 rounded-[7px] w-full mt-1 focus:outline-none hover:cursor-pointer"
          id="genres"
          value={
            filterSelected?.with_genres ? filterSelected?.with_genres : "none"
          }
        >
          <option key="default" value="none">
            -- genes --
          </option>
          {data?.genres?.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Certification */}
      {type === "movie" && (
        <div className="flex justify-center flex-col px-[10px] items-start">
          <label className="text-[#ececec] mr-2" htmlFor="certification">
            Certification:
          </label>
          <select
            onChange={selectionChangeHanler}
            name="certification"
            className="py-1 px-2 rounded-[7px] w-full mt-1 focus:outline-none hover:cursor-pointer"
            value={
              filterSelected?.certification
                ? filterSelected?.certification
                : "none"
            }
            id="certification"
          >
            <option key="default" value="none">
              -- certification --
            </option>
            {data?.certifications?.map((certification) => (
              <option
                key={certification.certification}
                value={certification.certification}
              >
                {certification.certification}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* TV Series type */}
      {type === "tv" && (
        <div className="flex justify-center flex-col px-[10px] items-start">
          <label className="text-[#ececec] mr-2" htmlFor="certification">
            Type:
          </label>
          <select
            onChange={selectionChangeHanler}
            name="with_type"
            className="py-1 px-2 rounded-[7px] w-full mt-1 focus:outline-none hover:cursor-pointer"
            value={
              filterSelected?.with_type ? filterSelected?.with_type : "none"
            }
            id="tvType"
          >
            <option key="default" value="none">
              -- type --
            </option>
            {data?.tvTypes?.map((tvtype) => (
              <option key={tvtype.value} value={tvtype.value}>
                {tvtype.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Year */}
      <div className="flex justify-center flex-col px-[10px] items-start">
        <label className="text-[#ececec] mr-2" htmlFor="year">
          Year:
        </label>
        <select
          onChange={selectionChangeHanler}
          name={
            type === "movie" ? "primary_release_year" : "first_air_date_year"
          }
          className="py-1 px-2 rounded-[7px] w-full mt-1 focus:outline-none hover:cursor-pointer"
          value={
            type === "movie"
              ? filterSelected?.primary_release_year ||
                (filterSelected &&
                  filterSelected["primary_release_date.lte"]) ||
                "none"
              : filterSelected?.first_air_date_year ||
                (filterSelected && filterSelected["first_air_date.lte"]) ||
                "none"
          }
          id="year"
        >
          <option key="default" value="none">
            -- year --
          </option>
          {data?.years?.map((year, index, years) => (
            <option key={year} value={year}>
              {index === years.length - 1 ? `before ${year}` : `${year}`}
            </option>
          ))}
        </select>
      </div>

      {/* Sort by */}
      <div className="flex justify-center flex-col px-[10px] items-start">
        <label className="text-[#ececec] mr-2" htmlFor="sort">
          Sort by:
        </label>
        <select
          onChange={selectionChangeHanler}
          name="sort_by"
          className="py-1 px-2 rounded-[7px] w-full mt-1 focus:outline-none hover:cursor-pointer"
          value={filterSelected?.sort_by ? filterSelected?.sort_by : "none"}
          id="sort"
        >
          <option key="default" value="none">
            -- sort --
          </option>
          {data?.sortBy?.map((sortItem) => (
            <option key={sortItem.id} value={sortItem.value}>
              {sortItem.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

FilterBar.propTypes = { type: PropTypes.string };

export default FilterBar;
