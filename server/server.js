const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Create a Connection Pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      // Your MySQL username
  password: 'React@26', // Your MySQL password
  database: 'quizmasterdb',
  waitForConnections: true,
  connectionLimit: 10
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL database "quizmasterdb"');
    connection.release(); // Always release the connection back to the pool
  }
});


// 2. Define the POST Route
app.post('/api/questions', (req, res) => {

      console.log('Incoming Body:', req.body); 

 

  const { question_text, subject, marks_allotted, chapter_name } = req.body;

  // Change this line
const sql = 'INSERT INTO questions (question_text, subject, marks_allotted, chapter_name) VALUES (?, ?, ?, ?)';

  pool.query(sql, [question_text, subject, marks_allotted, chapter_name], (err, result) => {
    if (err) {
      console.error(err);
       return res.status(500).json({ error: err.message});
    }
    console.log(result);
    res.status(201).json({ message: 'Question saved!', id: result.insertId });
  });
});




app.get('/api/questions/:subject', (req, res) => {
  console.log(req.params);
  const selectedSubject = req.params.subject;
  console.log(selectedSubject);
  const sql = 'SELECT * FROM questions WHERE subject = ?';

  pool.query(sql, [selectedSubject], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results); // Returns only questions for the selected subject
  });
});

app.get('/api/subjects',(req, res) => {
  const sql= 'Select * From subjects';

  pool.query(sql,(err,results) => {
    if(err){
      return res.status(500).json({error:err.message});
    }
    res.json(results);
  });
})

app.listen(5000, () => console.log('Server running on port 5000'));
