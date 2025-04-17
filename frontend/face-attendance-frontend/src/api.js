import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000'
});

export const registerUser = (data) => API.post('/register', data);
export const markAttendance = (data) => API.post('/mark_attendance', data);
export const getAttendance = () => API.get('/attendance');