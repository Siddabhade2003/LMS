import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Compiler from './components/Compiler';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import { ToastContainer } from 'react-toastify';
import AboutUs from './components/AboutUs';
import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const addCourse = (newCourse) => {
    // Functionality to add a new course
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} username={username} role={role} />
        <ToastContainer />
        
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} setRole={setRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/courselist" element={isAuthenticated ? <CourseList isAuthenticated={isAuthenticated} role={role} /> : <Navigate to="/login" />} />
          <Route path="/addcourse" element={isAuthenticated && role === 'instructor' ? <AddCourse isAuthenticated={isAuthenticated} addCourse={addCourse} /> : <Navigate to="/login" />} />
          <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>  
    </Router>
  );
}

export default App;
