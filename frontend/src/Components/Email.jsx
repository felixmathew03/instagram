import React, { useState } from 'react';
import '../css/Email.css';

function Email() {
  const [email, setEmail] = useState(''); 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault(); 

    
        const res=await fetch("http://localhost:3000/api/verifyemail",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(email)
        })
        console.log(res);
     
    
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
