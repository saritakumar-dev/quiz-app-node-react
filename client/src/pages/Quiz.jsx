import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import {BsBarChartSteps , BsBookmarkFill, BsChevronLeft, BsChevronRight, BsClock} from 'react-icons/bs';
import axios from "axios";
import Swal from 'sweetalert2';


function Quiz() {
  const id= useParams();
  const location = useLocation(); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const[seconds, setSeconds]=useState(0);
  const subjectName = location.state?.subjectName;
  const navigate = useNavigate();
  var timeElapsed =0;
//set questions based on subject selected



useEffect(() => {
    axios.get(`http://localhost:5000/api/questions/${subjectName}`)
        .then(res => {
            setQuestions(res.data);
        })
        .catch(err => console.error("FETCH ERROR:", err));
}, [subjectName]); 
useEffect(()=>{
  const timer = setInterval(() => {
    setSeconds(prev => prev+1)
  }, 1000);

  return ()=> clearInterval(timer)
},[])

const formatTime = (totalSeconds) => {
    const mins =Math.floor(totalSeconds/60);
    const secs = totalSeconds%60;
    timeElapsed =`${mins.toString().padStart(2,'0')}: ${secs.toString().padStart(2,'0')}`;
    return timeElapsed;
};

const handleNext = () => {
    if(currentIndex < questions.length-1)
      setCurrentIndex((prev)=> prev+1)
    else{
       Swal.fire({
                title: 'Finish Test?',
                text: "You won't be able to revert this! Review before submitting",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28a745', // Bootstrap 'success' color
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, submit it!'
              }).then((result) => {
            if (result.isConfirmed) {
                submitQuiz();
              }
    });
    }
}

const submitQuiz = () => {
  navigate('/results', {state:{timeTaken : timeElapsed, subject:subjectName, chaptername:questions[currentIndex].chapter_name, totalQuestions : questions.length}})
}

if (questions.length === 0) {
  return <Container className="py-4 text-white">Loading questions for {subjectName}...</Container>;
}

const currentQuestion = questions[currentIndex];
const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
  <div>
      <Container className="quiz-container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-white mb-0">{subjectName} Quiz</h4>
        <div className="text-white d-flex align-items-center bg-dark px-3 py-1 rounded-pill">
            <BsClock className="me-2" />
            <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
              {formatTime(seconds)}
            </span>
        </div>
        <div className="chapter-badge">
          <BsBookmarkFill className="me-2" />
          {questions[currentIndex].chapter_name}
        </div>
      </div>
        <BsBarChartSteps  essBar now={progress} className="mb-4 quiz-progress" />

       <Card className="quiz-card border-0 shadow-lg">
        <Card.Body className="p-4">
          {/* Question Meta Info */}
          <div className="d-flex justify-content-between mb-3 text-muted small">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span className="marks-allotted">Marks: {currentQuestion.marks_allotted}</span>
          </div>

          {/* Question Text */}
          <h5 className="question-text mb-4">{currentQuestion.question_text}</h5>
           </Card.Body>

        {/* Short & Consistent Navigation Footer */}
        <Card.Footer className="bg-transparent border-0 d-flex justify-content-between p-4">
          <Button 
            variant="secondary" 
            onClick={() => setCurrentIndex(prev => prev - 1)}
            disabled={currentIndex === 0}
            className="d-flex align-items-center"
          >
            <BsChevronLeft className="me-1" /> Prev
          </Button>
          
          <Button 
            variant="primary" 
            onClick={handleNext}//{() => setCurrentIndex(prev => prev + 1)}
            className="d-flex align-items-center"
          >
            Next <BsChevronRight className="ms-1" />
          </Button>
        </Card.Footer>
      </Card>
    </Container>
    </div>
  );
}

export default Quiz;
