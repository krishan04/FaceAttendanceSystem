import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const role = localStorage.getItem('role'); // get role from localStorage

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        {/* Visible to Admins only */}
        {role === 'admin' && (
          <>
            <li><Link to="/register">Upload Face</Link></li>
            <li><Link to="/attendance">Attendance</Link></li>
            <li><Link to="/register_admin">Register Admin</Link></li>
          </>
        )}

        {/* Visible to both Admins and Users */}
        {(role === 'admin' || role === 'user') && (
          <li><Link to="/mark-attendance">Mark Attendance</Link></li>
        )}

      </ul>
    </nav>
  );
};

export default Navbar;