import React, { Fragment } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import PropTypes from "prop-types";

import { Pagination, Navigation } from "swiper";
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



const CustomSlider = ({ children, specifyClass, paginationClass, config }) => {
  return (
    <>
      <Swiper
        modules={[Pagination, Navigation]}
        className={`mySwiper${specifyClass}`}
        spaceBetween={12}
        //add swiper custom navigation
        navigation={{
          prevEl: `.btnPrev-${specifyClass}`,
          nextEl: `.btnNext-${specifyClass}`,
        }}
        //add swiper custom pagination
        pagination={{
          el: `.swiper-pagination-${specifyClass}`,
          type: "bullets",
          clickable: true,
        }}
        centerInsufficientSlides={true}
        breakpoints={config ? config : ""}
        lazy={{
          loadPrevNext: true,
          loadPrevNextAmount: 2,
        }}
      >
        {children}
      </Swiper>

      {/* custom navigation button */}
      <button
        className={`slider-arrow-btn__prev ${paginationClass} btnPrev-${specifyClass} hidden lg:block`}
      >
        <IoIosArrowBack className="slider-arrow-btn__icon--prev" />
      </button>
      <button
        className={`slider-arrow-btn__next ${paginationClass} btnNext-${specifyClass} hidden lg:block`}
      >
        <IoIosArrowForward className="slider-arrow-btn__icon--next" />
      </button>

      {/* custom pagination  */}
      <div
        className={`swiper-pagination-style ${paginationClass} swiper-pagination-${specifyClass} hidden lg:block`}
      ></div>
    </>
  );
};

CustomSlider.propTypes = {
  specifyClass: PropTypes.string,
  paginationClass: PropTypes.string,
  children: PropTypes.node,
};

export default CustomSlider;
