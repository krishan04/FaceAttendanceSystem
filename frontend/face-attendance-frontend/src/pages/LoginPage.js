import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Install axios if not already: npm install axios

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password
      });

      const data = response.data;

      if (data.success) {
        // Save role in localStorage
        localStorage.setItem('role', data.role);  // admin/user
        alert('Login successful!');
        navigate('/');  // Redirect to HomePage
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;