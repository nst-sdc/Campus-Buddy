import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import {
    FaGithub,
    FaYoutube,
    FaInstagram,
    FaLinkedinIn,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt
} from 'react-icons/fa';
import { useAuth } from '../hook/useAuth';

const Footer = () => {
    const { getUserRole, isAuthenticated } = useAuth();
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (isAuthenticated && isAuthenticated()) {
            setRole(getUserRole());
        } else {
            setRole(null);
        }
    }, [getUserRole, isAuthenticated]);

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section brand">
                    <h2 className="gradient-heading">Campus-Buddy</h2>
                    <p>Connecting students with campus events and creating memorable experiences.</p>
                    <div className="social-icons">
                        <a href="https://github.com/nst-sdc/campus-buddy" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href="https://www.youtube.com/@NewtonSchoolOfTechnology-ADYPU" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                        <a href="https://www.instagram.com/newtonschooloftechnology_adypu/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/school/newton-school-of-technology/posts/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                    </div>
                </div>

                <div className="footer-section links" style={{ marginLeft: '100px' }}>
                    <h3>Quick Links</h3>
                    <ul className="no-bullets">
                        <li><Link to="/home">Home</Link></li>
                        <li><a href="/home#howItWorksSection">About Us</a></li>
                        <li><Link to="/campusevents">Events</Link></li>
                        <li><Link to="/clubpage">Clubs</Link></li>
                    </ul>
                </div>

                {role === 'student' && (
                    <div className="footer-section links">
                        <h3>Student Resources</h3>
                        <ul className="no-bullets">
                            <li><Link to="/MyEvents">My Events</Link></li>
                            <li><Link to="/ProfileCard">My Profile</Link></li>
                            <li><a href="https://github.com/nst-sdc/campus-buddy" target="_blank" rel="noopener noreferrer">Contribute</a></li>
                        </ul>
                    </div>
                )}

                {role === 'club' && (
                    <div className="footer-section links">
                        <h3>Club Resources</h3>
                        <ul className="no-bullets">
                            <li><Link to="/clubdashboard">Club Dashboard</Link></li>
                            <li><Link to="/createevent">Create Event</Link></li>
                            <li><Link to="/ClubProfileCard">Manage Club Profile</Link></li>
                        </ul>
                    </div>
                )}

                {/* Fallback: show both if not authenticated */}
                {!role && (
                    <>
                        <div className="footer-section links">
                            <h3>Student Resources</h3>
                            <ul className="no-bullets">
                                <li><Link to="/MyEvents">My Events</Link></li>
                                <li><Link to="/ProfileCard">My Profile</Link></li>
                                <li><a href="https://github.com/nst-sdc/campus-buddy" target="_blank" rel="noopener noreferrer">Contribute</a></li>
                            </ul>
                        </div>
                        <div className="footer-section links">
                            <h3>Club Resources</h3>
                            <ul className="no-bullets">
                                <li><Link to="/clubdashboard">Club Dashboard</Link></li>
                                <li><Link to="/createevent">Create Event</Link></li>
                                <li><Link to="/ClubProfileCard">Manage Club Profile</Link></li>
                            </ul>
                        </div>
                    </>
                )}

                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p><FaEnvelope /> <span style={{whiteSpace: 'nowrap'}}> support@nstsdc.org</span></p>
                    {/* <p><FaPhoneAlt /> 123 456 7890</p> */}
                    <p><FaMapMarkerAlt /> Lohegaon, Pune</p>
                </div>
            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
                <p>© 2025 Campus-Buddy. All rights reserved. Made with <span className="heart">❤</span> for students.</p>
            </div>
        </footer>
    );
};

export default Footer;
