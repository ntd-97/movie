import React from "react";

import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import useBuildApiPath from "../../hooks/useBuildApiPath";

const FDActorItem = ({ actor }) => {
  const navigate = useNavigate();

  const celebProfilePath = useBuildApiPath({
    tag: "Img500",
    imgPath: actor?.profile_path,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-y-1 text-center">
      <img
        className="w-[200px] rounded-[20px] border-2 border-[#252229] object-cover transition-all hover:cursor-pointer hover:border-2 hover:border-white"
        src={celebProfilePath}
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
