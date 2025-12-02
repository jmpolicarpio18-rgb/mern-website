const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // Borrower Information
  borrowerInfo: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    dateOfBirth: Date,
    idNumber: String,
    address: String,
    city: String,
    state: String,
    zipCode: String
  },

  // Loan Details
  loanDetails: {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LoanProduct'
    },
    loanAmount: {
      type: Number,
      required: true
    },
    loanTerm: {
      type: Number,
      required: true
    },
    purpose: String,
    status: {
      type: String,
      enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
      default: 'Pending'
    },
    notes: String
  },

  // Property/Collateral Information
  collateral: {
    propertyAddress: String,
    propertyType: {
      type: String,
      enum: ['Residential', 'Commercial', 'Industrial', 'Agricultural']
    },
    propertyValue: Number,
    mortgageStatus: {
      type: String,
      enum: ['Clear', 'Mortgaged', 'Under Review']
    },
    loanToValue: Number
  },

  // Financial Information
  financialInfo: {
    annualIncome: Number,
    employmentStatus: String,
    employerName: String,
    businessType: String,
    businessYearsInOperation: Number
  },

  // Document Uploads
  documents: [{
    type: String,
    url: String,
    uploadedAt: Date
  }],

  // Application Status
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected', 'Withdrawn'],
    default: 'Draft'
  },

  // Verification
  verified: {
    type: Boolean,
    default: false
  },

  // Notes
  notes: String,
  adminNotes: String,

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  submittedAt: Date
});

module.exports = mongoose.model('Application', applicationSchema);
