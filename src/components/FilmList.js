import { SwiperSlide } from "swiper/react";

import CustomSlider from "./CustomSlider";
import FilmItem from "./FilmItem";

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

const FilmList = ({ title, type, specifyClass, films }) => {
  return (
    <div className="FilmList relative">
      <h2 className="text-2xl text-[#ECECEC] font-medium mb-5">{title}</h2>

      {films?.length > 0 ? (
        <div className="rounded-[20px] overflow-hidden">
          <CustomSlider
            specifyClass={specifyClass}
            paginationClass="normalList"
            config={swiperResponsiveConfig}
          >
            {films?.map((film) => {
              return (
                <SwiperSlide key={film?.id}>
                  <FilmItem type={type} filmID={film?.id} info={film} />
                </SwiperSlide>
              );
            })}
          </CustomSlider>
        </div>
      ) : (
        <h3 className="text-primary text-center text-2xl mb-10">{`${
          type === "movies" ? "Movies" : "TV Series"
        } not found`}</h3>
      )}
    </div>
  );
};

FilmList.propTypes = {
  specifyClass: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  films: PropTypes.array,
};

export default FilmList;
