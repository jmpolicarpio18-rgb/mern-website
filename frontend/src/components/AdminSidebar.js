import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AdminSidebar.css';

function AdminSidebar() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
        <p className="admin-name">{admin.fullName}</p>
      </div>

      <nav className="sidebar-nav">
        <Link to="/admin/dashboard" className="nav-item">
          <span className="icon">📊</span> Dashboard
        </Link>
        <Link to="/admin/applications" className="nav-item">
          <span className="icon">📋</span> Applications
        </Link>
        <Link to="/admin/contacts" className="nav-item">
          <span className="icon">💬</span> Contacts
        </Link>
        <Link to="/admin/settings" className="nav-item">
          <span className="icon">⚙️</span> Settings
        </Link>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminSidebar;
