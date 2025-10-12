import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = ({ isAuthenticated, setIsAuthenticated, username, role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">CodeNest</Link>
        <button
          className={`navbar-toggler ${isOpen ? '' : 'collapsed'}`}
          type="button"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end ${isOpen ? 'show' : ''}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/courselist">Course List</Link>
            </li>
            {isAuthenticated && role === 'instructor' && (
              <li className="nav-item">
                <Link className="nav-link" to="/addcourse">Add Course</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/compiler">Compiler</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">About Us</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {username} ({role})</span>
                </li>
                <li className="nav-item">
                  <Logout setIsAuthenticated={setIsAuthenticated} />
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
