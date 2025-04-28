// 📌 File: src/components/Homepage.js
import React from "react";
import "./Homepage.css";

const Homepage = () => {

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <h2>Zidio Task Manager</h2>
      </nav>

      <main className="content">
        <h3>Welcome to your Task Manager</h3>
        <p>Manage your tasks efficiently.</p>
        <a href="/tasks"><button className="add-task-btn">+ Add Task</button></a>
      </main>
    </div>
  );
};

export default Homepage;
