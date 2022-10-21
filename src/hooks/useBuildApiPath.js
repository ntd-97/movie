const useBuildApiPath = ({
  tag,
  page = 1,
  search = "",
  imgPath = "",
  celebId,
  videoKey,
  type,
}) => {
  switch (tag) {
    case "MovieListPage":
      return `${process.env.REACT_APP_API_PATH_DISCOVER_MOVIE}${
        process.env.REACT_APP_API_KEY
      }&language=en-US&certification_country=US&page=${page}${search.replace(
        "?",
        "&"
      )}`;
    case "TVListPage":
      return `${process.env.REACT_APP_API_PATH_DISCOVER_TV}${
        process.env.REACT_APP_API_KEY
      }&language=en-US&page=${page}${search.replace("?", "&")}`;
    case "CelebProfile":
      return `${process.env.REACT_APP_API_PATH_PEOPLE}${celebId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=movie_credits,tv_credits`;
    case "CelebListPage":
      return `${process.env.REACT_APP_API_PATH_PEOPLE}popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
    case "Img500":
      return `${process.env.REACT_APP_API_PATH_IMG_W500}${imgPath}`;
    case "ImgOriginal":
      return `${process.env.REACT_APP_API_PATH_IMG_ORIGINAL}${imgPath}`;
    case "TrailerImg":
      return `${process.env.REACT_APP_API_PATH_YOUTUBE_IMG}${videoKey}/0.jpg`;
    case "FilterBarGenres":
      return `${process.env.REACT_APP_API_PATH_GENRES}${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    case "FilterBarCertifications":
      return `${process.env.REACT_APP_API_PATH_CERTIFICATIONS}${type}/list?api_key=${process.env.REACT_APP_API_KEY}`;
    default:
      break;
  }
};

export default useBuildApiPath;
