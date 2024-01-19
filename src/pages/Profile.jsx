import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/common/Header/Header";
import Button from "../components/common/Button/Button";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader/Loader";
import PodcastCard from "../components/podcasts/PodcastCard/PodcastCard";
import { collection, onSnapshot, query } from "firebase/firestore";
import { setPodcasts } from "../slices/podcastSlice";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User logged out successfully");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
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
  if (!user) {
    return <Loader />;
  }

  var filteredPodcasts = podcasts.filter((item) => item.createdBy == user.uid);
  return (
    <div>
      <Header />
      <h1 id="heading">Profile</h1>
      <div className="profile-flex">
        <img className="profilePic" src={user.profilePic} alt="profile pic" />
        <div className="profileDetails">
          <h1>{user.name}</h1>
          <Button text={"Log Out"} onClick={handleLogout} width={"250px"} />
        </div>
      </div>
      <br />
      <h1 style={{ marginTop: "10px" }} id="heading">
        Your Podcasts
      </h1>
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
        <p>
          {filteredPodcasts.length != 0
            ? "Podcast Not Found"
            : "No Podcasts On The Platform"}
        </p>
      )}
    </div>
  );
};

export default Profile;
