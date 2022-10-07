import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import ReactPaginate from "react-paginate";

import { useNavigate, useParams } from "react-router-dom";

import CelebItem from "./CelebItem";
import Loader from "../Loader";

const CelebsHomePage = () => {
  const [celebsList, setCelebsList] = useState();

  const [loading, setLoading] = useState(true);

  let { page } = useParams();

  const navigate = useNavigate();

  const getCelebsList = useRef(async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_PATH_PEOPLE}popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
      );

      setCelebsList(res.data);

      setTimeout(() => {
        setLoading(false);
      }, [300]);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCelebsList.current(page);
  }, [page]);

  return (
    <div className="CelebsHomePage p-10 transtion-all">
      <h1 className="text-3xl font-medium text-[#cecece] text-center mb-10">
        Celebs
      </h1>

      {/* loader */}
      <Loader
        classWidth="w-[50px]"
        classHeight="h-[50px]"
        classBorder="border-[4px]"
        classMargin="mt-10"
        loading={loading}
      />

      <div
        className={`${
          loading ? "opacity-0 hidden " : "opacity-1 grid"
        } grid-cols-5 gap-5`}
      >
        {celebsList?.results
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
        pageCount={
          celebsList?.total_pages ? parseInt(celebsList?.total_pages) : 1
        }
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
