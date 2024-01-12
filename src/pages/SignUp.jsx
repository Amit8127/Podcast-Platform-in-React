import React, { useState } from "react";
import Header from "../components/Header/Header";
import SignupForm from "../components/SignupForm/SignupForm";
import LoginForm from "../components/LoginForm/LoginForm";

const SignUp = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="form">
        {!flag ? <h1>SignUp Page</h1> : <h1>LogIn Page</h1>}
        {!flag ? <SignupForm /> : <LoginForm />}
        {!flag ? (
          <p onClick={() => setFlag(!flag)}>
            Already have an Account? Click here to <span>LogIn.</span>
          </p>
        ) : (
          <p onClick={() => setFlag(!flag)}>
            Don't have an Account? Click here to <span>SingUp.</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
