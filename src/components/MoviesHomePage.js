import React, { useRef } from "react";
import BannerItem from "./BannerItem";

import { FaLessThan, FaGreaterThan } from "react-icons/fa";

import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MoviesHomePage = () => {
  const swiperRef = useRef();

  return (
    <div className="MoviesHomePage">
      <Swiper
        modules={[Pagination, Navigation]}
        className={`mySwiperdemo`}
        spaceBetween={15}
        //add swiper custom navigation
        navigation={{
          prevEl: `.btnPrev-demo`,
          nextEl: `.btnNext-demo`,
        }}
        //add swiper custom pagination
        pagination={{
          el: `.swiper-pagination-demo`,
          type: "bullets",
          clickable: true,
        }}
        centerInsufficientSlides={true}
        //get swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide>
          <BannerItem></BannerItem>
        </SwiperSlide>
        <SwiperSlide>
          <BannerItem></BannerItem>
        </SwiperSlide>
      </Swiper>

      {/* custom navigation button */}
      <button
        className={`slider-arrow-btn__prev btnPrev-demo`}
        onClick={() => {
          swiperRef.current.slidePrev();
        }}
      >
        <FaLessThan className="slider-arrow-btn__icon--prev" />
      </button>
      <button
        className={`slider-arrow-btn__next btnNext-demo`}
        onClick={() => {
          swiperRef.current.slideNext();
        }}
      >
        <FaGreaterThan className="slider-arrow-btn__icon--next" />
      </button>

      {/* custom pagination  */}
      <div className={`swiper-pagination-style swiper-pagination-demo`}></div>
    </div>
  );
};

export default MoviesHomePage;
