import React from "react";
import './style.css';

const Input = ({style, type, state, setState, placeholder, required}) => {
  return (
    <input
      style={style}
      type={type}
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="custome-input"
    />
  );
};

export default Input;
