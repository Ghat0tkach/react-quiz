function FinishScreen({points,maxPossiblePoints,dispatch}) {
    const percentage=(points/maxPossiblePoints)*100;
  return (
    <>
   <p className="result">You scored <strong>{points}</strong> out of <strong>
         {maxPossiblePoints}
   </strong>

   &nbsp;
   (
     
    {Math.ceil(percentage)}%
   )</p>
   
   <button className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}>
   restart
</button>
</>
  )
}

export default FinishScreen