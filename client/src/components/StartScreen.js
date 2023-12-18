import React, { useState } from "react";
import MessagePopup from "./Popup";
import LoginForm from "../pages/Home/SignIn";
import Home from "../pages/Home";
import { useSelector } from "react-redux";

function StartScreen({ numquestions, dispatch, setUsername }) {
   const {user}=useSelector(state=>state.user);
  // const [inputUsername, setInputUsername] = useState("");
  //  const [showUsernamePopup, setShowUsernamePopup] = useState(false); // New state for the popup message

  const handleStart = () => {
   
     
      dispatch({ type: "start" });
    }
  
  return (
    <div className="start">
      <h3>Welcome {user.name} to the Quiz </h3>
      <h4> Are You Ready to Take on the {user.domain} Challenge?</h4>
      <button className="btn btn-ui" onClick={handleStart}>
        Let's Start
      </button>

    </div>
 
  );
}

export default StartScreen;
