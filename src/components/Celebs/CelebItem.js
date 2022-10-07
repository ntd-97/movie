import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const CelebItem = ({ celebId, name, profilePath }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-center items-center gap-y-1 text-center p-2 bg-[#33292E] bg-opacity-60 rounded-3xl transition-all hover:cursor-pointer hover:bg-opacity-100"
      onClick={() => {
        navigate(`/celebs/profile/${celebId}`);
      }}
    >
      <img
        className="w-[200px] object-cover rounded-[20px] transition-all"
        loading="lazy"
        src={`${process.env.REACT_APP_API_PATH_IMG_W500}${profilePath}`}
        alt="actor img"
      />
      <p className="font-medium text-[#ececec] transition-all hover:text-white inline-block w-full mt-2 truncate">
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
