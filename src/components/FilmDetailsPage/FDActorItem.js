import React from "react";

import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const FDActorItem = ({ actor }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-y-1 text-center">
      <img
        className="w-[200px] rounded-[20px] border-2 border-[#252229] object-cover transition-all hover:cursor-pointer hover:border-2 hover:border-white"
        src={`${process.env.REACT_APP_API_PATH_IMG_W500}${actor?.profile_path}`}
        alt="actor img"
        onClick={() => {
          navigate(`/celebs/profile/${actor.id}`);
        }}
      />

      <Link
        to={`/celebs/profile/${actor.id}`}
        className="mt-3 font-medium text-[#ececec] transition-all hover:text-white"
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
