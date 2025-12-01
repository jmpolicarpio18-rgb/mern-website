import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoanCard from '../components/LoanCard';
import LoanCalculator from '../components/LoanCalculator';
import { FaCheckCircle, FaShieldAlt, FaHeadset, FaBolt } from 'react-icons/fa';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
  const [featuredLoans, setFeaturedLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedLoans();
  }, []);

  const fetchFeaturedLoans = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/loan-products');
      setFeaturedLoans(response.data.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching loans:', error);
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Real-Estate Backed Financing Made Simple</h1>
          <p>Unlock your property's value with competitive loan solutions tailored for your needs</p>
          <Link to="/apply" className="btn btn-primary btn-lg">
            Start Your Application
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-choose-us">
        <h2 className="section-title">Why Choose Elite Realty Finance?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><FaCheckCircle /></div>
            <h3>Fast Approval</h3>
            <p>Get approved within 24-48 hours with our streamlined process</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaShieldAlt /></div>
            <h3>Secure & Transparent</h3>
            <p>Complete transparency with no hidden fees or surprises</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaBolt /></div>
            <h3>Flexible Terms</h3>
            <p>Customizable loan terms and payment plans to fit your budget</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaHeadset /></div>
            <h3>Expert Support</h3>
            <p>Dedicated loan specialists available 24/7 to assist you</p>
          </div>
        </div>
      </section>

      {/* Featured Loan Products */}
      <section className="section featured-loans">
        <h2 className="section-title">Our Loan Products</h2>
        <p className="section-subtitle">Explore our comprehensive range of real-estate backed financing solutions</p>
        
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            <div className="loan-grid">
              {featuredLoans.map(loan => (
                <LoanCard key={loan._id} loan={loan} />
              ))}
            </div>
            <div className="view-all-container">
              <Link to="/loan-products" className="btn btn-secondary">
                View All Products →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Loan Calculator */}
      <LoanCalculator />

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Apply for your real-estate backed loan today and take the first step toward financial growth</p>
          <Link to="/apply" className="btn btn-primary btn-lg">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
