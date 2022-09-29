import React from "react";

import PropTypes from "prop-types";

import Portal from "../Portal";

const FDTrailerModal = ({ visible, onClose, children, bodyClassName = "" }) => {
  return (
    <Portal
      visible={visible}
      onClose={onClose}
      containerClassName="fixed z-[9999] inset-0 flex items-center justify-center"
      bodyStyle={{ transition: "all 250ms" }}
      bodyClassName={`relative z-10 content ${bodyClassName}`}
    >
      {children}
    </Portal>
  );
};

FDTrailerModal.propTypes = {
  bodyClassName: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  visible: PropTypes.bool,
};

export default FDTrailerModal;
