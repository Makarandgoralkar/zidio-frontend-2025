import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "user",
    profilePicture: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async () => {
    if (
      !user.fullName ||
      !user.username ||
      !user.email ||
      !user.password ||
      !user.confirmPassword ||
      !user.phone
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {user.profilePicture && <img src={user.profilePicture} alt="Avatar" className="avatar-preview" />}
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Register;
