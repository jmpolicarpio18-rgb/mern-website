import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import '../styles/Contact.css';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onBlur'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/contacts', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        inquiryType: data.inquiryType
      });
      
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We're here to help. Get in touch with our team today.</p>
        </div>
      </section>

      <div className="contact-container">
        {/* Contact Info Cards */}
        <section className="contact-info-section">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon"><FaPhone /></div>
              <h3>Phone</h3>
              <p>+1 (800) 123-4567</p>
              <p className="hours">Mon - Fri: 8:00 AM - 6:00 PM EST</p>
            </div>
            <div className="info-card">
              <div className="info-icon"><FaEnvelope /></div>
              <h3>Email</h3>
              <p><a href="mailto:info@eliterealfyfinance.com">info@eliterealfyfinance.com</a></p>
              <p><a href="mailto:support@eliterealfyfinance.com">support@eliterealfyfinance.com</a></p>
            </div>
            <div className="info-card">
              <div className="info-icon"><FaMapMarkerAlt /></div>
              <h3>Office Location</h3>
              <p>123 Financial Plaza<br />Suite 500<br />New York, NY 10001</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="contact-main">
          <div className="contact-content">
            {/* Contact Form */}
            <div className="form-section">
              <h2>Send us a Message</h2>
              {submitSuccess && (
                <div className="success-alert">
                  <span>✓ Thank you! We've received your message and will be in touch soon.</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
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
                    <label>Phone *</label>
                    <input
                      type="tel"
                      {...register('phone', { required: 'Phone is required' })}
                      className={errors.phone ? 'input-error' : ''}
                    />
                    {errors.phone && <span className="error-text">{errors.phone.message}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Inquiry Type *</label>
                  <select {...register('inquiryType', { required: 'Inquiry type is required' })} className={errors.inquiryType ? 'input-error' : ''}>
                    <option value="">Select Type</option>
                    <option value="General">General Inquiry</option>
                    <option value="Loan Inquiry">Loan Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Partnership">Partnership Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.inquiryType && <span className="error-text">{errors.inquiryType.message}</span>}
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    {...register('subject', { required: 'Subject is required' })}
                    className={errors.subject ? 'input-error' : ''}
                  />
                  {errors.subject && <span className="error-text">{errors.subject.message}</span>}
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })}
                    rows="5"
                    className={errors.message ? 'input-error' : ''}
                  />
                  {errors.message && <span className="error-text">{errors.message.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Map & Social */}
            <div className="map-social-section">
              <div className="map-container">
                <iframe
                  title="Elite Realty Finance Office"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.00601!3d40.71282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a27aaa22d4d%3A0x1234567890abcdef!2s123%20Financial%20Plaza%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1234567890123"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

              <div className="social-section">
                <h3>Follow Us</h3>
                <p>Stay updated with the latest news and offers</p>
                <div className="social-links">
                  <a href="#facebook" title="Facebook"><FaFacebook /></a>
                  <a href="#twitter" title="Twitter"><FaTwitter /></a>
                  <a href="#linkedin" title="LinkedIn"><FaLinkedin /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What documents do I need for a loan application?</h3>
              <p>You'll need recent pay stubs, tax returns, bank statements, identification, and property documents. Our team can provide a complete checklist during the application process.</p>
            </div>
            <div className="faq-item">
              <h3>How long does approval take?</h3>
              <p>Most applications are reviewed within 24-48 hours. You'll receive a decision via email and phone call from our team.</p>
            </div>
            <div className="faq-item">
              <h3>What are your interest rates?</h3>
              <p>Interest rates vary based on loan type, term, creditworthiness, and property value. Call us for a personalized rate quote.</p>
            </div>
            <div className="faq-item">
              <h3>Can I prepay my loan without penalty?</h3>
              <p>Yes! We offer flexible prepayment options with no prepayment penalties on most loan products.</p>
            </div>
            <div className="faq-item">
              <h3>What makes your company different?</h3>
              <p>We combine industry expertise, transparent pricing, fast approvals, and dedicated customer support. Your success is our priority.</p>
            </div>
            <div className="faq-item">
              <h3>Is my information secure?</h3>
              <p>Absolutely. We use 256-bit SSL encryption and comply with all FDIC, SEC, and CFPB regulations to protect your data.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
