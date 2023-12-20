import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function StartScreen({ onStart }) {
  const { user } = useSelector((state) => state.user);
  const id = user._id;
  const [username, setUser] = useState(null);
  const [loading, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://jlug-quiz-server.onrender.com/api/v1/final/getuser/${id}`
        );
      
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleStart = () => {
    onStart();
    navigate('/quiz');
  };

  const handleFinish = () => {
    navigate('/finish');
  };

  function UserProfile({points}) {
    const { user } = useSelector((state) => state.user);
  
    return (
      <div>
        <h2>Your Profile</h2>
        <p>Name: {user.name}</p>
        <p>Points: {points}</p>
        {/* Add more information as needed */}
      </div>
    );
  }

  return (
    <div className="start">
      <h3>Welcome {user.name} to the Quiz </h3>
      <h4> Are You Ready to Take on the {user.domain} Challenge?</h4>
      {loading ? (
        <p>Hang on, We are getting your details...</p>
      ) : username?.points > -1 ? (
        <UserProfile points={username.points}/>
              ) : (
        <button className="btn btn-ui" onClick={handleStart}>
          Let's Start
        </button>
      )}
    </div>
  );
}

export default StartScreen;
