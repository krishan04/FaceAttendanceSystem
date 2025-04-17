import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('role');

  if (!allowedRoles.includes(userRole)) {
    // If not allowed, redirect to home or login page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;