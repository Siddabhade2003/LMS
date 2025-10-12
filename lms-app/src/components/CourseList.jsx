import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './CourseList.css'; // Ensure this import includes the above CSS

const CourseList = ({ isAuthenticated, role }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchCourses();
    }
  }, [isAuthenticated]);

  const fetchCourses = () => {
    axios.get('http://localhost:8080/api/course')
      .then(response => {
        setCourses(response.data);
        setFilteredCourses(response.data); // Initialize filteredCourses
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(query)
    );
    setFilteredCourses(filtered);
  };

  const handleDelete = (id, index) => {
    axios.delete(`http://localhost:8080/api/course/${id}`)
      .then(() => {
        const updatedCourses = [...courses];
        updatedCourses.splice(index, 1);
        setCourses(updatedCourses);
        setFilteredCourses(updatedCourses); // Update filtered list
        toast.success('Course deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting course:', error);
        toast.error('Failed to delete course. Please try again later.');
      });
  };

  const handleUpdate = (id, index) => {
    setEditIndex(index);
    setUpdatedTitle(courses[index].title);
    setUpdatedDescription(courses[index].description);
    setUpdatedImage(courses[index].image);
  };

  const handleSave = (id, index) => {
    const formData = new FormData();
    formData.append('title', updatedTitle);
    formData.append('description', updatedDescription);
    formData.append('image', updatedImage);

    axios.put(`http://localhost:8080/api/course/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        const updatedCourses = [...courses];
        updatedCourses[index] = response.data;
        setCourses(updatedCourses);
        setFilteredCourses(updatedCourses); // Update filtered list
        setEditIndex(null);
        setUploadStatus('Image updated successfully');
        toast.success('Course updated successfully!');
      })
      .catch(error => {
        console.error('Error updating course:', error);
        setUploadStatus('Failed to update image');
        toast.error('Failed to update course. Please try again later.');
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUpdatedImage(file);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <h2 className="my-4 text-center">Course List</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search courses by title..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredCourses.map((course, index) => (
          <div key={index} className="col-lg-4 mb-4">
            <div className="card course-card">
              <img
                src={`http://localhost:8080/api/course/${course.id}/image`}
                alt="Course"
                className="card-img-top"
              />
              <div className="card-body">
                {editIndex === index ? (
                  <div className="edit-section">
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                    <input
                      type="file"
                      className="form-control-file mb-2"
                      onChange={handleImageChange}
                    />
                    {updatedImage && (
                      <img src={URL.createObjectURL(updatedImage)} alt="Course" className="img-fluid mb-2" />
                    )}
                    {uploadStatus && <p>{uploadStatus}</p>}
                    <div className="btn-group">
                      <button type="button" className="btn btn-success" onClick={() => handleSave(course.id, index)}>Save</button>
                      <button type="button" className="btn btn-secondary" onClick={() => setEditIndex(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.description}</p>
                    {role === 'instructor' && (
                      <div className="d-flex justify-content-between align-items-center">
                        <button type="button" className="btn btn-primary" onClick={() => handleUpdate(course.id, index)}><FontAwesomeIcon icon={faEdit} /></button>
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(course.id, index)}><FontAwesomeIcon icon={faTrash} /></button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {!isAuthenticated && <p className="mt-4 text-center">Please log in to view the course list.</p>}
    </div>
  );
};

export default CourseList;
