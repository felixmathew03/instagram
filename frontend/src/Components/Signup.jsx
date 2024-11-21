import React, { useState } from 'react';
import '../css/Signup.css'; // Import the CSS for styling

function Signup() {
    const [user,setUser]=useState({})
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("User signed up:", { name, email, username, password });
    // Handle signup functionality here (e.g., API call to create the user)
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-logo">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" 
            alt="Instagram Logo" 
            className="logo"
          />
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
         
         
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>Have an account? <a href="#">Log in</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
