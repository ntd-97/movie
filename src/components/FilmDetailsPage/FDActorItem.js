import React, { useState, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import useBuildApiPath from "../../hooks/useBuildApiPath";

import LazyLoadPlaceHolder from "../common/LazyLoadPlaceHolder";

const FDActorItem = ({ actor }) => {
  const [imgLoaded, setImgLoaded] = useState(true);

  const navigate = useNavigate();

  const celebImgPath = useBuildApiPath({
    tag: "Img500",
    imgPath: actor?.profile_path,
  });

  const profileImg = useRef();

  return (
    <div className="flex flex-col items-center justify-center gap-y-1 text-center ">
      <LazyLoadPlaceHolder imgLoaded={imgLoaded} rounded="rounded-[20px]">
        <img
          ref={profileImg}
          className={`${
            imgLoaded ? "invisible" : ""
          } w-[200px] rounded-[20px] border-2 border-[#252229] object-cover transition-all hover:cursor-pointer hover:border-2 hover:border-white`}
          src={celebImgPath}
          alt="actor img"
          onClick={() => {
            navigate(`/celebs/profile/${actor.id}`);
          }}
          onLoad={() => {
            if (
              profileImg.current.complete &&
              profileImg.current.naturalHeight > 0
            ) {
              setImgLoaded(false);
            }
          }}
        />
      </LazyLoadPlaceHolder>

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
