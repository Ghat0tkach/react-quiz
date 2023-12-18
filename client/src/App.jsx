import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Quiz from './components/Quiz';

function App() {
  return (
   <Router>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
</Routes>
   </Router>
  )
}

export default App         