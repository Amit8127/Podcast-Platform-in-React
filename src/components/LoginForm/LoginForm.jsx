import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { getDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setUser } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        //getting the user details from Doc
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
            profilePic: userData.profilePic,
          })
        );

        toast.success("You have successfully Login");

        setLoading(false);

        // // after successfully login we are redirecting to profile page..
        navigate("/profile");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
        toast.error("Enter your Email and Password");
        setLoading(false);
    }
  };

  return (
    <>
      <Input
        state={email}
        setState={setEmail}
        placeholder={"Your Email"}
        type="email"
        required={true}
      />
      <Input
        state={password}
        setState={setPassword}
        placeholder={"Password"}
        type="password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Log In"}
        onClick={handleLogin}
        disabled={loading}
      />
    </>
  );
};

export default LoginForm;
