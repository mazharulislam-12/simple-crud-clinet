import React, { useState } from 'react';
import './App.css';

function App() {
  const [error, setError] = useState(null);

  const handleAddUser = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    // Basic form validation
    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }

    const user = { name, email };
    console.log(user);

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      // Clear any previous error
      setError(null);
    } 
   
    catch (error) {
      console.error("Error:", error);
      setError("Failed to add user. Please try again later.");
    }
  };

  return (
    <>
      <h1>Simple CRUD</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="name" placeholder="Name" />
        <br />
        <input type="email" name="email" id="email" placeholder="Email" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default App;
