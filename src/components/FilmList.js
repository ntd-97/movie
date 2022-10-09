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
      <h2 className="mb-5 font-medium text-[#ECECEC] lg:text-xl 2xl:text-2xl">
        {title}
      </h2>

      {films?.length > 0 ? (
        <div className="overflow-hidden rounded-[20px]">
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
        <h3 className="mb-10 text-center text-2xl text-primary">{`${
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
