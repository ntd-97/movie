import React from "react";
import { SwiperSlide } from "swiper/react";
import CustomSlider from "./CustomSlider";
import FilmItem from "./FilmItem";

const swiperResponsiveConfig = {
  992: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  768: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  576: {
    slidesPerView: 2,
    slidesPerGroup: 2,
  },
  200: {
    slidesPerView: 1,
    slidesPerGroup: 1,
  },
};

const FilmList = ({ Title, ...props }) => {
  return (
    <div className="FilmList relative">
      <h2 className="text-2xl text-[#ECECEC] font-medium mb-5">{Title}</h2>
      <CustomSlider
        specifyClass={props.specifyClass}
        paginationClass="filmList"
        config={swiperResponsiveConfig}
      >
        <SwiperSlide>
          <FilmItem />
        </SwiperSlide>
        <SwiperSlide>
          <FilmItem />
        </SwiperSlide>
        <SwiperSlide>
          <FilmItem />
        </SwiperSlide>
        <SwiperSlide>
          <FilmItem />
        </SwiperSlide>
        <SwiperSlide>
          <FilmItem />
        </SwiperSlide>
      </CustomSlider>
    </div>
  );
};

export default FilmList;
