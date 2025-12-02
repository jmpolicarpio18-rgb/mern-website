import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchDashboardStats();
  }, [navigate]);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:5000/api/admin/statistics/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <h1>Dashboard</h1>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Applications</h3>
              <p className="stat-number">{stats?.totalApplications || 0}</p>
            </div>
            <div className="stat-card pending">
              <h3>Pending Applications</h3>
              <p className="stat-number">{stats?.newApplications || 0}</p>
            </div>
            <div className="stat-card">
              <h3>Total Contacts</h3>
              <p className="stat-number">{stats?.totalContacts || 0}</p>
            </div>
            <div className="stat-card new">
              <h3>New Contacts</h3>
              <p className="stat-number">{stats?.newContacts || 0}</p>
            </div>
            <div className="stat-card resolved">
              <h3>Resolved Contacts</h3>
              <p className="stat-number">{stats?.resolvedContacts || 0}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
