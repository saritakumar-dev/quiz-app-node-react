# 🧠 QuizMaster: Dynamic Learning Platform

QuizMaster is a full-stack Single Page Application (SPA) built with React. It allows users to test their knowledge across various subjects or contribute to the platform by creating customized, chapter-wise quizzes.

## 🚀 Features

### **For Learners**
*   **Dynamic Dashboard:** View all available subjects with icons fetched directly from the database.
*   **Subject-Based Learning:** Select a specific subject to start a focused quiz session.
*   **Timed Assessments:** Integrated timer functionality to track performance.
*   **Real-time Results:** summary upon quiz submission.

### **For Creators**
*   **Quiz Builder:** Dedicated interface to add new subjects and chapters.
*   **Custom Marking:** Assign specific marks/points to individual questions.
*   **Seamless Integration:** New questions are instantly stored in the DB and available on the dashboard.

---

## 🛠️ Tech Stack

*   **Frontend:** React.js (Hooks & Functional Components)
*   **Routing:** React Router DOM
*   **State Management:** React useState
*   **Backend/DB:** MySQL 8.0
*   **Icons:** Dynamically rendered from DB strings

---

## 📂 Project Structure

```text
.
├── client/           # React Frontend (SPA)
│   └── src/
│       ├── components/    # UI parts (Navbar, PageNotFound)
│       ├── pages/         # Routed views (Home(Dashboard), Quiz, CreateQuiz, Results)
│       ├── styles/        # For Different pages (CreateQuiz, Home, Navbar, Results)
│       ├── App.js         # Routing configuration
│       └── main.js
│
└── server/           # Node.js Backend (Separate Project)
       └── server.js          # Entry point and API Endpoints for the frontend


Architecture Note: This is a decoupled full-stack application. The React SPA acts as the client-side interface, making asynchronous REST API calls to a Node.js/Express server which handles all database operations and business logic.

```
---

## 🔌 API Documentation

The React application communicates with the Node.js backend via the following REST endpoints:

Subjects
GET /api/subjects - Fetches all available subjects and their icons for the Dashboard.

Quizzes
GET /api/quiz/:subjectId - Retrieves all questions and chapters for a specific subject name.
POST /api/quiz/create - Submits a new quiz (questions, chapters, and marks) to the database.


---
## ⚙️ Installation and Setup

1. Backend Setup (Node.js)
   
       1. Navigate to the server directory :
              cd server
   
       2. Install dependencies
              npm install
   
       3. Create a .env file and add your database credentials
              PORT = 5000
              Add these lines
                 DB_HOST=<db_servername>
                 DB_USER=<db_username>
                 DB_PASSWORD=<db_password>
                 DB_NAME=<db_name>
                 DB_CONNECTION_LIMIT=10

       4. Start the server
              npm start
   
   The server will typically run on http://localhost:5000

3. Frontend Setup (React)
   
       1. Navigate to the client directory :
              cd client
   
       2. Install dependencies
              npm install
   
       3. Create a .env file to point to your backend API:
             VITE_API_URL=http://localhost:5000/api/questions
   
       4. Start the React application:
             npm start

     The app will open typically at http://localhost:5173

---

## 🗄️ Database Setup and Schema

       1. Create the Database
       
              CREATE DATABASE quizmasterdb;
              USE quizmasterdb;

       2. Create the Subjects Table
              This table stores the categories seen on the dashboard.

              CREATE TABLE `subjects` (
              `id` int NOT NULL AUTO_INCREMENT,
              `name` varchar(45) NOT NULL,
              `iconName` varchar(45) NOT NULL,
              `colorName` varchar(45) DEFAULT NULL,
               PRIMARY KEY (`id`)
               ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

       3. Create the Questions Table
              This table stores the quiz data, linked to a subject.
              CREATE TABLE `questions` (
              `id` int NOT NULL AUTO_INCREMENT,
              `question_text` text NOT NULL,
               `subject` varchar(255) NOT NULL,
               `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
               `marks_allotted` int NOT NULL,
               `chapter_name` varchar(45) NOT NULL,
               PRIMARY KEY (`id`)
               ) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

### **🧪 Sample Data Setup**
       Run these queries to populate your application with test data so you can view them on the Dashboard immediately:

* Insert a Subject

              INSERT INTO `quizmasterdb`.`subjects`
              (
              `name`,
              `iconName`,
              `colorName`)
              VALUES
              (
              'Mathematics',
              'BsCalculator',
              '#a78bfa');


  * Insert a Question
              INSERT INTO `quizmasterdb`.`questions`
              (
              `question_text`,
              `subject`,
              `marks_allotted`,
              `chapter_name`)
              VALUES
              (
              '6/10',
              'Mathematics',
              10,
              'Ratio and Proportion');

               

```

