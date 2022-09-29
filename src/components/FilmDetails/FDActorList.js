import React from "react";

import { SwiperSlide } from "swiper/react";
import CustomSlider from "../CustomSlider";

import FDActorItem from "./FDActorItem";

import PropTypes from "prop-types";

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

const FDActorList = ({ specifyClass, actors }) => {
  return (
    <CustomSlider
      specifyClass={specifyClass}
      paginationClass="normalList"
      config={swiperResponsiveConfig}
    >
      {actors
        ?.filter((actor) => actor.profile_path)
        .map((actor) => (
          <SwiperSlide key={actor.id}>
            <FDActorItem actor={actor} />
          </SwiperSlide>
        ))}
    </CustomSlider>
  );
};

FDActorList.propTypes = {
  specifyClass: PropTypes.string,
  actors: PropTypes.array,
};

export default FDActorList;
