import React from "react";
import Header from "../components/common/Header/Header";
import CreateAPodcastForm from "../components/StartAPodcast/CreateAPodcastForm";

const CreateAPodcast = () => {
  return (
    <div>
      <Header />
      <div className="form">
        <h1  id="heading">Create A Podcast</h1>
        <CreateAPodcastForm />
      </div>
    </div>
  );
};

export default CreateAPodcast;
