import { useEffect, useState } from "react";

import { PostServerData } from "../helper/helper";
import axios from "axios";
import { Link } from "react-router-dom";
// Import your helper function

function FinishScreen({ points, totalTimeElapsed, user }) {
  const [formData, setFormData] = useState({
    userId: user._id,
    points: points,
    timestamps: totalTimeElapsed,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const sendFormData = async () => {
      try {
        // Make a POST request to the API endpoint
        const response = await axios.post(
          "https://jlug-quiz-server.onrender.com/api/v1/final/save",
          formData
        );

        // Display success message
        setMessage(response.data);
        
      } catch (error) {
        // Handle errors
        setMessage("Error updating points and timestamps.");
        console.error(error);
      }
    };

    sendFormData(); // Call the function when the component mounts
  }, [formData]); 
  
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> Points <strong>👏🚀</strong>

      </p>
      <p className="result">Time taken : {totalTimeElapsed} seconds</p>

     <Link to="/">Go To Home</Link>
     
    </>
  );
}

export default FinishScreen;
