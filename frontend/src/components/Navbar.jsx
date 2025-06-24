import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaBook, FaPlus, FaTachometerAlt, FaUser, FaSignInAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ userType }) => {
  const studentLinks = [
    { to: '/home', label: 'Home', icon: <FaCalendarAlt /> },
    { to: '/events', label: 'Events', icon: <FaCalendarAlt /> },
    { to: '/myevents', label: 'My Events', icon: <FaBook /> },
  ];

  const clubLinks = [
    { to: '/home', label: 'Home', icon: <FaCalendarAlt /> },
    { to: '/events', label: 'Events', icon: <FaCalendarAlt /> },
    { to: '/create', label: 'Create', icon: <FaPlus /> },
    { to: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  ];

  const links = userType === 'student' ? studentLinks : clubLinks;

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/home">
          <FaUser /> Campus-Buddy
        </Link>
      </div>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>
              {link.icon} {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>

        <li>
          <button className="theme-toggle">🌓</button>
        </li>
        <li>
          <Link to="/profilecard">
            <FaUser />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
