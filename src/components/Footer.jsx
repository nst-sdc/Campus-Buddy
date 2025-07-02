import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section brand">
                    <h2 className="gradient-heading">Campus-Buddy</h2>
                    <p>Connecting students with campus events and creating memorable experiences.</p>
                    <div className="social-icons">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedinIn /></a>
                    </div>
                </div>

                <div className="footer-section links" style={{ marginLeft: '100px' }}>
                    <h3>Quick Links</h3>
                    <ul className="no-bullets">
                        <li><a href="#">Home</a></li>
                        <li><Link to='/clubpage'>Clubs</Link></li>
                        <li><Link to="/MyEvents">My Events</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><a href="/ProfileCard">Student Profile</a></li>
                    </ul>
                </div>

                <div className="footer-section links">
                    <h3>For Clubs</h3>
                    <ul className="no-bullets">
                        <li><Link to="/createevent">Create Event</Link></li>
                        <li><a href="#">Club Dashboard</a></li>
                        <li><a href="/ClubProfileCard">Club Profiles</a></li>
                        
                        
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p><FaEnvelope /> support@campus-buddy.com</p>
                    <p><FaPhoneAlt /> 123 456 7890</p>
                    <p><FaMapMarkerAlt />   Lohegaon, Pune</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 Campus-Buddy. All rights reserved. Made with <span className="heart">❤</span> for students.</p>
            </div>
        </footer>
    );
};

export default Footer;
