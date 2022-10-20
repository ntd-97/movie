const useBuildApiPath = ({ tag, page = 1, search = "", imgPath = "" }) => {
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
    case "Img500":
      return `${process.env.REACT_APP_API_PATH_IMG_W500}${imgPath}`;
    case "ImgOriginal":
      return `${process.env.REACT_APP_API_PATH_IMG_ORIGINAL}${imgPath}`;
    default:
      break;
  }
};

export default useBuildApiPath;
