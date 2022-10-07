import React from "react";

import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const FDActorItem = ({ actor }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-y-1 text-center">
      <img
        className="w-[200px] object-cover rounded-[20px] hover:cursor-pointer transition-all border-2 border-[#252229] hover:border-2 hover:border-white"
        loading="lazy"
        src={`${process.env.REACT_APP_API_PATH_IMG_W500}${actor?.profile_path}`}
        alt="actor img"
        onClick={() => {
          navigate(`/celebs/profile/${actor.id}`);
        }}
      />

      <Link
        to={`/celebs/profile/${actor.id}`}
        className="font-medium text-[#ececec] transition-all hover:text-white mt-3"
      >
        {actor?.original_name}
      </Link>

      <p className="font-light text-[#b5b5b5]">{actor?.character}</p>
    </div>
  );
};

FDActorItem.propTypes = {
  actor: PropTypes.object,
};

export default FDActorItem;
