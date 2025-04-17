import React, { useState } from "react";
import axios from 'axios';

function MarkAttendancePage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/mark_attendance', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert(response.data.message);
    } catch (error) {
      alert('Error marking attendance');
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Mark Attendance</button>
      </form>
    </div>
  );
}

export default MarkAttendancePage;