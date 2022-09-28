import axios from "axios";
import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import BannerItem from "../BannerItem";
import CustomSlider from "../CustomSlider";
import FilmList from "../FilmList";

const TVSeriesHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    nowPlaying: [],
    popular: [],
    topRated: [],
  });
  const getData = async () => {
    try {
      const resNowPlaying = await axios.get(
        `${process.env.REACT_APP_API_PATH_TVSERIES}on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const resPopular = await axios.get(
        `${process.env.REACT_APP_API_PATH_TVSERIES}popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const resTopRated = await axios.get(
        `${process.env.REACT_APP_API_PATH_TVSERIES}top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      setData({
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
    getData();
  }, []);
  return (
    <>
      <div
        className={`${
          loading ? "opacity-1 block" : "opacity-0 hidden"
        }  w-[50px] h-[50px] border-[4px] border-y-primary border-l-primary border-r-transparent rounded-full animate-spin mx-auto mt-10 transtion-all`}
      ></div>
      <div
        className={`${
          loading ? "opacity-0 hidden " : "opacity-1 block"
        } TVSeriesHomePage px-10 pt-10`}
      >
        <div className="relative  mb-6">
          <CustomSlider specifyClass="TVSeriesBanner" paginationClass="banner">
            {data?.nowPlaying?.results?.map((film) => {
              return (
                <SwiperSlide key={film.id}>
                  <BannerItem type="tvseries" filmID={film.id} info={film} />
                </SwiperSlide>
              );
            })}
          </CustomSlider>
        </div>
        <FilmList
          type="tvseries"
          title="Popular TV series"
          films={data.popular.results}
          specifyClass="TVSeriesPopList"
        />
        <FilmList
          type="tvseries"
          title="Top rated TV series"
          films={data.topRated.results}
          specifyClass="TVSeriesTopList"
        />
      </div>
    </>
  );
};

export default TVSeriesHomePage;
