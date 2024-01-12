import React from "react";
import './style.css';

const Input = ({type, state, setState, placeholder, required}) => {
  return (
    <input
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
