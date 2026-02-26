import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../styles/quiznavbarstyles.css';

const QuizNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="custom-quiz-nav">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="quiz-logo">
          ⚡ QuizMaster
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end className="nav-item-custom">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/create" className="nav-item-custom">
              Create Quiz
            </Nav.Link>
            <Button variant="outline-info" className="ms-lg-3 login-btn">
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default QuizNavbar;
