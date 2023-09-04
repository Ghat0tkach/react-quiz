import React, { useState } from "react";
import MessagePopup from "./Popup";

function StartScreen({ numquestions, dispatch, setUsername }) {
  const [inputUsername, setInputUsername] = useState("");
   const [showUsernamePopup, setShowUsernamePopup] = useState(false); // New state for the popup message

  const handleStart = () => {
    if (inputUsername === "") {
      // Check if username is empty
      setShowUsernamePopup(true); // Show the popup message
    } else {
      setUsername(inputUsername);
      dispatch({ type: "start" });
    }
  };
  return (
    <div className="start">
      <h2>Welcome to The JLUG Quiz</h2>
      <h3>{numquestions} questions to test your attentiveness</h3>
      <input
       className="name-field"
        type="text"
        placeholder="Enter your username"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
      />
      <button className="btn btn-ui" onClick={handleStart}>
        Let's Start
      </button>
      <MessagePopup
        isOpen={showUsernamePopup}
        message="Please write your username before starting."
        onClose={() => setShowUsernamePopup(false)}
      />
    </div>
    
  );
}

export default StartScreen;
