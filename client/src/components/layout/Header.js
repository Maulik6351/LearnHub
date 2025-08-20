import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">LearnHub</Link>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/courses" onClick={() => setIsMenuOpen(false)}>Courses</Link></li>
            {user && (
              <>
                <li><Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
                {user.role === 'instructor' && (
                  <li><Link to="/create-course" onClick={() => setIsMenuOpen(false)}>Create Course</Link></li>
                )}
              </>
            )}
          </ul>
        </nav>

        <div className="auth-buttons">
          {user ? (
            <div className="user-menu">
              <button className="user-button" onClick={toggleDropdown}>
                <FaUser />
                <span>{user.name}</span>
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
                    <FaUser /> Profile
                  </Link>
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header; 