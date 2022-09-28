import React, { Fragment } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Pagination, Navigation } from "swiper";
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CustomSlider = ({ children, ...props }) => {
  return (
    <Fragment>
      <Swiper
        modules={[Pagination, Navigation]}
        className={`mySwiper${props.specifyClass}`}
        spaceBetween={15}
        //add swiper custom navigation
        navigation={{
          prevEl: `.btnPrev-${props.specifyClass}`,
          nextEl: `.btnNext-${props.specifyClass}`,
        }}
        //add swiper custom pagination
        pagination={{
          el: `.swiper-pagination-${props.specifyClass}`,
          type: "bullets",
          clickable: true,
        }}
        centerInsufficientSlides={true}
        breakpoints={props.config ? props.config : ""}
      >
        {children}
      </Swiper>

      {/* custom navigation button */}
      <button
        className={`slider-arrow-btn__prev ${props.paginationClass} btnPrev-${props.specifyClass}`}
      >
        <IoIosArrowBack className="slider-arrow-btn__icon--prev" />
      </button>
      <button
        className={`slider-arrow-btn__next ${props.paginationClass} btnNext-${props.specifyClass}`}
      >
        <IoIosArrowForward className="slider-arrow-btn__icon--next" />
      </button>

      {/* custom pagination  */}
      <div
        className={`swiper-pagination-style ${props.paginationClass} swiper-pagination-${props.specifyClass}`}
      ></div>
    </Fragment>
  );
};

export default CustomSlider;
