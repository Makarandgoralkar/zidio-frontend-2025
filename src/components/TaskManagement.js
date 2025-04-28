import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TaskManagement.css";

const TaskManagement = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Clear login status
    navigate("/login"); // Redirect to login page
  };

  // Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskList");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    notes: "",
    priority: "Medium",
    status: "Pending",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleCreateOrUpdateTask = () => {
    if (!task.title.trim()) return;

    if (isEditing) {
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex] = task;
      setTasks(updatedTasks);
      setIsEditing(false);
    } else {
      setTasks([...tasks, task]);
    }

    setTask({
      title: "",
      description: "",
      dueDate: "",
      notes: "",
      priority: "Medium",
      status: "Pending",
    });
  };

  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleMarkComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = "Completed";
    setTasks(updatedTasks);
  };

  const handleUndoCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = "Pending";
    setTasks(updatedTasks);
  };

  const handleMarkHighPriority = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].priority = "High";
    setTasks(updatedTasks);
  };

  return (
    <div className="task-management">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <h1>Task Management System</h1>

      <div className="task-input">
        <input type="text" name="title" placeholder="Task Title" value={task.title} onChange={handleInputChange} />
        <textarea name="description" placeholder="Task Description" value={task.description} onChange={handleInputChange} />
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleInputChange} />
        <textarea name="notes" placeholder="Add notes" value={task.notes} onChange={handleInputChange} />
        <select name="priority" value={task.priority} onChange={handleInputChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={handleCreateOrUpdateTask}>{isEditing ? "Update Task" : "Create Task"}</button>
        <button onClick={() => setTask({ title: "", description: "", dueDate: "", notes: "", priority: "Medium", status: "Pending" })}>Reset Form</button>
      </div>

      <h2>Task List</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Notes</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className={task.status === "Completed" ? "completed-task" : ""}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.notes}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleMarkComplete(index)}>Mark Complete</button>
                <button onClick={() => handleUndoCompletion(index)}>Undo Complete</button>
                <button onClick={() => handleEditTask(index)}>Edit</button>
                <button onClick={() => handleMarkHighPriority(index)}>Mark High Priority</button>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManagement;
