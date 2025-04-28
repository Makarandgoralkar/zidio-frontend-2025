import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();

  const handleIdentifierCheck = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && (savedUser.username === identifier || savedUser.email === identifier)) {
      setUserExists(true);
    } else {
      alert("User not found!");
    }
  };

  const handlePasswordReset = () => {
    let savedUser = JSON.parse(localStorage.getItem("user"));
    savedUser.password = newPassword;
    localStorage.setItem("user", JSON.stringify(savedUser));
    alert("Password reset successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      {!userExists ? (
        <>
          <input
            type="text"
            placeholder="Enter your Username or Email"
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <button onClick={handleIdentifierCheck}>Verify</button>
        </>
      ) : (
        <>
          <input
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handlePasswordReset}>Reset Password</button>
        </>
      )}
      <p><a href="/login">Back to Login</a></p>
    </div>
  );
};

export default ForgotPassword;
