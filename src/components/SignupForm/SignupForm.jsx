import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../slices/userSlice";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    if (password == confirmPassword && password.length >= 6 && name && email) {
      try {
        // Creating user's account.
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
        //Seving user's details.
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: user.email,
          uid: user.uid,
        });

        //Save data in the redux, call the redux action
        dispatch(
          setUser({
            name: name,
            email: user.email,
            uid: user.uid,
          })
        );

        //Setting a toast message to show the user
        toast.success("User has been created successfully!");

        //setting loader false
        setLoading(false);

        // after successfully signup we are redirecting to profile page..
        navigate("/profile");
      } catch (err) {
        console.error(err);
        toast.error(err.message);
        setLoading(false);
      }
    } else {
      // check all input fealds are filled 
      if (password.trim() == "") {
        toast.error("Please enter your password");
      } else if (password != confirmPassword) {
        toast.error(
          "Please Make Suer your password and confirm password matches!"
        );
      } else if (password.length < 6) {
        toast.error("Your password length should more then 6");
      } else {
        toast.error("Your name and email should Empty");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Input
        state={name}
        setState={setName}
        placeholder={"Your Name"}
        type="text"
        required={true}
      />
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
      <Input
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder={"Confirm Password"}
        type="password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Sign Up"}
        disabled={loading}
        onClick={handleSignup}
      />
    </>
  );
};

export default SignupForm;
