import React, { useState } from "react";
import "./form.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

export default function Home({dispatch}) {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App1">
      <h2>Sign in/up to get Started</h2>
      <div className={containerClass} id="container">
        <SignUpForm dispatch={dispatch} />
        <SignInForm dispatch={dispatch} />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="heading1">Welcome Back!</h1>
              <p>
                To check your scores , login!
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="heading1">Hello, Learner!</h1>
              <p>Enter your details to start the Quiz</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
