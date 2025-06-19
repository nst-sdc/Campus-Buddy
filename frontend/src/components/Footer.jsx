import React from 'react';
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
        <footer className="w-full">
            <div className="w-full bg-blue-400 text-white px-6 py-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/20 pb-10">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">Campus-Buddy</h2>
                        <p className="text-sm mt-4 max-w-md">
                            Your ultimate companion for campus life. Discover events, connect with clubs, and make the most of your college experience with our innovative platform.
                        </p>
                        <div className="flex gap-4 mt-4 text-lg">
                            <a href="#" style={{ color: 'white' }}>
                                <FaFacebookF className="cursor-pointer" />
                            </a>
                            <a href="#" style={{ color: 'white' }}>
                                <FaTwitter className="cursor-pointer" />
                            </a>
                            <a href="#" style={{ color: 'white' }}>
                                <FaInstagram className="cursor-pointer" />
                            </a>
                            <a href="#" style={{ color: 'white' }}>
                                <FaLinkedinIn className="cursor-pointer" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" style={{ color: 'white' }}>Home</a></li>
                            <li><a href="#" style={{ color: 'white' }}>Browse Events</a></li>
                            <li><a href="#" style={{ color: 'white' }}>Join Clubs</a></li>
                            <li><a href="#" style={{ color: 'white' }}>Create Event</a></li>
                            <li><a href="#" style={{ color: 'white' }}>About Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" style={{ color: 'white' }}>Help Center</a></li>
                            <li><a href="#" style={{ color: 'white' }} >Terms of Service</a></li>
                            <li><a href="#" style={{ color: 'white' }} >Privacy Policy</a></li>
                            <li><a href="#" style={{ color: 'white' }} >Community Guidelines</a></li>
                            <li><a href="#" style={{ color: 'white' }} >Contact Support</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="max-w-7xl mx-auto mt-6 flex flex-col items-center gap-2 text-sm">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90 mb-2">
                        <p className="flex items-center gap-2"><FaEnvelope /> hello@campusbuddy.edu</p>
                        <p className="flex items-center gap-2"><FaPhoneAlt /> 1234567890</p>
                        <p className="flex items-center gap-2"><FaMapMarkerAlt /> Lohegaon, Pune</p>
                    </div>
                    <p>© 2025 Campus-Buddy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
