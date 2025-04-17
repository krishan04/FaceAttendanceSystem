import React, { useState } from "react";
import axios from 'axios';

function UploadFacePage() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post('http://127.0.0.1:5000/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert(response.data.message);
    } catch (error) {
      alert('Error uploading face');
    }
  };

  return (
    <div>
      <h2>Upload Face for Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadFacePage;