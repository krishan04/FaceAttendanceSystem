import React, { useState } from 'react';
import axios from 'axios';

const UploadFaceForm = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !username || !password) {
      alert('Please fill all fields and select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post('http://127.0.0.1:5000/register', formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error uploading face image', error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div>
      <h2>Upload Face</h2>
      <form onSubmit={handleUpload}>
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
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadFaceForm;