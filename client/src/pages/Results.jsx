import { useLocation , useNavigate} from "react-router-dom";
import '../styles/Results.css'
function Results() {
  const location = useLocation();
  const timeTaken = location.state?.timeTaken;
  const subject = location.state?.subject;
  const chaptername = location.state?.chaptername;
 const navigate = useNavigate();
  const backToDashboard = () =>{
    navigate('/');
  }

  return  (
    <div className="results-card">
      <div className="glass-card">
     <h1 className="congrats-text">Great Job!</h1>
        <p className="subtitle">You've completed the Quiz</p>
<div>
   <div className="stat-item">
      <span className="stat-label">Time Taken</span>
      <span className="stat-value">{timeTaken}</span>
    </div>
     <div className="stat-item">
      <span className="stat-label">Chapter Name</span>
      <span className="stat-value">{chaptername}</span>
    </div>
        <div className="stat-item">
      <span className="stat-label">Subject</span>
      <span className="stat-value">{subject}</span>
    </div>
  </div>
  <div  className="backToDashboard">
        <button onClick={backToDashboard}>Back To Dashboard</button>
      </div>
       </div>
       </div>
  )
}

export default Results;
