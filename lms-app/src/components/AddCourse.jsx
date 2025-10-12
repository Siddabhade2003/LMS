import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './AddCourse.css';

const AddCourse = ({ addCourse, isAuthenticated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8080/api/course', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      addCourse(response.data);
      setTitle('');
      setDescription('');
      setImage(null);
      setImageName('');

      toast.success('Course added successfully.');

      handleImageUpload();

    } catch (error) {
      console.error('Error adding course:', error);
      toast.error('Failed to add course. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  const handleImageUpload = async () => {
    const imageFormData = new FormData();
    imageFormData.append('image', image);
    try {
      await axios.post('http://localhost:8080/api/course/upload-image', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div id="add-course" className="container mt-5">
      <h2 className="text-center mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit} className={`add-course-form ${isSubmitting ? 'submitting' : ''}`}>
        <div className="form-group">
          <input
            type="text"
            className="form-control input-field animated-input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control input-field animated-input"
            rows="4"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fileInput" className={`custom-file-upload ${isSubmitting ? 'disabled' : ''}`}>
            <span className="upload-label">{imageName || 'Choose Image'}</span>
            <input
              id="fileInput"
              type="file"
              className="form-control-file d-none"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isSubmitting}
              required
            />
          </label>
        </div>
        <button type="submit" className={`btn btn-primary btn-block submit-button ${isSubmitting ? 'loading' : ''}`}>
          {isSubmitting ? 'Adding Course...' : 'Add Course'}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
