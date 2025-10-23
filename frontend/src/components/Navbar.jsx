import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Home,
  Calendar,
  BookOpen,
  Plus,
  BarChart3,
  User,
  LogIn,
  Users,
  Menu,
  X,
  Building2,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "../hook/useAuth";
import { useTheme } from "../hook/useTheme";
import "./Navbar.css";

const Navbar = ({ userType = "student" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, getUserRole, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUserRole, setCurrentUserRole] = useState(null);

  useEffect(() => {
    if (isAuthenticated && isAuthenticated()) {
      const role = getUserRole();
      setCurrentUserRole(role);
    }
  }, [user, isAuthenticated, getUserRole]);

  const effectiveUserType = currentUserRole || userType;

  const commonLinks = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/campusevents", label: "Events", icon: Calendar },
    { to: "/clubpage", label: "Clubs", icon: Building2 },
  ];

  const studentLinks = [
    ...commonLinks,
  ];

  const clubLinks = [
    ...commonLinks,
    { to: "/createevent", label: "Create", icon: Plus },
  ];

  const links = effectiveUserType === "student" ? studentLinks : clubLinks;

  const isActiveLink = (linkTo) => {
    return location.pathname === linkTo;
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleProfileClick = () => {
    if (isAuthenticated && isAuthenticated()) {
      navigate(
        effectiveUserType === "club" ? "/clubprofilecard" : "/profilecard",
        { state: { from: location.pathname } }
      );
    } else {
      navigate("/login");
    }
  };

  const handleMyEventsClick = () => {
    navigate("/myevents");
  };

  const handleDashboardClick = () => {
    navigate("/clubdashboard");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate("/")}>
          <div className="logo-icon">
            <Calendar size={24} />
          </div>
          <span className="logo-text">Campus-Buddy</span>
        </div>

        <div className="mobile-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className="nav-center">
          <ul className="nav-links">
            {links.map((link) => {
              const IconComponent = link.icon;
              return (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className={`nav-link ${isActiveLink(link.to) ? 'active' : ''}`}
                  >
                    <IconComponent size={18} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="nav-right">
          <button className="theme-toggle-btn" onClick={toggleTheme} title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {effectiveUserType === "student" ? (
            <div className="nav-links">
              <button 
                className={`login-btn ${isActiveLink('/myevents') ? 'active' : ''}`} 
                onClick={handleMyEventsClick}
              >
                <BookOpen size={18} />
                <span>My Events</span>
              </button>
            </div>
          ) : (
            <div className="nav-links">
              <button 
                className={`login-btn ${isActiveLink('/clubdashboard') ? 'active' : ''}`} 
                onClick={handleDashboardClick}
              >
                <BarChart3 size={18} />
                <span>Dashboard</span>
              </button>
            </div>
          )}

          <div className="nav-links">
            <button className="profile-btn" onClick={handleProfileClick}>
              <User size={18} />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`nav-link ${isActiveLink(link.to) ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
