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

const FilmList = ({ title, type, ...props }) => {
  return (
    <div className="FilmList relative">
      <h2 className="text-2xl text-[#ECECEC] font-medium mb-5">{title}</h2>
      <CustomSlider
        specifyClass={props.specifyClass}
        paginationClass="normalList"
        config={swiperResponsiveConfig}
      >
        {props.films?.map((film) => {
          return (
            <SwiperSlide key={film.id}>
              <FilmItem type={type} filmID={film.id} info={film} />
            </SwiperSlide>
          );
        })}
      </CustomSlider>
    </div>
  );
};

export default FilmList;
