import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import '../styles/LoanCard.css';

const LoanCard = ({ loan }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="loan-card">
      <div className="card-image-wrapper">
        <img src={loan.image} alt={loan.name} className="card-image" />
        <div className="card-badge">{loan.type}</div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{loan.name}</h3>
        
        <p className="card-description">{loan.description}</p>

        <div className="loan-highlights">
          <div className="highlight-item">
            <span className="label">Amount Range</span>
            <span className="value">
              {formatCurrency(loan.minAmount)} - {formatCurrency(loan.maxAmount)}
            </span>
          </div>
          <div className="highlight-item">
            <span className="label">Interest Rate</span>
            <span className="value">
              {loan.interestRate.min}% - {loan.interestRate.max}%
            </span>
          </div>
          <div className="highlight-item">
            <span className="label">Term</span>
            <span className="value">
              {loan.minTerm} - {loan.maxTerm} months
            </span>
          </div>
        </div>

        {loan.features && loan.features.length > 0 && (
          <div className="card-features">
            <h4>Key Features</h4>
            <ul>
              {loan.features.slice(0, 3).map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        <Link to={`/loan-products/${loan._id}`} className="card-link">
          Learn More <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default LoanCard;
