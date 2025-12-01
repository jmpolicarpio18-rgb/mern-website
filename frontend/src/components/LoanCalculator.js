import React, { useState } from 'react';
import '../styles/LoanCalculator.css';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(240);

  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    if (monthlyRate === 0) {
      return (principal / numberOfPayments).toFixed(2);
    }

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment.toFixed(2);
  };

  const calculateTotalPayment = () => {
    return (calculateMonthlyPayment() * loanTerm).toFixed(2);
  };

  const calculateTotalInterest = () => {
    return (calculateTotalPayment() - loanAmount).toFixed(2);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h3>Loan Calculator</h3>
        <p className="calculator-subtitle">Estimate your monthly payments</p>

        <div className="calculator-inputs">
          <div className="input-group">
            <label>
              Loan Amount
              <span className="input-value">{formatCurrency(loanAmount)}</span>
            </label>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="slider"
            />
          </div>

          <div className="input-group">
            <label>
              Interest Rate (%)
              <span className="input-value">{interestRate}%</span>
            </label>
            <input
              type="range"
              min="2"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
          </div>

          <div className="input-group">
            <label>
              Loan Term (months)
              <span className="input-value">{loanTerm} months ({(loanTerm / 12).toFixed(1)} years)</span>
            </label>
            <input
              type="range"
              min="12"
              max="360"
              step="1"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>

        <div className="calculator-results">
          <div className="result-item">
            <span className="result-label">Monthly Payment</span>
            <span className="result-value">{formatCurrency(calculateMonthlyPayment())}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Payment</span>
            <span className="result-value">{formatCurrency(calculateTotalPayment())}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Interest</span>
            <span className="result-value">{formatCurrency(calculateTotalInterest())}</span>
          </div>
        </div>

        <button className="calculator-cta">Get Pre-Qualified Now</button>
      </div>
    </div>
  );
};

export default LoanCalculator;
