import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const PodcastCard = ({id, title, displayImage }) => {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img className="podcastImg" src={displayImage} alt="displayImage" />
        <p className="podcastTitle">{title}</p>
      </div>
    </Link>
  );
};

export default PodcastCard;
