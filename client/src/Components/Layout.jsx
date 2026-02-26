// Layout.jsx
import { Container } from 'react-bootstrap';
import QuizNavbar from './QuizNavbar';
import '../styles/Layout.css'

const Layout = ({ children }) => (
  <div className="app-theme-wrapper">
    <QuizNavbar />
    <main className="content-area py-5">
      <Container>{children}</Container>
    </main>
  </div>
);

export default Layout;
