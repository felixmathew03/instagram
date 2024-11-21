import React, { useState } from 'react';
import '../css/Email.css';

function Email() {
  const [email, setEmail] = useState(''); 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault(); // Prevent page refresh on submit

    // Simple email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
    } else {
        const res=await fetch("http://localhost:3000/api/verifyemail",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(email)
        })
        console.log(res);
      setEmail(''); // Clear input field after submission
    }
  };

  return (
    <div className="email">
      <h1>Enter Your Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Email;
