import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Placeholder alert for now. You can handle submission here in future.
    alert(`This does nothing yet but recorded info is: \n\nName: ${name}\nEmail: ${email}`);
  };

  return (
    <div className="container">
      <h1>The first travel app for every niche</h1>
      <p>Be the first to know when our app goes live!</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      <footer>
        <p>We'll never share your email with anyone else.</p>
      </footer>
    </div>
  );
}

export default App;