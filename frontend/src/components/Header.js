import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          Elite Realty Finance
        </Link>

        <nav className={`nav-menu ${mobileOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/loan-products" className="nav-link" onClick={() => setMobileOpen(false)}>
                Loan Products
              </Link>
            </li>
            <li>
              <Link to="/apply" className="nav-link" onClick={() => setMobileOpen(false)}>
                Apply Now
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link" onClick={() => setMobileOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <button className="mobile-toggle" onClick={toggleMobile}>
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Header;
