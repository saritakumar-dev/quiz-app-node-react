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

