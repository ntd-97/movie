import CustomSlider from "../CustomSlider";
import BannerItem from "../BannerItem";
import FilmList from "../FilmList";

import { BsArrowRight } from "react-icons/bs";

import { SwiperSlide } from "swiper/react";

import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MoviesHomePage = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    nowPlaying: [],
    popular: [],
    topRated: [],
  });

  const navigate = useNavigate();

  const getData = async () => {
    try {
      // now playing movies data
      const resNowPlaying = await axios.get(
        `${process.env.REACT_APP_API_PATH_MOVIES}now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      // poppular movies data
      const resPopular = await axios.get(
        `${process.env.REACT_APP_API_PATH_MOVIES}popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      // top rated movies data
      const resTopRated = await axios.get(
        `${process.env.REACT_APP_API_PATH_MOVIES}top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
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
      {/* loader */}
      <div
        className={`${
          loading ? "opacity-1 block" : "opacity-0 hidden"
        }  w-[50px] h-[50px] border-[4px] border-y-primary border-l-primary border-r-transparent rounded-full animate-spin mx-auto mt-10 transtion-all`}
      ></div>

      <div
        className={`${
          loading ? "opacity-0 hidden " : "opacity-1 block"
        } MoviesHomePage px-10 py-10 transtion-all`}
      >
        {/* Banner */}
        <div className="relative  mb-6 rounded-[20px] overflow-hidden">
          <CustomSlider specifyClass="moviesBanner" paginationClass="banner">
            {data?.nowPlaying?.results?.map((film) => {
              return (
                <SwiperSlide key={film.id}>
                  <BannerItem type="movies" filmID={film.id} info={film} />
                </SwiperSlide>
              );
            })}
          </CustomSlider>
        </div>

        {/* Popular movies */}
        <FilmList
          title="Popular movies"
          specifyClass="moviesPopList"
          type="movies"
          films={data.popular.results}
        />

        {/* Top rated movies */}
        <FilmList
          title="Top rated movies"
          specifyClass="moviesTopList"
          type="movies"
          films={data.topRated.results}
        />

        <button
          onClick={() => {
            navigate("/movies/list/page/1");
          }}
          className="ml-auto bg-transparent px-5 py-2 rounded-[10px] outline-none text-primary text-xl font-medium transition-all hover:bg-primary hover:text-white flex justify-center items-center"
        >
          See more
          <BsArrowRight className="inline-block text-2xl ml-2 font-bold" />
        </button>
      </div>
    </>
  );
};

export default MoviesHomePage;
