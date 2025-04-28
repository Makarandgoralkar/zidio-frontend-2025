import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskManagement from "./components/TaskManagement";
import Homepage from "./components/Homepage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="/homepage" element={<Homepage/>} />
        </Routes>
    </Router>
  );
}

export default App;
