import React from "react";
import "./style.css";

const FileInput = ({accept, id, fileHandleFun}) => {

    const onChange = (e) => {
        console.log(e.target.files);
        fileHandleFun(e.target.files[0]);
    }
  return (
    <>
      <input accept={accept} id={id} className="custom-file-input custome-input" type="file" onChange={onChange} ></input>
    </>
  );
};

export default FileInput;
