// pages/admin/index.js
"use client"
import React, { useState } from 'react';
import Leftside from './(components)/leftside/page'; // Adjust path as per your actual file structure
import Dashboard from './(components)/dashboard/page'; // Adjust path as per your actual file structure

const Admin = () => {
  const [selectedPage, setSelectedPage] = useState('dashboard'); // State to track selected page

  // Function to render the selected page based on state
  const renderPage = () => {
    switch (selectedPage) {
      case 'dashboard':
        return <Dashboard />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div style={{ display: 'flex' }}>
        <Leftside setSelectedPage={setSelectedPage} /> {/* Pass setSelectedPage to Leftside */}
        <div style={{ marginLeft: '20px' }}>
          {renderPage()} {/* Render the selected page component */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
