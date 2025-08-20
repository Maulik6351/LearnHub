import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaCertificate, FaClock } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Learn Without Limits</h1>
            <p>Start, switch, or advance your career with thousands of courses from expert instructors.</p>
            <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose LearnHub?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaLaptopCode className="feature-icon" />
              <h3>Expert Instructors</h3>
              <p>Learn from industry experts who are passionate about teaching.</p>
            </div>
            <div className="feature-card">
              <FaCertificate className="feature-icon" />
              <h3>Certification</h3>
              <p>Get certified and showcase your skills to potential employers.</p>
            </div>
            <div className="feature-card">
              <FaClock className="feature-icon" />
              <h3>Lifetime Access</h3>
              <p>Access your courses anytime, anywhere, forever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Students Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The courses on LearnHub helped me land my dream job in web development!"</p>
              </div>
              <div className="testimonial-author">
                <img src="/images/Avatars/avatar1.png" alt="Student Avatar" />
                <div className="author-info">
                  <h4>Dhruv Patel</h4>
                  <p>Web Developer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The quality of instruction and course materials is truly outstanding and comprehensive."</p>
              </div>
              <div className="testimonial-author">
                <img src="/images/Avatars/avatar2.png" alt="Student Avatar" />
                <div className="author-info">
                  <h4>Nirali Patel</h4>
                  <p>Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 