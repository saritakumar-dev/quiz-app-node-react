import { Row, Col, Card } from 'react-bootstrap';
import '../styles/Home.css';
import * as BsIcons from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Home = ({subjects}) => {
   
   const navigate = useNavigate();

  const handleCardClick = (subject) =>{
    navigate(`quiz/${subject.name}`, {state:{subjectName: subject.name, subjectId : subject.id}})
  }

  
  return (
    <div className="home-container py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-white">Choose Your Challenge</h1>
        <p className="text-muted fs-5">Select a category to start testing your knowledge</p>
      </div>

      <Row className="g-4">
        {subjects.map((subject) => {
          const IconComponent = BsIcons[subject.iconName]; 
           return(
          <Col key={subject.id} xs={12} sm={6} lg={3}>
            <Card className="category-card text-center h-100 hvr-float"
              onClick={()=> handleCardClick(subject)}
              style={{cursor: 'pointer'}}>
              <Card.Body className="d-flex flex-column align-items-center p-4">
               
                <div 
                
                  style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                >
                    {IconComponent ? <IconComponent size={30}  color={subject.colorName}/> : <BsIcons.BsQuestionCircle size={40} />}
                </div>
                <Card.Title className="text-white fw-bold mb-2">{subject.name}</Card.Title>
                {/* <BsCard.Text className="text-muted small">{cat.count}</Card.Text> */}
              </Card.Body>
            </Card>
          </Col>  
           );
})}
      </Row>
    </div>
  );
};

export default Home;
