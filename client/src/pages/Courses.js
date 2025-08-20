import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../features/courses/courseSlice';
import { toast } from 'react-toastify';
import './Courses.css';

const Courses = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    page: 1,
  });

  const dispatch = useDispatch();
  const { courses, isLoading, isError, message } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(getCourses(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category, page: 1 });
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  if (isLoading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="courses-page">
      <div className="courses-header">
        <div className="container">
          <h1>Explore Our Courses</h1>
          <div className="search-filter">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search courses..."
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
            <div className="filter-options">
              <button
                className={`filter-btn ${filters.category === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filters.category === 'html' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('html')}
              >
                HTML
              </button>
              <button
                className={`filter-btn ${filters.category === 'css' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('css')}
              >
                CSS
              </button>
              <button
                className={`filter-btn ${filters.category === 'javascript' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('javascript')}
              >
                JavaScript
              </button>
              <button
                className={`filter-btn ${filters.category === 'react' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('react')}
              >
                React
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="courses-section">
        <div className="container">
          {courses && courses.courses && courses.courses.length > 0 ? (
            <>
              <div className="courses-grid">
                {courses.courses.map((course) => (
                  <div key={course._id} className="course-card">
                    <img src={course.image} alt={course.title} className="course-image" />
                    <div className="course-content">
                      <div className="course-category">{course.category.toUpperCase()}</div>
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-description">{course.description}</p>
                      <div className="course-footer">
                        <span className="course-price">₹{course.price.toLocaleString('en-IN')}</span>
                        <button className="btn btn-primary">View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {courses.totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page === 1}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: courses.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${page === filters.page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page === courses.totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-courses">
              <h3>No courses found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses; 