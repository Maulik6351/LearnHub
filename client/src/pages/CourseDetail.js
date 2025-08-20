import React from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();

  return (
    <div className="course-detail">
      <div className="container">
        <div className="course-detail-header">
          <h1>Course Details</h1>
          <p>Course ID: {id}</p>
        </div>
        
        <div className="course-detail-content">
          <div className="course-detail-card">
            <h3>Course Information</h3>
            <p>This is a placeholder for the course detail page. The actual course information will be loaded from the API.</p>
            <button className="btn btn-primary">Enroll Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 