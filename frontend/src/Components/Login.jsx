import React, { useState } from 'react';
import '../css/Login.css'; // Import the CSS file for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted", { email, password });
    // Handle login functionality here (e.g., API call)
  };
  
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" 
            alt="Instagram Logo" 
            className="logo"
          />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Phone number, username, or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="login-btn">Log In</button>
        </form>
        <div className="login-footer">
          <p>Forgotten your password?</p>
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
