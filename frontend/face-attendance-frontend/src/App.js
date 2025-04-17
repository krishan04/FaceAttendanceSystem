import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadFaceForm from './components/UploadFaceForm';
import MarkAttendanceForm from './components/MarkAttendanceForm';
import AttendancePage from './pages/AttendancePage';
import RegisterAdminPage from './pages/AdminRegistrationPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage'; // <-- add this import

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page */}
        <Route path="/login" element={<LoginPage />} /> {/* Login page */}
        <Route path="/upload-face" element={<UploadFaceForm />} />
        <Route path="/mark-attendance" element={<MarkAttendanceForm />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/register_admin" element={<RegisterAdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;