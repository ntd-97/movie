import CustomSlider from "./CustomSlider";
import BannerItem from "./BannerItem";
import { SwiperSlide } from "swiper/react";
import FilmList from "./FilmList";

const MoviesHomePage = () => {
  return (
    <div className="MoviesHomePage">
      <div className="relative  mb-6">
        <CustomSlider specifyClass="moviesBanner" paginationClass="banner">
          <SwiperSlide>
            <BannerItem />
          </SwiperSlide>
          <SwiperSlide>
            <BannerItem />
          </SwiperSlide>
        </CustomSlider>
      </div>
      <FilmList Title="Popular movies" specifyClass="moviesPopList" />
      <FilmList Title="Top rated movies" specifyClass="moviesTopList" />
    </div>
  );
};

export default MoviesHomePage;
