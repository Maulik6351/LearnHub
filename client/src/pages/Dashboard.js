import React from 'react';
import { useSelector } from 'react-redux';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Here's your learning dashboard</p>
        </div>
        
        <div className="dashboard-content">
          <div className="dashboard-card">
            <h3>My Courses</h3>
            <p>You haven't enrolled in any courses yet.</p>
            <button className="btn btn-primary">Browse Courses</button>
          </div>
          
          <div className="dashboard-card">
            <h3>Learning Progress</h3>
            <p>Start learning to see your progress here.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <p>No recent activity to show.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 