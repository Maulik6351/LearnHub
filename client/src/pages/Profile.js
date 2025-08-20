import React from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>
        
        <div className="profile-content">
          <div className="profile-card">
            <h3>Profile Information</h3>
            <div className="profile-info">
              <div className="info-item">
                <label>Name:</label>
                <span>{user?.name}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{user?.email}</span>
              </div>
              <div className="info-item">
                <label>Role:</label>
                <span>{user?.role}</span>
              </div>
            </div>
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 