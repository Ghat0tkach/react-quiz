import { useEffect, useReducer } from "react"
import Header from "./header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Question from "./Question"
import NextButton from "./NextButton"
import { Progress } from "./Progress"
import FinishScreen from "./FinishScreen"
import Footer from "./Footer"
import Timer from "./Timer"


const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: 100,
  quizStartTime: null,
  totalTimeElapsed: 0,
  username: "", // Add username to initial state
};
function reducer(state, action) {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload, // Set the username in the state
      };
      case "dataReceived":
          return {
              ...state,
              questions: action.payload,
              status: "ready",
          };
      case "dataFailed":
          return {
              ...state,
              status: "error",
          };
      case "start":
          return {
              ...state,
              status: "active",
              quizStartTime: new Date(), // Record the quiz start time
          };
      case "newAnswer":
          const question = state.questions.at(state.index);
          return {
              ...state,
              answer: action.payload,
              points: action.payload === question.correctOption ? state.points + question.points : state.points,
          };
      case "nextQuestion":
          return {
              ...state,
              index: state.index + 1,
              answer: null,
          };
      case "finish":
          const quizEndTime = new Date(); // Get the current time when the quiz finishes
          const elapsedTime = (quizEndTime - state.quizStartTime) / 1000; // Calculate total time elapsed in seconds
          return {
              ...state,
              status: "finished",
              totalTimeElapsed: elapsedTime, // Set total time elapsed in state
          };
      case "restart":
          return {
              ...initialState,
              status: "ready",
              questions: state.questions,
          };
      case "tick":
          return {
              ...state,
              secondsRemaining: state.secondsRemaining - 1,
              status: state.secondsRemaining === 0 ? "finished" : state.status,
          };
      default:
          throw new Error("Action Unknown");
  }
}


export default function App(){
  const [{questions,status,index,answer,points,secondsRemaining,totalTimeElapsed,username},dispatch]= useReducer(reducer,initialState);

  const numQuestions=questions.length; 
  const maxPossiblePoints=questions.reduce((prev,cur)=>prev+cur.points,0);

  useEffect(function(){
    fetch("https://reactquizapppart2.onrender.com/api/questions", {})
    .then((res) => res.json()) // Return the parsed JSON data
    .then((data) => dispatch({ type: "dataReceived", payload: data }))
    .catch((err) => dispatch({ type: "dataFailed" }));
  
  },[]);
  return <div className="app">
      <Header/>
      <Main>
        {status==="loading" && <Loader/>}
        {status==="error" && <Error/>}
        {status==="ready" &&<StartScreen
            numquestions={numQuestions}
            dispatch={dispatch}
            setUsername={(username) => dispatch({ type: "setUsername", payload: username })}
          />}
        {status==="active" && 
          <>
          <Progress index={index} numQuestion={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
          <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
          <Footer>
          <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
          <NextButton dispatch={dispatch} answer={answer}index={index} numQuestion={numQuestions}/>
         </Footer>
        </>
      }
     {status==="finished"  && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch} username={username} totalTimeElapsed={totalTimeElapsed} />}
         
      </Main>
  </div>
}