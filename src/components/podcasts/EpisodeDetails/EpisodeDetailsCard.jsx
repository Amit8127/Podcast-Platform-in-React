import React from "react";
import Button from "../../common/Button/Button";

const EpisodeDetailsCard = ({ index, title, desc, audioFile, onClick }) => {
  return <div className="episode">
    <h2 style={{textAlign: 'left', marginBottom: "10px", marginTop: '10px'}}>{index}. {title}</h2>
    <p className="podcastDesc" style={{marginLeft: "20px"}}>{desc}</p>
    <Button text={"Play"} onClick={() => {onClick(audioFile)}} width={'100px'} margin={'1rem'}/>
  </div>;
};

export default EpisodeDetailsCard;
