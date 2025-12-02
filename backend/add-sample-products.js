const mongoose = require('mongoose');
const dotenv = require('dotenv');
const LoanProduct = require('./models/LoanProduct');

dotenv.config();

async function addSampleLoanProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate-loans');
    console.log('Connected to MongoDB');

    // Check if products already exist
    const existingProducts = await LoanProduct.countDocuments();
    if (existingProducts > 0) {
      console.log(`${existingProducts} loan products already exist.`);
      
      // Display existing products
      const products = await LoanProduct.find();
      console.log('\nExisting Loan Products:');
      products.forEach(p => {
        console.log(`- ${p.productName} (${p.interestRate}% APR, ${p.maxLoanAmount} max)`);
      });
      
      process.exit(0);
    }

    // Create sample loan products
    const sampleProducts = [
      {
        name: 'Standard Home Loan',
        description: 'Traditional mortgage for home purchase or refinancing',
        type: 'Real-Estate Loan',
        minAmount: 50000,
        maxAmount: 1000000,
        minTerm: 60,
        maxTerm: 360,
        interestRate: {
          min: 5.0,
          max: 6.5
        },
        features: ['Fixed Rate', 'Easy Approval', 'Flexible Terms'],
        requirements: ['Good credit score (700+)', 'Stable employment'],
        isActive: true
      },
      {
        name: 'Premium Home Loan',
        description: 'Exclusive mortgage for qualified borrowers with premium benefits',
        type: 'Real-Estate Loan',
        minAmount: 100000,
        maxAmount: 2000000,
        minTerm: 60,
        maxTerm: 360,
        interestRate: {
          min: 4.5,
          max: 5.5
        },
        features: ['Lowest Rates', 'Priority Processing', 'Waived Fees'],
        requirements: ['Excellent credit score (750+)', 'High income'],
        isActive: true
      },
      {
        name: 'Business Expansion Loan',
        description: 'Financing for business expansion and property acquisition',
        type: 'SME Loan',
        minAmount: 100000,
        maxAmount: 5000000,
        minTerm: 36,
        maxTerm: 240,
        interestRate: {
          min: 6.0,
          max: 8.0
        },
        features: ['Flexible Terms', 'For Businesses', 'Fast Approval'],
        requirements: ['2+ years in business', 'Business plan required'],
        isActive: true
      },
      {
        name: 'First-Time Home Buyer Loan',
        description: 'Special program designed for first-time homebuyers',
        type: 'Real-Estate Loan',
        minAmount: 30000,
        maxAmount: 500000,
        minTerm: 60,
        maxTerm: 360,
        interestRate: {
          min: 4.8,
          max: 6.0
        },
        features: ['Low Down Payment', 'First-Time Buyer Program', 'Education Support'],
        requirements: ['First-time buyer', 'Stable income'],
        isActive: true
      },
      {
        name: 'Refinance Loan',
        description: 'Refinance your existing mortgage at a better rate',
        type: 'Refinancing',
        minAmount: 50000,
        maxAmount: 2000000,
        minTerm: 60,
        maxTerm: 360,
        interestRate: {
          min: 4.0,
          max: 5.5
        },
        features: ['Rate Reduction', 'Cash-Out Option', 'Lower Payments'],
        requirements: ['Existing mortgage', 'Good credit score'],
        isActive: true
      }
    ];

    const createdProducts = await LoanProduct.insertMany(sampleProducts);
    console.log(`✓ ${createdProducts.length} loan products created successfully!\n`);
    
    createdProducts.forEach(product => {
      console.log(`✓ ${product.name} (${product.type})`);
      console.log(`  Interest Rate: ${product.interestRate.min}% - ${product.interestRate.max}%`);
      console.log(`  Loan Range: $${product.minAmount.toLocaleString()} - $${product.maxAmount.toLocaleString()}`);
      console.log(`  Term: ${product.minTerm} - ${product.maxTerm} months`);
      console.log();
    });

    console.log('Sample loan products are ready!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample loan products:', error.message);
    process.exit(1);
  }
}

addSampleLoanProducts();
