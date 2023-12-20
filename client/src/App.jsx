import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from './pages/Home';
import Quiz from './components/Quiz';
import FinishScreen from './pages/FinishScreen';
import { useSelector } from 'react-redux';
import axios from 'axios';
import StartScreen from './components/StartScreen';

function App() {
  const [startedQuiz, setStartedQuiz] = useState(false);
  const {user}=useSelector(state=>state.user);
 const {token}=user;
  return (
   <Router>
    <Routes>
        <Route path='/login' element={<Home/>}/>
        <Route
          path='/'
          element={token?<StartScreen onStart={() => setStartedQuiz(true)} />:<Navigate to="/login"/>} 
        />
        {/* Conditionally render /quiz based on startedQuiz state */}
        {startedQuiz ? (
          <Route path='/quiz' element={<Quiz />} />
        ) : (
          // If not started, redirect to /
          <Route path='*' element={<Navigate to='/' />} />
        )}
        <Route path='/finish' element ={<FinishScreen/>}/>
</Routes>
   </Router>
  )
}

export default App         