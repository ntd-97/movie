import { SwiperSlide } from "swiper/react";

import CustomSlider from "../CustomSlider";
import FDTrailerItem from "./FDTrailerItem";

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

const FDTrailerList = ({ specifyClass, trailers }) => {
  return (
    <CustomSlider
      specifyClass={specifyClass}
      paginationClass="normalList"
      config={swiperResponsiveConfig}
    >
      {trailers
        ?.filter((trailer) => trailer.site === "YouTube")
        .map((trailer) => {
          return (
            <SwiperSlide key={trailer.id}>
              <FDTrailerItem videoKey={trailer.key} />
            </SwiperSlide>
          );
        })}
    </CustomSlider>
  );
};

FDTrailerList.propTypes = {
  specifyClass: PropTypes.string,
  trailers: PropTypes.array,
};

export default FDTrailerList;
