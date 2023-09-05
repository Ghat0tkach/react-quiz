import { useEffect, useState } from "react";
import { PostServerData } from "../helper/helper";
import Leaderboard from "./LeaderBoard";
// Import your helper function

function FinishScreen({ points, maxPossiblePoints, dispatch ,username,totalTimeElapsed}) {



  // Function to handle submitting the score to the leaderboard
  useEffect(() => {
    const handleSubmitScore = async () => {
      if (!username) {
        alert("Please enter your username before submitting.");
        return;
      }
      const time=totalTimeElapsed

      const result = { username, points,time};

      await PostServerData("https://reactquizapppart2.onrender.com/api/leaderboard", result, (data) => {
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
  }, [points, username,totalTimeElapsed]);
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> Points <strong>👏🚀</strong>

      </p>
      <p className="result">Time taken : {totalTimeElapsed} seconds</p>

      <Leaderboard/>
     
    </>
  );
}

export default FinishScreen;
