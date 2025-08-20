import React from 'react';
import './CreateCourse.css';

const CreateCourse = () => {
  return (
    <div className="create-course">
      <div className="container">
        <div className="create-course-header">
          <h1>Create New Course</h1>
        </div>
        
        <div className="create-course-content">
          <div className="create-course-card">
            <h3>Course Creation Form</h3>
            <p>This is a placeholder for the course creation form. The actual form will be implemented with proper validation and file upload functionality.</p>
            <button className="btn btn-primary">Create Course</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse; 