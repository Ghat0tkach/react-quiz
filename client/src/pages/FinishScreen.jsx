import { useEffect, useState } from "react";

import { PostServerData } from "../helper/helper";
// Import your helper function

function FinishScreen({ points,totalTimeElapsed,user}) {
 
  const id=user._id;

  // Function to handle submitting the score to the leaderboard
  useEffect(() => {
    const handleSubmitScore = async () => {
   
      const time=totalTimeElapsed

      const result = { id, points,time};

      await PostServerData("https://jlug-quiz-server.onrender.com/api/v1/save", result, (data) => {
        if (data.success) {
          console.log("Score added to leaderboard successfully");
          console.log(data)
          // Navigate to the leaderboard after posting data
       
        } else {
          console.error("Failed to add score to leaderboard");
        }
      });

      // setUsername(""); // You may or may not need to clear the username here
    };
    handleSubmitScore(); // Automatically submit the score when the component mounts
  }, [points,totalTimeElapsed]);
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> Points <strong>👏🚀</strong>

      </p>
      <p className="result">Time taken : {totalTimeElapsed} seconds</p>

     
     
    </>
  );
}

export default FinishScreen;
