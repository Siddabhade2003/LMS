import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here, e.g., clearing authentication tokens
    setIsAuthenticated(false);
    // Redirect to login page after logout
    navigate('/login');
    toast.warning("Logged out successfully!");
  };

  return (
    <button className="btn btn-link nav-link" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
