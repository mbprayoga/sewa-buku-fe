import React from 'react';

import './DashboardPage.css';
import dashboardImage from '../assets/BooksPile.png';

const Dashboard = () => {
    return (
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
    );
};

export default Dashboard;