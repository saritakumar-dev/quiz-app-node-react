import { useState , useEffect} from 'react'

import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import Layout from './Components/Layout'
import CreateQuiz from './pages/CreateQuiz'
import axios from 'axios';
import { Whoops404 } from './Components/Whoops404';


function App() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
    // Fetch data from your API
    axios.get('http://localhost:5000/api/subjects')
      .then(response => {   
        setSubjects(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching subjects:", error));
  }, []);
   if (loading) return <div>Loading Subjects...</div>;
  return (
   <BrowserRouter>
   <Layout>
      <Routes>
        <Route path="/" element={<Home subjects={subjects}/>} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/create" element={<CreateQuiz  subjects={subjects}/>} />
        <Route path='*' element={<Whoops404/>}/>
      </Routes>
      </Layout>
      <ToastContainer theme="dark" position="top-right" />
   </BrowserRouter>
  )
}

export default App
