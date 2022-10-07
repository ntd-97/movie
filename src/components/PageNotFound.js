import React from "react";

import { TiWarning } from "react-icons/ti";

const PageNotFound = () => {
  return (
    <div className="PageNotFound h-screen flex justify-center items-center text-5xl text-primary">
      <TiWarning className="inline-block mr-2 text-6xl" />
      <p>Page not found.</p>
    </div>
  );
};

export default PageNotFound;
