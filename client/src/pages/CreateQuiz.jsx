import { useEffect, useState } from 'react';
import { Form, Button, Card, Row, Col, InputGroup } from 'react-bootstrap';
import { BsPlusCircle, BsTrash } from 'react-icons/bs'; // Optional: npm install react-icons
import { toast } from 'react-toastify'; 
import '../styles/CreateQuiz.css';
import { Prev } from 'react-bootstrap/esm/PageItem';

const CreateQuiz = ({subjects}) => {

   const [currentIndex, setCurrentIndex] =useState(1);
    const [formData, setFormData] = useState({ question: '', marks_allotted:'', subject: '', chapter_name:'' });
    // const[selectedSubject, setSelectedSubject] = useState('');
     const handleChange = (e) => {
        // setSelectedSubject(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const handleAddQuestion = (e)=>{
      console.log("in add question");
      setFormData(prev=>({
        ...prev, question_text:'', marks_allotted:''
      }));
    console.log(formData);
    }

    const handleSaveQuestion = async (e) => {
    e.preventDefault(); // Stop page refresh
    console.log("save question",formData);
    try {
      const response = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Convert object to JSON
      });

      const result = await response.json();
      console.log (result);
       if (!response.ok) {
        throw new Error("Failed to save question");
      }
        toast.success('Question saved successfully! 🚀', {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
       setCurrentIndex(prevIndex => prevIndex+1);
        } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(currentIndex);
  return (
    <div className="create-quiz-container">
      {/* Quiz Meta Data */}
      <Card className="quiz-card mb-4">
        <Card.Body>
          <h2 className="mb-4 text-info">Create New Quiz</h2>
          <Row>
            <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter Chapter Name"  value={formData.chapter_name}
            onChange={handleChange} className="custom-input" name="chapter_name" required/>
          </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group>
              <Form.Select 
            value={formData.subject}
            onChange={handleChange}
            required
            className="custom-input"
            name='subject'
          >
            <option value="">-- Choose a Subject --</option>
             {subjects.map((sub) => (
              <option key={sub.id} value={sub.name}>
                {sub.name}
              </option>
            ))}
            </Form.Select>

          </Form.Group>
          </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="m-0">Questions</h4>
            <Button variant="outline-info" size="sm" className="btn-quiz-action" onClick={handleAddQuestion} >
              <BsPlusCircle className="me-2"
              /> Add Question
            </Button>
          </div>

          {/* Individual Question Item */}
          <div className="question-builder-item p-3 mb-4">
            <div className="d-flex justify-content-between mb-3">
              <span className="badge bg-info">Question {currentIndex}</span>
              <Button variant="link" className="text-danger p-0" onClick={handleAddQuestion}><BsTrash /></Button>
            </div>
            
            <Form.Control 
              as="textarea" 
              rows={2} 
              placeholder="Enter your question here..." 
              className="custom-input mb-3" 
              name='question_text'
              value={formData.question_text}
              onChange={handleChange}
              required
            />
            <Form.Control 
              as="textarea" 
              type='number'
              rows={1} 
              placeholder="Marks allotted" 
              className="custom-input" 
              name='marks_allotted'
              value={formData.marks_allotted}
              onChange={handleChange}
              required
            />
          </div>
          <Button variant="info" size="lg" className="btn-quiz-action px-5" onClick={handleSaveQuestion}>
            Save Quiz
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateQuiz;
