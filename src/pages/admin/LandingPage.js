import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './LandingPage.css';

const AdminLanding = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        // Send logout request to the server
        await axios.post('http://localhost:3000/account/logout', null, { withCredentials: true });
        navigate('/');
        onLogout(); // Call the onLogout callback to update isLoggedIn in App.js
        // After successful logout, navigate to the home page
      } catch (error) {
        console.error('Logout failed:', error.response?.data?.message || 'Internal Server Error');
      }
    };
  
    return (
      <div className="dashboard">
        <div className="logoutButtonContainer">
          <button className="logoutButton" onClick={handleLogout}>Logout</button>
        </div>
        <h1 className="dashboardHeader">admin</h1>
        <p className='dashboardTitle'>Halo, Selamat Datang</p>
        <p className='dashboardText1'>Temukan buku yang membuatmu nyaman membaca</p>
        <p className='dashboardText2'>Buku adalah jembatan ilmu untuk menghubungkan pengetahuan dengan kehidupan nyata.</p>
      </div>
    );
};

export default AdminLanding;