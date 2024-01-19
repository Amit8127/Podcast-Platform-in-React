import React, { useState } from "react";
import Header from "../components/common/Header/Header";
import SignupForm from "../components/SignupForm/SignupForm";
import LoginForm from "../components/LoginForm/LoginForm";

const SignUp = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="form">
        {!flag ? <h1  id="heading">SignUp Page</h1> : <h1  id="heading">LogIn Page</h1>}
        {!flag ? <SignupForm /> : <LoginForm />}
        {!flag ? (
          <p style={{color: 'var(--purple-gray)', cursor: "pointer", marginTop: '3rem'}} onClick={() => setFlag(!flag)}>
            Already have an Account? Click here to <span style={{color: 'var(--blue)', fontWeight: '500'}}>LogIn.</span>
          </p>
        ) : (
          <p style={{color: 'var(--purple-gray)' , cursor: "pointer",  marginTop: '3rem'}} onClick={() => setFlag(!flag)}>
            Don't have an Account? Click here to <span style={{color: 'var(--blue)', fontWeight: '500'}}>SingUp.</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
