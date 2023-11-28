import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

// Pages
import Dashboard from "./pages/DashboardPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

import UserBooks from "./pages/user/BooksPage";
import UserLanding from "./pages/user/LandingPage";
import UserPayment from "./pages/user/PaymentPage";
import UserRents from "./pages/user/RentsPage";
import UserReturns from "./pages/user/ReturnPage";

import AdminBooks from "./pages/admin/BooksPage";
import AdminAddBooks from "./pages/admin/AddBooksPage";
import AdminEditBooks from "./pages/admin/EditBooksPage";
import AdminLanding from "./pages/admin/LandingPage";
import AdminPayment from "./pages/admin/PaymentPage";
import AdminRents from "./pages/admin/RentsPage";
import AdminReturns from "./pages/admin/ReturnPage";

import { FaGithub} from "react-icons/fa";
import { MdPhoto, MdPerson } from "react-icons/md";
import { RiRocketFill } from "react-icons/ri";

import "./App.css";

function App() {
  return (
    // <div className="App">
    //   <Router>
    //     <header>
    //       <Link id="titleGroup" to="/photo"><span>SEWABUKU</span></Link>
    //       <Link to="/photo" className="iconWrapper" ><MdPhoto className="icon" />Photo</Link>
    //       <Link to="/rover" className="iconWrapper" ><RiRocketFill className="icon" />Rover</Link>
    //       <Link to="/profile" className="iconWrapper" ><MdPerson className="icon" />About</Link>
    //     </header>
    //     <Routes>
    //       <Route path="/" element={<Navigate to="/photo" replace />} />
    //       <Route path="/photo" element={<Photo/>} />
    //       <Route path="/rover" element={<Rover/>} />
    //       <Route path="/profile" element={<Profile />} />
    //       <Route path="/photo/detail/:id" element={<PhotoDetailPage/>} />
    //       <Route path="/rover/detail/:id" element={<RoverDetailPage/>} />
    //     </Routes>
    //     <footer>
    //       <div className="footer-left">
    //         <p>Journey to Mars: NASA Rover Photos</p>
    //       </div>
    //       <div className="footer-right">
    //         <a href="https://github.com/mbprayoga/nasa-rover-photos.git" target="_blank" rel="noopener noreferrer">
    //           <FaGithub size={24} color="white" />
    //         </a>
    //         <p>mbprayoga - 2023</p>
    //       </div>
    //     </footer>
    //   </Router>
    // </div>
  );
}

export default App;
