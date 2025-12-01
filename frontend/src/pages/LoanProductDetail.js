import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import '../styles/LoanProductDetail.css';

const LoanProductDetail = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoanDetails();
  }, [id]);

  const fetchLoanDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/loan-products/${id}`);
      setLoan(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching loan details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading loan details...</div>;
  }

  if (!loan) {
    return <div className="error-message">Loan product not found</div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="loan-detail-page">
      {/* Header */}
      <section className="detail-hero" style={{
        backgroundImage: `url(${loan.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <Link to="/loan-products" className="back-link">← Back to Products</Link>
          <h1>{loan.name}</h1>
          <p className="product-type">{loan.type}</p>
        </div>
      </section>

      <div className="detail-container">
        {/* Main Content */}
        <main className="detail-main">
          {/* Quick Facts */}
          <section className="quick-facts">
            <h2>Loan Overview</h2>
            <div className="facts-grid">
              <div className="fact-item">
                <span className="fact-label">Loan Amount Range</span>
                <span className="fact-value">
                  {formatCurrency(loan.minAmount)} - {formatCurrency(loan.maxAmount)}
                </span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Interest Rate Range</span>
                <span className="fact-value">
                  {loan.interestRate.min}% - {loan.interestRate.max}%
                </span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Loan Term (months)</span>
                <span className="fact-value">
                  {loan.minTerm} - {loan.maxTerm}
                </span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Loan Term (years)</span>
                <span className="fact-value">
                  {(loan.minTerm / 12).toFixed(1)} - {(loan.maxTerm / 12).toFixed(1)}
                </span>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="detail-section">
            <h2>About This Product</h2>
            <p>{loan.description}</p>
          </section>

          {/* Features */}
          {loan.features && loan.features.length > 0 && (
            <section className="detail-section">
              <h2>Key Features</h2>
              <ul className="features-list">
                {loan.features.map((feature, idx) => (
                  <li key={idx}>
                    <FaCheckCircle className="check-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Requirements */}
          {loan.requirements && loan.requirements.length > 0 && (
            <section className="detail-section">
              <h2>Requirements</h2>
              <ul className="requirements-list">
                {loan.requirements.map((requirement, idx) => (
                  <li key={idx}>{requirement}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Sample Scenario */}
          {loan.sampleScenario && (
            <section className="detail-section sample-scenario">
              <h2>Sample Scenario</h2>
              <div className="scenario-card">
                <div className="scenario-item">
                  <span className="label">Loan Amount</span>
                  <span className="value">{formatCurrency(loan.sampleScenario.loanAmount)}</span>
                </div>
                <div className="scenario-item">
                  <span className="label">Term</span>
                  <span className="value">{loan.sampleScenario.term} months</span>
                </div>
                <div className="scenario-item">
                  <span className="label">Interest Rate</span>
                  <span className="value">{loan.sampleScenario.interestRate}%</span>
                </div>
                <div className="scenario-item highlight">
                  <span className="label">Monthly Payment</span>
                  <span className="value">{formatCurrency(loan.sampleScenario.monthlyPayment)}</span>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside className="detail-sidebar">
          <div className="sidebar-card">
            <h3>Ready to Apply?</h3>
            <p>Start your application today and get approved quickly with our streamlined process.</p>
            <Link to="/apply" className="btn btn-primary btn-full">
              Apply Now <FaArrowRight />
            </Link>
            
            <div className="sidebar-info">
              <h4>Next Steps</h4>
              <ol>
                <li>Fill out the application form</li>
                <li>Provide necessary documents</li>
                <li>Submit for review</li>
                <li>Receive decision within 24-48 hours</li>
              </ol>
            </div>

            <button className="btn btn-secondary btn-full" onClick={() => window.print()}>
              Print Details
            </button>
          </div>

          <div className="sidebar-card contact-card">
            <h3>Have Questions?</h3>
            <p>Our loan specialists are here to help</p>
            <a href="tel:+18001234567" className="contact-link">📞 +1 (800) 123-4567</a>
            <a href="mailto:info@eliterealfyfinance.com" className="contact-link">📧 info@eliterealfyfinance.com</a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LoanProductDetail;
