import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './LandingPage.css';
import dashboardImage from '../../assets/BooksPile.png';

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
        <div>
            <div className="logoutButtonContainer">
                <button className="logoutButton" onClick={handleLogout}>Logout</button>
            </div>
            <div className='columnDashboard'>
                <div className="dashboard">
                    <h1 className="dashboard-header">SewaBuku</h1>
                    <p className="dashboard-title">Halo, Selamat Datang</p>
                    <p className="dashboard-text1">Temukan buku yang membuatmu nyaman membaca</p>
                    <p className="dashboard-text2">Buku adalah jembatan ilmu untuk menghubungkan pengetahuan dengan kehidupan nyata.</p>
                </div>
                <div className='dashboardImageContainer'>
                    <img src={dashboardImage} alt="" className="dashboardImage" />
                </div>
            </div>
        </div>
    );
};

export default AdminLanding;