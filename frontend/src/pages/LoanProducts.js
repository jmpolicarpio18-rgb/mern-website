import React, { useState, useEffect } from 'react';
import LoanCard from '../components/LoanCard';
import axios from 'axios';
import '../styles/LoanProducts.css';

const LoanProducts = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');

  const loanTypes = [
    'All',
    'Real-Estate Loan',
    'SME Loan',
    'Take-Out Loan',
    'Refinancing',
    'Construction Loan',
    'Bridge Loan'
  ];

  useEffect(() => {
    fetchLoans();
  }, []);

  useEffect(() => {
    filterLoans();
  }, [loans, selectedType]);

  const fetchLoans = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/loan-products');
      setLoans(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching loans:', error);
      setLoading(false);
    }
  };

  const filterLoans = () => {
    if (selectedType === 'All') {
      setFilteredLoans(loans);
    } else {
      setFilteredLoans(loans.filter(loan => loan.type === selectedType));
    }
  };

  return (
    <div className="loan-products-page">
      {/* Header */}
      <section className="products-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Our Loan Products</h1>
          <p>Choose the perfect financing solution for your real-estate needs</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="section">
        {/* Filter */}
        <div className="filter-container">
          <h3>Filter by Type</h3>
          <div className="filter-buttons">
            {loanTypes.map(type => (
              <button
                key={type}
                className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Loan Grid */}
        {loading ? (
          <div className="loading-spinner">Loading loan products...</div>
        ) : (
          <>
            <p className="results-count">
              Showing {filteredLoans.length} of {loans.length} products
            </p>
            {filteredLoans.length > 0 ? (
              <div className="loan-grid">
                {filteredLoans.map(loan => (
                  <LoanCard key={loan._id} loan={loan} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No loan products found for the selected type.</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default LoanProducts;
