import React from "react";

import PropTypes from "prop-types";

const LazyLoadPlaceHolder = ({ imgLoaded, children, rounded }) => {
  const placeHolderClass = `before:absolute before:rounded-[10px] before:inset-0 before:z-[49] before:animate-pulse before:bg-[#181818] before:content-['']`;
  return (
    <div className={`${imgLoaded ? placeHolderClass : ""} relative w-full`}>
      {children}
    </div>
  );
};

LazyLoadPlaceHolder.propTypes = {
  imgLoaded: PropTypes.bool,
  children: PropTypes.node,
  rounded: PropTypes.string,
};

export default LazyLoadPlaceHolder;
