import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './RegisterPage.css'

const RegisterPage = () => {
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize useNavigate
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Perform validation if needed

      // Send registration data to the server
      const response = await axios.post('http://localhost:3000/account/register/peminjam', {
        nama,
        username,
        password,
        no_hp: noHp,
        alamat,
      });

      console.log('Registration successful:', response.data.message);
      setErrorMessage('');
      // Redirect to the login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || 'Internal Server Error');
      setErrorMessage('Registration failed. Please check your information.');
    }
  };

  const handleNavigateToLogin = () => {
    // Navigate to the LoginPage
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form">
        <label>
          Name:
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" value={noHp} onChange={(e) => setNoHp(e.target.value)} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleRegister} className="register-button">Register</button>
        <p className="error-message">{errorMessage}</p>
      </form>
      <p className="login-text">Already have an account? <span className="login-link" onClick={handleNavigateToLogin}>Log in</span>.</p>
    </div>
  );
};

export default RegisterPage;
