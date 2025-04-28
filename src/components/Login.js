// 📌 File: src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [user, setUser] = useState({ identifier: "", password: "", rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === "checkbox" ? checked : value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (user.rememberMe) {
      if (
        savedUser &&
        (savedUser.username === user.identifier || savedUser.email === user.identifier) &&
        savedUser.password === user.password
      ) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("rememberedUser", user.identifier);
        alert(`Welcome back, ${savedUser.fullName}!`);
        navigate("/homepage");
      } else {
        alert("Invalid credentials!");
      }
    } else {
      alert("Please check 'Remember Me' to log in.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input type="text" name="identifier" placeholder="Username or Email" onChange={handleChange} />

      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <span className="eye-icon" onClick={togglePasswordVisibility}>
          {showPassword ? "👁️" : "🔒"}
        </span>
      </div>

      <div className="checkbox-container">
        <input type="checkbox" name="rememberMe" onChange={handleChange} /> Remember Me
      </div>

      <button onClick={handleLogin}>Login</button>
      <p><a href="/forgot-password">Forgot Password?</a></p>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
