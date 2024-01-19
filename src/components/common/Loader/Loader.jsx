import React from "react";
import "./style.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
