import React from "react";

import PropTypes from "prop-types";

const LazyLoadPlaceHolder = ({ imgLoaded, children, rounded }) => {
  return (
    <div
      className={`${
        imgLoaded
          ? `before:absolute before:${rounded} before:inset-0 before:z-[49] before:animate-pulse before:bg-[#181818] before:content-['']`
          : ""
      } relative w-full`}
    >
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
