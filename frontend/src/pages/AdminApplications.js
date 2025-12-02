import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
import '../styles/AdminApplications.css';

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [notes, setNotes] = useState('');
  const [appStatus, setAppStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchApplications();
  }, [page, filter, navigate]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const params = { page, limit: 10 };
      if (filter) params.status = filter;

      const response = await axios.get('http://localhost:5000/api/admin/applications', {
        headers: { Authorization: `Bearer ${token}` },
        params
      });

      setApplications(response.data.applications);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (app) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`http://localhost:5000/api/admin/applications/${app._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedApp(response.data);
      setAppStatus(response.data.loanDetails?.status || 'Pending');
      setNotes(response.data.loanDetails?.notes || '');
    } catch (err) {
      console.error('Failed to fetch application details:', err);
    }
  };

  const handleUpdateApplication = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const result = await axios.put(`http://localhost:5000/api/admin/applications/${selectedApp._id}`, {
        status: appStatus,
        notes
      }, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setSelectedApp(null);
      setNotes('');
      setAppStatus('');
      fetchApplications();
      alert('Application updated successfully!');
    } catch (err) {
      console.error('Error updating application:', err);
      alert(err.response?.data?.message || 'Failed to update application');
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <h1>Loan Applications</h1>

        <div className="filter-controls">
          <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }}>
            <option value="">All Applications</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="applications-table">
              <table>
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Email</th>
                    <th>Loan Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app._id} className={`status-${app.loanDetails?.status?.toLowerCase().replace(' ', '-')}`}>
                      <td>{app.borrowerInfo?.firstName} {app.borrowerInfo?.lastName}</td>
                      <td>{app.borrowerInfo?.email}</td>
                      <td>${app.loanDetails?.loanAmount?.toLocaleString()}</td>
                      <td><span className="status-badge">{app.loanDetails?.status || 'Pending'}</span></td>
                      <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="view-btn" onClick={() => handleViewDetails(app)}>View</button>
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

        {/* Modal for viewing/editing application */}
        {selectedApp && (
          <div className="modal-overlay">
            <div className="modal-content modal-large">
              <span className="close" onClick={() => setSelectedApp(null)}>&times;</span>
              
              <h2>Application Details</h2>
              
              <div className="app-details-tabs">
                <div className="tab-content">
                  <h3>Borrower Information</h3>
                  <div className="detail-row">
                    <strong>Name:</strong> {selectedApp.borrowerInfo?.firstName} {selectedApp.borrowerInfo?.lastName}
                  </div>
                  <div className="detail-row">
                    <strong>Email:</strong> {selectedApp.borrowerInfo?.email}
                  </div>
                  <div className="detail-row">
                    <strong>Phone:</strong> {selectedApp.borrowerInfo?.phone}
                  </div>
                  <div className="detail-row">
                    <strong>Address:</strong> {selectedApp.borrowerInfo?.address}, {selectedApp.borrowerInfo?.city}, {selectedApp.borrowerInfo?.state}
                  </div>
                  <div className="detail-row">
                    <strong>Zip Code:</strong> {selectedApp.borrowerInfo?.zipCode}
                  </div>

                  <h3>Loan Details</h3>
                  <div className="detail-row">
                    <strong>Loan Amount:</strong> ${selectedApp.loanDetails?.loanAmount?.toLocaleString()}
                  </div>
                  <div className="detail-row">
                    <strong>Loan Term:</strong> {selectedApp.loanDetails?.loanTerm} months
                  </div>
                  <div className="detail-row">
                    <strong>Purpose:</strong> {selectedApp.loanDetails?.purpose}
                  </div>

                  <h3>Property Information</h3>
                  <div className="detail-row">
                    <strong>Property Address:</strong> {selectedApp.collateral?.address}
                  </div>
                  <div className="detail-row">
                    <strong>Estimated Value:</strong> ${selectedApp.collateral?.estimatedValue?.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Application Status</label>
                <select value={appStatus} onChange={(e) => setAppStatus(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="form-group">
                <label>Internal Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="5"
                  placeholder="Add internal notes about this application..."
                />
              </div>

              <div className="modal-actions">
                <button className="save-btn" onClick={handleUpdateApplication}>Save Changes</button>
                <button className="cancel-btn" onClick={() => setSelectedApp(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminApplications;
