import React from 'react';
import Header from '../components/Header';  
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="dashboard-content">
        <h2 className='h1'>Welcome to Dashboard</h2>
      </div>
    </div>
  );
};

export default Dashboard;
