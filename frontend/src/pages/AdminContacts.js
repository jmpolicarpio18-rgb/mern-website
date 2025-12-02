import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
import '../styles/AdminContacts.css';

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchContacts();
  }, [page, filter, navigate]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const params = { page, limit: 10 };
      if (filter) params.status = filter;

      const response = await axios.get('http://localhost:5000/api/admin/contacts', {
        headers: { Authorization: `Bearer ${token}` },
        params
      });

      setContacts(response.data.contacts);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (contact) => {
    setSelectedContact(contact);
    setResponse(contact.response || '');
    setStatus(contact.status || 'New');
  };

  const handleUpdateContact = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/api/admin/contacts/${selectedContact._id}`, {
        status,
        response
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSelectedContact(null);
      setResponse('');
      setStatus('');
      fetchContacts();
      alert('Contact updated successfully!');
    } catch (err) {
      alert('Failed to update contact');
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`http://localhost:5000/api/admin/contacts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        fetchContacts();
        alert('Contact deleted successfully!');
      } catch (err) {
        alert('Failed to delete contact');
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <h1>Contact Messages</h1>

        <div className="filter-controls">
          <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }}>
            <option value="">All Contacts</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="contacts-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact._id} className={`status-${contact.status.toLowerCase()}`}>
                      <td>{contact.firstName} {contact.lastName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.subject}</td>
                      <td><span className="status-badge">{contact.status}</span></td>
                      <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="view-btn" onClick={() => handleViewDetails(contact)}>View</button>
                        <button className="delete-btn" onClick={() => handleDeleteContact(contact._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={p === page ? 'active' : ''}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Modal for viewing/editing contact */}
        {selectedContact && (
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close" onClick={() => setSelectedContact(null)}>&times;</span>
              
              <h2>Contact Details</h2>
              
              <div className="contact-details">
                <div className="detail-row">
                  <strong>Name:</strong> {selectedContact.firstName} {selectedContact.lastName}
                </div>
                <div className="detail-row">
                  <strong>Email:</strong> {selectedContact.email}
                </div>
                <div className="detail-row">
                  <strong>Phone:</strong> {selectedContact.phone}
                </div>
                <div className="detail-row">
                  <strong>Subject:</strong> {selectedContact.subject}
                </div>
                <div className="detail-row">
                  <strong>Inquiry Type:</strong> {selectedContact.inquiryType}
                </div>
                <div className="detail-row">
                  <strong>Message:</strong>
                  <p>{selectedContact.message}</p>
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Response</label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows="5"
                  placeholder="Write your response here..."
                />
              </div>

              <div className="modal-actions">
                <button className="save-btn" onClick={handleUpdateContact}>Save Changes</button>
                <button className="cancel-btn" onClick={() => setSelectedContact(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminContacts;
