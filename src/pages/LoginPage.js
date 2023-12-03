import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize useNavigate
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:3000/account/login', {
            username,
            password,
          }, { withCredentials: true });

      // Assuming the server sends a 'role' in the response
      const role = response.data.role;

      // Handle the user role accordingly
      if (role === 'user' || role === 'admin') {
        console.log(`User logged in as ${role}`);
        setErrorMessage('');
        // Callback to update isLoggedIn state in the App component
        onLogin();
        // Redirect to the appropriate page
        navigate(`/${role}/landing`);
      }

    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || 'Internal Server Error');
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  const handleNavigateToRegister = () => {
    // Navigate to the RegisterPage
    navigate('/register');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form>
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
        <button type="button" onClick={handleLogin}>Login</button>
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </form>
      <p>Don't have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleNavigateToRegister}>Sign up</span>.</p>
    </div>
  );
};

export default LoginPage;
