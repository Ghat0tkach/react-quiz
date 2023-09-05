import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data when the component mounts
    axios.get('https://reactquizapppart2.onrender.com/api/leaderboard')
      .then((response) => {
       
        setLeaderboardData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching leaderboard data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th >Username</th>
            <th >Points</th>
            <th >Time</th>
            {/* Add more table headers if needed */}
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.username}</td>
              <td>{entry.points}</td>
              <td>{entry.time} seconds </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
