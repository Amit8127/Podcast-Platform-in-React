import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    signOut(auth).then(() => {
      toast.success("User logged out successfully");
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      toast.error(error.message);
    });
  };

  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Header />
      <div>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
        <Button text={"Log Out"} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Profile;
