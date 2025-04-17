import React, { useState } from 'react';
import axios from 'axios';

const AdminRegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/register_admin', { username, password });
      alert(response.data.message);
    } catch (error) {
      console.error('Error registering admin', error);
      alert('Error registering admin');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Register Admin</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegistrationPage;