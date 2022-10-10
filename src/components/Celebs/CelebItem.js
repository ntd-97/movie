import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const CelebItem = ({ celebId, name, profilePath }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center gap-y-1 rounded-[20px] bg-[#33292E] bg-opacity-60 p-3 text-center transition-all hover:scale-95 hover:cursor-pointer hover:bg-opacity-100"
      onClick={() => {
        navigate(`/celebs/profile/${celebId}`);
      }}
    >
      <img
        className="h-[230px] w-full rounded-[10px] object-cover transition-all lg:h-[200px] 2xl:h-[300px]"
        loading="lazy"
        src={`${process.env.REACT_APP_API_PATH_IMG_W500}${profilePath}`}
        alt="actor img"
      />
      <p className="mt-2 inline-block w-full truncate font-medium text-[#ececec] transition-all hover:text-white">
        {name}
      </p>
    </div>
  );
};

CelebItem.propTypes = {
  celebId: PropTypes.number,
  name: PropTypes.string,
  profilePath: PropTypes.string,
};

export default CelebItem;
