import { useEffect, useRef, useState } from "react";

import CustomSlider from "../CustomSlider";
import BannerItem from "../BannerItem";
import FilmList from "../FilmList";
import Loader from "../Loader";

import { BsArrowRight } from "react-icons/bs";

import { SwiperSlide } from "swiper/react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const MoviesHomePage = () => {
  const [loading, setLoading] = useState(true);

  const [movies, setMovies] = useState({
    nowPlaying: [],
    popular: [],
    topRated: [],
  });

  const navigate = useNavigate();

  const timeOutId = useRef();

  const getMovies = useRef(async () => {
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

      setMovies({
        nowPlaying: resNowPlaying.data,
        popular: resPopular.data,
        topRated: resTopRated.data,
      });

      // set timeout to prevent jerking
      timeOutId.current = setTimeout(() => {
        setLoading(false);
      }, 400);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  });

  useEffect(() => {
    getMovies.current();

    return () => {
      clearTimeout(timeOutId.current);
    };
  }, []);

  return (
    <>
      {/* loader */}
      <Loader
        classWidth="w-[50px]"
        classHeight="h-[50px]"
        classBorder="border-[4px]"
        classMargin="mt-[100px] lg:mt-10"
        loading={loading}
      />

      {!loading && (
        <div className="MoviesHomePage mt-[90px] px-3 pb-[90px] md:mt-[100px] md:mb-[100px] md:px-5 lg:my-0 lg:p-10">
          {/* Banner */}
          <div className="relative mb-6 overflow-hidden rounded-[20px]">
            <CustomSlider
              specifyClass="moviesBanner"
              paginationClass="banner"
              autoPlay={true}
            >
              {movies?.nowPlaying?.results?.map((film) => (
                <SwiperSlide key={film.id}>
                  <BannerItem type="movies" filmID={film.id} info={film} />
                </SwiperSlide>
              ))}
            </CustomSlider>
          </div>

          {/* Popular movies */}
          <FilmList
            title="Popular movies"
            specifyClass="moviesPopList"
            type="movies"
            films={movies.popular.results}
          />

          {/* Top rated movies */}
          <FilmList
            title="Top rated movies"
            specifyClass="moviesTopList"
            type="movies"
            films={movies.topRated.results}
          />

          <button
            onClick={() => {
              navigate("/movies/list/page/1");
            }}
            className="ml-auto flex items-center justify-center rounded-[10px] bg-transparent px-5 py-2 font-medium text-primary outline-none transition-all hover:bg-primary hover:text-white lg:text-lg 2xl:text-xl"
          >
            See more
            <BsArrowRight className="ml-2 inline-block font-bold lg:text-xl 2xl:text-2xl" />
          </button>
        </div>
      )}
    </>
  );
};

export default MoviesHomePage;
