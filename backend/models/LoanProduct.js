const mongoose = require('mongoose');

const loanProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Real-Estate Loan', 'SME Loan', 'Take-Out Loan', 'Refinancing', 'Construction Loan', 'Bridge Loan'],
    required: true
  },
  minAmount: {
    type: Number,
    required: true
  },
  maxAmount: {
    type: Number,
    required: true
  },
  minTerm: {
    type: Number,
    required: true,
    default: 12
  },
  maxTerm: {
    type: Number,
    required: true,
    default: 360
  },
  interestRate: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  features: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  sampleScenario: {
    loanAmount: Number,
    term: Number,
    interestRate: Number,
    monthlyPayment: Number
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300'
  },
  icon: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LoanProduct', loanProductSchema);
