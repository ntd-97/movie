import CelebItem from "./CelebItem";

import axios from "axios";

import React, { useEffect, useRef, useState } from "react";

import ReactPaginate from "react-paginate";

import { useNavigate, useParams } from "react-router-dom";

const CelebsHomePage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  let { page } = useParams();

  const navigate = useNavigate();

  const getData = useRef(async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_PATH_PEOPLE}popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
      );

      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, [300]);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getData.current(page);
  }, [page]);

  return (
    <div className="CelebsHomePage p-10 transtion-all">
      <h1 className="text-3xl font-medium text-[#cecece] text-center mb-10">
        Celebs
      </h1>

      {/* loader */}
      <div
        className={`${
          loading ? "opacity-1 block" : "opacity-0 hidden"
        }  w-[50px] h-[50px] border-[4px] border-y-primary border-l-primary border-r-transparent rounded-full animate-spin mx-auto mt-10 transtion-all`}
      ></div>

      <div
        className={`${
          loading ? "opacity-0 hidden " : "opacity-1 grid"
        } grid-cols-5 gap-5`}
      >
        {data?.results
          ?.filter((celeb) => celeb.profile_path !== null)
          .map((celeb) => (
            <CelebItem
              key={celeb.id}
              celebId={celeb.id}
              name={celeb.name}
              profilePath={celeb.profile_path}
            />
          ))}
      </div>

      {/* pagination */}
      <ReactPaginate
        pageCount={data?.total_pages ? parseInt(data?.total_pages) : 1}
        className="flex justify-center items-center mt-10 gap-x-3 text-[#ececec] "
        pageLinkClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
        previousClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
        nextClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
        activeClassName="text-primary"
        disabledClassName="opacity-40"
        disabledLinkClassName="hover:cursor-default"
        renderOnZeroPageCount={null}
        initialPage={parseInt(page) - 1}
        disableInitialCallback={true}
        onPageChange={(e) => {
          navigate(`/celebs/page/${(e.selected + 1).toString()}`);
        }}
      ></ReactPaginate>
    </div>
  );
};

export default CelebsHomePage;
