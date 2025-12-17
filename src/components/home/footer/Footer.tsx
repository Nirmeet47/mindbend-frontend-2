import React from 'react';
import './Footer.css';
import { FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="footer-section">
            <div className="footer-container">

                {/* COLUMN 1: BRAND */}
                <div className="footer-brand">
                    <div className="footer-logo" data-text="MINDBEND">MINDBEND</div>
                    <p className="footer-tagline">
                        The ultimate convergence of technology, innovation, and creativity.
                        Defining the future, one byte at a time.
                    </p>
                    <div className="footer-copyright">
                        &copy; 2025 MindBend. All Systems Nominal.
                    </div>
                </div>

                {/* COLUMN 2: EVENTS */}
                <div className="footer-column">
                    <h3>Events</h3>
                    <ul className="footer-links">
                        <li className="footer-link"><a href="#workshops">Workshops</a></li>
                        <li className="footer-link"><a href="#hackathon">Hackathon</a></li>
                        <li className="footer-link"><a href="#robotics">Robotics</a></li>
                        <li className="footer-link"><a href="#gaming">Gaming Arena</a></li>
                        <li className="footer-link"><a href="#lectures">Guest Lectures</a></li>
                    </ul>
                </div>

                {/* COLUMN 3: QUICK LINKS */}
                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li className="footer-link"><a href="#about">About Us</a></li>
                        <li className="footer-link"><a href="#sponsors">Sponsors</a></li>
                        <li className="footer-link"><a href="#team">Our Team</a></li>
                        <li className="footer-link"><a href="#gallery">Gallery</a></li>
                        <li className="footer-link"><a href="#contact">Contact Support</a></li>
                    </ul>
                </div>

                {/* COLUMN 4: LOCATION & MAP */}
                <div className="footer-column footer-map-column">
                    <h3>Location</h3>
                    <div className="footer-map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.669830507304!2d72.78369327596048!3d21.165529882959885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec876e9f2f%3A0x63390c505432655e!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1709462823871!5m2!1sen!2sin"
                            className="footer-map-frame"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="SVNIT Map"
                        ></iframe>
                    </div>

                    <div className="contact-info-compact">
                        <div className="contact-item">
                            <FaMapMarkerAlt className="contact-icon" />
                            <span>SVNIT Surat, Gujarat</span>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href="#" className="social-hex" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" className="social-hex" aria-label="LinkedIn"><FaLinkedinIn /></a>
                        <a href="#" className="social-hex" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" className="social-hex" aria-label="YouTube"><FaYoutube /></a>
                    </div>
                </div>

            </div>

            {/* SYSTEM TICKER */}
            <div className="system-ticker">
                <div className="ticker-content">
                    <span className="ticker-item">SYSTEM STATUS: <span className="ticker-green">ONLINE</span></span>
                    <span className="ticker-item"><span className="ticker-dim">///</span> NEXT EVENT: MARCH 15-17</span>
                    <span className="ticker-item">REGISTRATION: <span className="ticker-green">OPEN</span></span>
                    <span className="ticker-item"><span className="ticker-dim">///</span> DETECTED LOCATION: SVNIT_CAMPUS</span>
                    <span className="ticker-item">PROTOCOL: MB_2025_V2.0</span>
                    <span className="ticker-item"><span className="ticker-dim">///</span> ESTABLISHED CONNECTION</span>
                    <span className="ticker-item">SYSTEM STATUS: <span className="ticker-green">ONLINE</span></span>
                    <span className="ticker-item"><span className="ticker-dim">///</span> NEXT EVENT: MARCH 15-17</span>
                    <span className="ticker-item">REGISTRATION: <span className="ticker-green">OPEN</span></span>
                    <span className="ticker-item"><span className="ticker-dim">///</span> DETECTED LOCATION: SVNIT_CAMPUS</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
