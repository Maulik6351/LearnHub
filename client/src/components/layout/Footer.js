import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>LearnHub</h3>
            <p>Empowering learners worldwide with quality education.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="#"><FaFacebook /></a>
              {/* <a href="#"><FaTwitter /></a> */}
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 LearnHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 