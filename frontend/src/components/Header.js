import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo from '../assets/logo.jpg';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="Logo" className="header-logo" />
      </Link>
      <button className="mobile-menu-button" onClick={toggleMobileMenu}>
        <FaBars />
      </button>
      <div className={`header-links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <Link to="/dashboard" className="header-link">Home</Link>
        <Link to="/employee-list" className="header-link">Employee List</Link>
        <div className="header-profile-logout">
          <span className="header-profile">Hukum Gupta</span>
          <Link to="/login" className="header-link">Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
