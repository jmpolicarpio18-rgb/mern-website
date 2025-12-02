import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSettings } from '../context/SettingsContext';
import '../styles/ApplyNow.css';

const ApplyNow = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onBlur'
  });
  const { settings, refetch: refetchSettings } = useSettings();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loanProducts, setLoanProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    // Fetch available loan products
    fetchLoanProducts();
    // Refresh every 30 seconds to get admin updates
    const interval = setInterval(fetchLoanProducts, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLoanProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/loan-products');
      setLoanProducts(response.data);
      setLoadingProducts(false);
      console.log('Loan products:', response.data);
    } catch (error) {
      console.error('Error fetching loan products:', error);
      setLoadingProducts(false);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedProductId) {
      alert('Please select a loan product');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/applications', {
        borrowerInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          idNumber: data.idNumber,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode
        },
        loanDetails: {
          productId: selectedProductId,
          loanAmount: data.loanAmount,
          loanTerm: data.loanTerm,
          purpose: data.loanPurpose
        },
        collateral: {
          propertyAddress: data.propertyAddress,
          propertyType: data.propertyType,
          propertyValue: data.propertyValue,
          mortgageStatus: data.mortgageStatus
        },
        financialInfo: {
          annualIncome: data.annualIncome,
          employmentStatus: data.employmentStatus,
          employerName: data.employerName,
          businessType: data.businessType,
          businessYearsInOperation: data.businessYearsInOperation
        },
        notes: data.additionalNotes,
        status: 'Submitted'
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert(error.response?.data?.message || 'Error submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="apply-now-page">
      {/* Header */}
      <section className="apply-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Apply for Your Loan</h1>
          <p>Complete our simple application in just a few steps</p>
        </div>
      </section>

      {/* Application Form */}
      <div className="apply-container">
        {submitSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Application Submitted Successfully!</h2>
            <p>Thank you for your application. We've received your information and will review it shortly.</p>
            <p className="success-details">Our team will contact you within 24-48 hours with an update.</p>
            <p className="redirect-message">Redirecting to home page in a few seconds...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="application-form">
            {/* Step Indicator */}
            <div className="step-indicator">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <span>1</span>
                <p>Personal Info</p>
              </div>
              <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <span>2</span>
                <p>Loan Details</p>
              </div>
              <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <span>3</span>
                <p>Financial Info</p>
              </div>
            </div>

            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="form-step">
                <h2>Personal Information</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      {...register('firstName', { required: 'First name is required' })}
                      className={errors.firstName ? 'input-error' : ''}
                    />
                    {errors.firstName && <span className="error-text">{errors.firstName.message}</span>}
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      {...register('lastName', { required: 'Last name is required' })}
                      className={errors.lastName ? 'input-error' : ''}
                    />
                    {errors.lastName && <span className="error-text">{errors.lastName.message}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                      className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email.message}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      {...register('phone', { required: 'Phone number is required' })}
                      className={errors.phone ? 'input-error' : ''}
                    />
                    {errors.phone && <span className="error-text">{errors.phone.message}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" {...register('dateOfBirth')} />
                  </div>
                  <div className="form-group">
                    <label>ID Number</label>
                    <input type="text" {...register('idNumber')} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input type="text" {...register('address')} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" {...register('city')} />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input type="text" {...register('state')} />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input type="text" {...register('zipCode')} />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setStep(2)} className="btn btn-primary">
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Loan Details */}
            {step === 2 && (
              <div className="form-step">
                <h2>Loan Details</h2>

                <div className="form-group">
                  <label>Select Loan Product *</label>
                  <select 
                    value={selectedProductId} 
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className={!selectedProductId && step === 2 ? 'input-error' : ''}
                    disabled={loadingProducts}
                  >
                    <option value="">
                      {loadingProducts ? 'Loading products...' : 'Choose a Loan Product'}
                    </option>
                    {loanProducts && loanProducts.length > 0 ? (
                      loanProducts.map(product => (
                        <option key={product._id} value={product._id}>
                          {product.name} - {product.interestRate.min}% - {product.interestRate.max}% APR
                        </option>
                      ))
                    ) : (
                      !loadingProducts && <option disabled>No loan products available</option>
                    )}
                  </select>
                  {!selectedProductId && step === 2 && <span className="error-text">Please select a loan product</span>}
                  {!loadingProducts && loanProducts.length === 0 && (
                    <span className="error-text">No loan products available. Please contact support.</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Desired Loan Amount *</label>
                  <input
                    type="number"
                    {...register('loanAmount', { required: 'Loan amount is required' })}
                    className={errors.loanAmount ? 'input-error' : ''}
                  />
                  {errors.loanAmount && <span className="error-text">{errors.loanAmount.message}</span>}
                </div>

                <div className="form-group">
                  <label>Loan Term (months) *</label>
                  <input
                    type="number"
                    {...register('loanTerm', { required: 'Loan term is required' })}
                    className={errors.loanTerm ? 'input-error' : ''}
                  />
                  {errors.loanTerm && <span className="error-text">{errors.loanTerm.message}</span>}
                </div>

                <div className="form-group">
                  <label>Loan Purpose *</label>
                  <select {...register('loanPurpose', { required: 'Loan purpose is required' })} className={errors.loanPurpose ? 'input-error' : ''}>
                    <option value="">Select Purpose</option>
                    <option value="Home Purchase">Home Purchase</option>
                    <option value="Refinancing">Refinancing</option>
                    <option value="Home Improvement">Home Improvement</option>
                    <option value="Business Expansion">Business Expansion</option>
                    <option value="Debt Consolidation">Debt Consolidation</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.loanPurpose && <span className="error-text">{errors.loanPurpose.message}</span>}
                </div>

                <h3>Property Information</h3>

                <div className="form-group">
                  <label>Property Address</label>
                  <input type="text" {...register('propertyAddress')} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Property Type</label>
                    <select {...register('propertyType')}>
                      <option value="">Select Type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Agricultural">Agricultural</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Property Value</label>
                    <input type="number" {...register('propertyValue')} />
                  </div>
                  <div className="form-group">
                    <label>Mortgage Status</label>
                    <select {...register('mortgageStatus')}>
                      <option value="">Select Status</option>
                      <option value="Clear">Clear</option>
                      <option value="Mortgaged">Mortgaged</option>
                      <option value="Under Review">Under Review</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">
                    Previous
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="btn btn-primary">
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Financial Information */}
            {step === 3 && (
              <div className="form-step">
                <h2>Financial Information</h2>

                <div className="form-group">
                  <label>Annual Income</label>
                  <input type="number" {...register('annualIncome')} />
                </div>

                <div className="form-group">
                  <label>Employment Status</label>
                  <select {...register('employmentStatus')}>
                    <option value="">Select Status</option>
                    <option value="Employed">Employed</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Retired">Retired</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Employer Name</label>
                  <input type="text" {...register('employerName')} />
                </div>

                <h3>Business Information (if applicable)</h3>

                <div className="form-group">
                  <label>Business Type</label>
                  <input type="text" {...register('businessType')} placeholder="e.g., Retail, Services, etc." />
                </div>

                <div className="form-group">
                  <label>Years in Operation</label>
                  <input type="number" {...register('businessYearsInOperation')} />
                </div>

                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea {...register('additionalNotes')} rows="4" placeholder="Any additional information you'd like to share..."></textarea>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setStep(2)} className="btn btn-secondary">
                    Previous
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyNow;
