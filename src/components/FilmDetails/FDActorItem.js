import React from "react";

const FDActorItem = ({ actor }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-1 text-center">
      <img
        className="w-[200px] object-cover rounded-[20px] hover:cursor-pointer transition-all border-2 border-[#252229] hover:border-2 hover:border-white"
        src={`${process.env.REACT_APP_API_PATH_IMG_W500}${actor?.profile_path}`}
        alt="actor img"
      />
      <a
        href="#demo"
        className="font-medium text-[#ececec] transition-all hover:text-white"
      >
        {actor?.original_name}
      </a>
      <p className="font-light text-[#b5b5b5]">{actor?.character}</p>
    </div>
  );
};

export default FDActorItem;
