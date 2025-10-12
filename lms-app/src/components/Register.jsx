import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'; 

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState({});
  const [showVerification, setShowVerification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8080/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          toast.success('Registration successful! Please check your email for verification code.');
          setShowVerification(true);
        } else {
          toast.error('Failed to register. Please try again later.');
        }
      } catch (error) {
        console.error('Error submitting registration:', error);
        toast.error('An error occurred. Please try again later.');
      }
    } else {
      toast.error('Please fill out all required fields correctly.');
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email } = formData;

      const response = await fetch(`http://localhost:8080/api/verify?email=${email}&otp=${verificationCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        navigate('/login');
      } else {
        toast.error('Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting verification:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate username
    if (!formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      valid = false;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    // Validate role
    if (!formData.role) {
      newErrors.role = 'Role is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card form-card animated fadeInDown">
            <div className="card-body">
              <h2 className="card-title text-center">Registration Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
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
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
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
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role:</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                  </select>
                  {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Register</button>
                </div>
              </form>
              {showVerification && (
                <>
                  <hr />
                  <h2 className="card-title text-center">Enter Verification Code</h2>
                  <form onSubmit={handleVerificationSubmit}>
                    <div className="form-group">
                      <label htmlFor="verificationCode">Verification Code:</label>
                      <input
                        type="text"
                        id="verificationCode"
                        name="verificationCode"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className={`form-control ${errors.verificationCode ? 'is-invalid' : ''}`}
                        required
                      />
                      {errors.verificationCode && <div className="invalid-feedback">{errors.verificationCode}</div>}
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">Verify</button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
