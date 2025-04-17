import React from 'react';

const AttendanceTable = ({ attendanceData }) => {
  return (
    <div className="p-4">
      <h2>Attendance Records</h2>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Username</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) => (
            <tr key={index}>
              <td>{record.username}</td>
              <td>{new Date(record.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;