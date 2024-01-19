import React from "react";
import Button from "../../common/Button/Button";

const EpisodeDetails = ({ index, title, desc, audioFile, onClick }) => {
  return <div>
    <h1 style={{textAlign: 'left', marginBottom: "10px"}}>{index}. {title}</h1>
    <p className="podcastDesc" style={{marginLeft: "20px"}}>{desc}</p>
    <Button text={"Play"} onClick={() => onClick(audioFile)} width={'100px'} margin={'1rem'}/>
  </div>;
};

export default EpisodeDetails;
