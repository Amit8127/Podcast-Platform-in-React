import React, { useEffect, useRef, useState } from "react";
import Header from "../components/common/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { toast } from "react-toastify";
import Button from "../components/common/Button/Button";
import EpisodeDetails from "../components/podcasts/EpisodeDetails/EpisodeDetails";
import AudioPlayer from "../components/podcasts/AudioPlayer/AudioPlayer";

const PodcastDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcasts] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const prevIdRef = useRef(null);
  const [playingFile, setPlayingFile] = useState("");

  useEffect(() => {
    if (id && id !== prevIdRef.current) {
      getData();
      prevIdRef.current = id;
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPodcasts({ id: id, ...docSnap.data() });
        toast.success("Podcast Found");
      } else {
        console.log("No Podcast!");
        toast.error("No Podcast!");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        console.error(error.message);
        toast.error(error.message);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);
  return (
    <div>
      <Header />
      <div className="form" style={{ marginTop: "0px" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <h1 style={{ textAlign: "left", margin: "0" }}>
                {podcast.title}
              </h1>
              {podcast.createdBy == auth.currentUser.uid && (
                <Button
                  width={"200px"}
                  margin={"0px"}
                  text={"Create Episode"}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                ></Button>
              )}
            </div>

            <div className="bannerImg">
              <img src={podcast.bannerImage} alt="bannerImage" />
            </div>
            <p className="podcastDesc">{podcast.description}</p>
            <h1 style={{ textAlign: "left", marginTop: "20px" }}>Episodes</h1>
            {episodes.length > 0 ? (
              <ol>
                {episodes.map((episode, index) => {
                  return (
                    <EpisodeDetails
                      key={index}
                      index={index + 1}
                      title={episode.title}
                      desc={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                })}
              </ol>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>
      {playingFile && <AudioPlayer audioSrc={playingFile} image={podcast.displayImage}/>}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default PodcastDetails;
