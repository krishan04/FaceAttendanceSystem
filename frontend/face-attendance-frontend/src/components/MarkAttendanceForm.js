import React, { useState } from 'react';
import axios from 'axios';

const MarkAttendanceForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/mark_attendance', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error marking attendance', error);
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <form onSubmit={handleMarkAttendance}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Mark Attendance</button>
      </form>
    </div>
  );
};

export default MarkAttendanceForm;