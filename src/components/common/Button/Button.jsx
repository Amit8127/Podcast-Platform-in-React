import React from "react";
import "./style.css";

const Button = ({ text, onClick, disabled, width, margin}) => {
  return (
    <div
      onClick={onClick}
      className="custom-btn"
      disabled={disabled}
      style={{ width: width, margin: margin }}
    >
      {text}
    </div>
  );
};

export default Button;
