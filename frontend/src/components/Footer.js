import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Elite Realty Finance</h3>
          <p>Providing trusted real-estate backed financing solutions for individuals and SMEs.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/loan-products">Loan Products</Link></li>
            <li><Link to="/apply">Apply Now</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Products</h3>
          <ul>
            <li><a href="#loan-products">Real-Estate Loans</a></li>
            <li><a href="#loan-products">SME Loans</a></li>
            <li><a href="#loan-products">Refinancing</a></li>
            <li><a href="#loan-products">Bridge Loans</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p><FaPhone /> +1 (800) 123-4567</p>
            <p><FaEnvelope /> info@eliterealftyfinance.com</p>
            <p><FaMapMarkerAlt /> 123 Financial Plaza, Suite 500<br />New York, NY 10001</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Elite Realty Finance. All rights reserved. | <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </div>
    </footer>
  );
};

export default Footer;
