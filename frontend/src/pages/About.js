import React from 'react';
import { FaAward, FaUsers, FaGlobeAmericas, FaLeaf } from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>About Elite Realty Finance</h1>
          <p>Pioneering real-estate backed financing solutions since 2015</p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section mvv-section">
        <div className="mvv-grid">
          <div className="mvv-card">
            <h3>Our Mission</h3>
            <p>To provide accessible, transparent, and efficient real-estate backed financing that empowers individuals and businesses to achieve their property and financial goals.</p>
          </div>
          <div className="mvv-card">
            <h3>Our Vision</h3>
            <p>To be the leading provider of innovative real-estate financing solutions, recognized for our commitment to excellence, integrity, and customer success.</p>
          </div>
          <div className="mvv-card">
            <h3>Our Values</h3>
            <ul>
              <li><strong>Integrity:</strong> Honest and transparent dealings</li>
              <li><strong>Excellence:</strong> Superior service delivery</li>
              <li><strong>Customer Focus:</strong> Your success is our priority</li>
              <li><strong>Innovation:</strong> Continuous improvement</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section why-us-section">
        <h2 className="section-title">Why Choose Elite Realty Finance?</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon"><FaAward /></div>
            <h3>Award-Winning Service</h3>
            <p>Recognized for excellence in real-estate financing and customer satisfaction for over 8 years</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon"><FaUsers /></div>
            <h3>Expert Team</h3>
            <p>Our lending specialists have over 200 years of combined experience in real-estate finance</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon"><FaGlobeAmericas /></div>
            <h3>National Reach</h3>
            <p>Operating across all 50 states with local expertise in every market</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon"><FaLeaf /></div>
            <h3>Sustainable Finance</h3>
            <p>Committed to eco-friendly lending practices and green property development</p>
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="section stats-section">
        <h2 className="section-title">By The Numbers</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>50,000+</h3>
            <p>Loans Funded</p>
          </div>
          <div className="stat-card">
            <h3>$5B+</h3>
            <p>In Total Financing</p>
          </div>
          <div className="stat-card">
            <h3>98%</h3>
            <p>Customer Satisfaction</p>
          </div>
          <div className="stat-card">
            <h3>24-48 hrs</h3>
            <p>Average Approval Time</p>
          </div>
        </div>
      </section>

      {/* Compliance & Security */}
      <section className="section compliance-section">
        <h2 className="section-title">Compliance & Security</h2>
        <div className="compliance-content">
          <div className="compliance-text">
            <h3>Your Data is Safe With Us</h3>
            <p>Elite Realty Finance is committed to the highest standards of data security and regulatory compliance. We are fully licensed and regulated by the appropriate financial authorities.</p>
            <ul className="compliance-list">
              <li>✓ Licensed by the National Mortgage Licensing System</li>
              <li>✓ SEC Registered and Regulated</li>
              <li>✓ FDIC Member Institution Partner</li>
              <li>✓ CFPB Compliant</li>
              <li>✓ ISO 27001 Certified for Information Security</li>
              <li>✓ 256-bit SSL Encryption for All Transactions</li>
            </ul>
          </div>
          <div className="compliance-box">
            <div className="cert-item">
              <span className="cert-badge">🔒</span>
              <span>Industry Standard Encryption</span>
            </div>
            <div className="cert-item">
              <span className="cert-badge">✓</span>
              <span>Regulatory Compliance</span>
            </div>
            <div className="cert-item">
              <span className="cert-badge">🛡️</span>
              <span>Data Protection</span>
            </div>
            <div className="cert-item">
              <span className="cert-badge">📋</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section team-section">
        <h2 className="section-title">Our Leadership</h2>
        <div className="team-grid">
          {['CEO & Founder', 'Chief Financial Officer', 'Head of Operations', 'Chief Technology Officer'].map((role, idx) => (
            <div key={idx} className="team-card">
              <div className="team-image"></div>
              <h3>Executive Leader</h3>
              <p className="role">{role}</p>
              <p className="bio">15+ years of experience in real-estate finance and business leadership</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-about">
        <h2>Ready to Get Started?</h2>
        <p>Let our team of experts help you find the perfect financing solution</p>
        <a href="/apply" className="btn btn-primary btn-lg">Apply Now</a>
      </section>
    </div>
  );
};

export default About;
