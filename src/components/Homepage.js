// 📌 File: src/components/Homepage.js
import React from "react";
import { Link } from "react-router-dom"; 
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <nav className="navbar">
        <h2 className="logo">Zidio Task Manager</h2>
        <div className="nav-links">
          <Link to="/tasks" className="nav-link">Add Task</Link>
          <Link to="/completed" className="nav-link">Completed</Link>
          <Link to="/settings" className="nav-link">Settings</Link>
        </div>
      </nav>

      <main className="content">
        <h3>Welcome to your Task Manager</h3>
        <p>Manage your tasks efficiently.</p>
        <button>Add Task +</button>
      </main>
    </div>
  );
};

export default Homepage;
