import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Courses from "./Courses";
import Quiz from "./Quiz";
import Registration from "./Registration";
import Login from "./Login";
import Enrollment from "./Enrollment";
import Lessons from "./Lessons";
import Progress from "./Progress";

function App() {
  const userId = 1; // Example user ID, replace with actual user ID
  const courseId = 1; // Example course ID, replace with actual course ID

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>LMS Portal</h1>
          <nav>
            <Link to="/courses">Courses</Link>
            <Link to="/quiz">Quiz</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </nav>
        </header>

        {/* Scrolling Text Bar */}
        <div className="scrolling-text-bar">
          <marquee>
            Deadline for Course Enrollment: January 15, 2024 | Quiz Submission
            Due: February 10, 2024 | New Lessons Available Every Monday!
          </marquee>
        </div>

        <Routes>
          <Route path="/courses" element={<Courses />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/lessons"
            element={<Lessons userId={userId} courseId={courseId} />}
          />
          <Route
            path="/progress"
            element={<Progress userId={userId} courseId={courseId} />}
          />
          <Route path="/" element={<h2>Welcome to the LMS Portal</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
