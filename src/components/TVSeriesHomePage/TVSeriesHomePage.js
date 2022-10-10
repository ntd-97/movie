import React, { useEffect, useState } from "react";

import axios from "axios";

import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { SwiperSlide } from "swiper/react";

import BannerItem from "../BannerItem";
import CustomSlider from "../CustomSlider";
import FilmList from "../FilmList";
import Loader from "../Loader";

const TVSeriesHomePage = () => {
  const [loading, setLoading] = useState(true);

  const [tvSeries, setTvSeries] = useState({
    nowPlaying: [],
    popular: [],
    topRated: [],
  });

  const navigate = useNavigate();

  const getTvSeries = async () => {
    try {
      // tv series now playing data
      const resNowPlaying = await axios.get(
        `${process.env.REACT_APP_API_PATH_TVSERIES}on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      // tv series popular data
      const resPopular = await axios.get(
        `${process.env.REACT_APP_API_PATH_TVSERIES}popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      // tv series top rated data
      const resTopRated = await axios.get(
        `${process.env.REACT_APP_API_PATH_TVSERIES}top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );

      setTvSeries({
        nowPlaying: resNowPlaying.data,
        popular: resPopular.data,
        topRated: resTopRated.data,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTvSeries();
  }, []);

  return (
    <>
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
          loading ? "hidden opacity-0 " : "opacity-1 block"
        } TVSeriesHomePage mt-[86px] px-3 pb-[90px] lg:mt-0 lg:p-10`}
      >
        {/* banner */}
        <div className="relative  mb-6 overflow-hidden rounded-[20px]">
          <CustomSlider specifyClass="TVSeriesBanner" paginationClass="banner">
            {tvSeries?.nowPlaying?.results?.map((film) => {
              return (
                <SwiperSlide key={film.id}>
                  <BannerItem type="tvseries" filmID={film.id} info={film} />
                </SwiperSlide>
              );
            })}
          </CustomSlider>
        </div>

        {/* Popular TV series */}
        <FilmList
          type="tvseries"
          title="Popular TV series"
          films={tvSeries.popular.results}
          specifyClass="TVSeriesPopList"
        />

        {/* Top rated TV series */}
        <FilmList
          type="tvseries"
          title="Top rated TV series"
          films={tvSeries.topRated.results}
          specifyClass="TVSeriesTopList"
        />

        <button
          onClick={() => {
            navigate("/tvseries/list/page/1");
          }}
          className="ml-auto flex items-center justify-center rounded-[10px] bg-transparent px-5 py-2 font-medium text-primary outline-none transition-all hover:bg-primary hover:text-white lg:text-lg 2xl:text-xl"
        >
          See more
          <BsArrowRight className="ml-2 inline-block font-bold lg:text-xl 2xl:text-2xl" />
        </button>
      </div>
    </>
  );
};

export default TVSeriesHomePage;
