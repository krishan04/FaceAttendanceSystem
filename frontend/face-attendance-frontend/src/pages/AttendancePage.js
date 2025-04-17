import React, { useEffect, useState } from "react";
import axios from 'axios';
import AttendanceTable from '../components/AttendanceTable';  // <-- import the table!

function AttendancePage() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/attendance');
        setAttendance(response.data.attendance);
      } catch (error) {
        alert('Error fetching attendance');
      }
    }

    fetchAttendance();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
      <AttendanceTable attendanceData={attendance} />  {/* <- pass data here */}
    </div>
  );
}

export default AttendancePage;