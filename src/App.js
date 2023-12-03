import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

// Pages
import Dashboard from "./pages/DashboardPage";
import Book from "./pages/BookPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

import UserBooks from "./pages/user/BooksPage";
import UserLanding from "./pages/user/LandingPage";
import UserPayment from "./pages/user/PaymentPage";
import UserRents from "./pages/user/RentsPage";
import UserReturns from "./pages/user/ReturnsPage";

import AdminBooks from "./pages/admin/BooksPage";
import AdminAddBooks from "./pages/admin/AddBookPage";
import AdminEditBooks from "./pages/admin/EditBookPage";
import AdminLanding from "./pages/admin/LandingPage";
import AdminRenter from "./pages/admin/RenterPage";
import AdminRents from "./pages/admin/RentsPage";
import AdminReturns from "./pages/admin/ReturnsPage";

import "./App.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  // Fetch user data from the /account/user-data endpoint using Axios
  axios.get('http://localhost:3000/account/user-data', { withCredentials: true })
    .then(response => {
      const data = response.data.role;
      console.log('User data:', data);
      setIsAdmin(data === 'admin');
      setIsLoggedIn(true);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with status code:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received. Request made:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }

      setIsLoggedIn(false);
      // Handle error as needed
    });
}, []);

const handleLogin = async () => {
  // Perform your login logic, then update isAdmin based on the user's role
  await axios.get('http://localhost:3000/account/user-data', { withCredentials: true })
    .then(response => {
      const userData = response.data;

      // Update isAdmin based on the user's role
      setIsAdmin(userData.role === 'admin');
      setIsLoggedIn(true);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);

      if (error.response) {
        console.error('Server responded with status code:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received. Request made:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }

      // Handle login failure or error as needed
      setIsAdmin(false); // Set isAdmin to false on error
      setIsLoggedIn(false); // Set isLoggedIn to false on error
    });

    
}

const handleLogout = async () => {
  setIsLoggedIn(false);
};

  return (
    <div className="App">
      <Router>
        <header>
          <h1 id="titleGroup"><span>SewaBuku</span></h1>

          {/* Conditional rendering of header based on user login and role */}
          {isLoggedIn ? (
            <>
              <Link to={isAdmin ? "/admin/landing" : "/user/landing"} className="iconWrapper">Home</Link>
              <Link to={isAdmin ? "/admin/books" : "/user/books"} className="iconWrapper">Books</Link>
              <Link to={isAdmin ? "/admin/rents" : "/user/rents"} className="iconWrapper">Rents</Link>
              {isAdmin && <Link to="/admin/renter" className="iconWrapper">Renter</Link>}
            </>
          ) : (
            <>
              <Link to="/" className="iconWrapper">Home</Link>
              <Link to="/books" className="iconWrapper">Books</Link>
              <Link to="/login" className="iconWrapper">Sign In</Link>
            </>
          )}
        </header>

        <Routes>
          {/* Your existing routes go here */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Book />} />

          <Route path="/user/books" element={<UserBooks />} />
          <Route path="/user/landing" element={<UserLanding onLogout={handleLogout}/>} />
          <Route path="/user/payment" element={<UserPayment />} />
          <Route path="/user/rents" element={<UserRents />} />
          <Route path="/user/returns" element={<UserReturns />} />

          <Route path="/admin/books" element={<AdminBooks />} />
          <Route path="/admin/add-books" element={<AdminAddBooks />} />
          <Route path="/admin/edit-books/:id" element={<AdminEditBooks />} />
          <Route path="/admin/landing" element={<AdminLanding onLogout={handleLogout}/>} />
          <Route path="/admin/renter" element={<AdminRenter />} />
          <Route path="/admin/rents" element={<AdminRents />} />
          <Route path="/admin/returns" element={<AdminReturns />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;