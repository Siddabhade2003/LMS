import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = ({ setIsAuthenticated, setUsername, setRole }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [helpVisible, setHelpVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const responseData = await response.text();
          if (responseData === 'Login successful') {
            setFormData({
              email: '',
              password: ''
            });
            setErrors({});
            setIsAuthenticated(true);
            fetchUserData(formData.email);
            toast.success('Login successful!');
            navigate("/");
          } else {
            toast.error('Failed to login. Please check your credentials and try again.');
          }
        } else {
          toast.error('Failed to login. Please check your credentials and try again.');
        }
      } catch (error) {
        console.error('Error submitting login:', error);
        toast.error('An error occurred. Please try again later.');
      }
    } else {
      toast.error('Please fill out all required fields correctly.');
    }
  };

  const fetchUserData = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user-details?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUsername(userData.username);
        setRole(userData.role);
      } else {
        console.error('Error fetching user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const toggleHelp = () => {
    setHelpVisible(!helpVisible);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body" style={{ padding: '2rem' }}>
              <h2 className="card-title text-center">Login Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="text-center mb-3">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
              <p className="text-center mb-1">
                {/* <Link to="/forgot-password">Forgot Password?</Link> */}
              </p>
              <p className="text-center mb-0">Don't have an account? <Link to="/register">Register</Link></p>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-link" onClick={toggleHelp} style={{ textDecoration: 'none' }}>
                How can I help you?
              </button>
              {helpVisible && (
                <div className="alert alert-info mt-3">
                  <p>If you need assistance, you can:</p>
                  <ul className="mb-0">
                    <li>Contact our <Link to="/support">support team</Link>.</li>
                    <li>Review the <Link to="/faq">FAQ section</Link>.</li>
                    <li>Reset your password if you've forgotten it.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
