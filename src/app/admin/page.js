"use client"
import React, { useState } from 'react';
import Leftside from './(components)/leftside/page'; 
import Dashboard from './(components)/dashboard/page'; 

const Admin = () => {
  const [selectedPage, setSelectedPage] = useState('dashboard'); 


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
        <Leftside setSelectedPage={setSelectedPage} /> 
        <div style={{ marginLeft: '20px' }}>
          {renderPage()} 
        </div>
      </div>
    </div>
  );
};

export default Admin;
