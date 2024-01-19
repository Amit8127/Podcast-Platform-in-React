import React, { useEffect, useState } from "react";
import Header from "../components/common/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/podcasts/PodcastCard/PodcastCard";
import Input from "../components/common/Input/Input";

const PodcastPage = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);

  const [search, setSearch] = useState("");

  const style = {
    width: '80vw',
    marginBottom: '40px',
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastData = [];
        querySnapshot.forEach((doc) => {
          podcastData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastData));
      },
      (error) => {
        console.error("Error fethching podcasts: ", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  var filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <div>
      <Header />
      <h1 id="heading">Podcast Page</h1>
      <Input
        style={style}
        state={search}
        setState={setSearch}
        placeholder={"Search By Title"}
        type="text"
      />
      {filteredPodcasts.length > 0 ? (
        <div className="podcast-flex">
          {filteredPodcasts.map((item) => {
            return (
              <PodcastCard
                key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayImage}
              />
            );
          })}
        </div>
      ) : (
        <p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>
      )}
    </div>
  );
};

export default PodcastPage;
