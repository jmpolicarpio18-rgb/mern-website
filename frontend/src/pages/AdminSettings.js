import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
import '../styles/AdminSettings.css';

function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchSettings();
  }, [navigate]);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:5000/api/admin/settings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSettings(response.data);
    } catch (err) {
      setMessage('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section) {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      await axios.put('http://localhost:5000/api/admin/settings', settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Settings saved successfully!');
    } catch (err) {
      setMessage('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <h1>Website Settings</h1>
        
        {message && <div className="message">{message}</div>}

        <form onSubmit={handleSaveSettings} className="settings-form">
          {/* Contact Information */}
          <section className="settings-section">
            <h2>Contact Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Primary Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={settings?.contactEmail || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Primary Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={settings?.contactPhone || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Secondary Phone</label>
                <input
                  type="tel"
                  name="contactPhone2"
                  value={settings?.contactPhone2 || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Address Information */}
          <section className="settings-section">
            <h2>Address Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={settings?.address || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={settings?.city || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={settings?.state || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={settings?.zipCode || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={settings?.country || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Maps Information */}
          <section className="settings-section">
            <h2>Location & Maps</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Latitude</label>
                <input
                  type="number"
                  name="latitude"
                  value={settings?.latitude || 0}
                  onChange={handleInputChange}
                  step="0.0001"
                />
              </div>
              <div className="form-group">
                <label>Longitude</label>
                <input
                  type="number"
                  name="longitude"
                  value={settings?.longitude || 0}
                  onChange={handleInputChange}
                  step="0.0001"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Google Maps Embed Code</label>
                <textarea
                  name="googleMapsEmbed"
                  value={settings?.googleMapsEmbed || ''}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Paste Google Maps iframe embed code here"
                />
              </div>
            </div>
          </section>

          {/* Application Notifications */}
          <section className="settings-section">
            <h2>Application Notifications</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Primary Notification Email</label>
                <input
                  type="email"
                  name="applicationNotificationEmail"
                  value={settings?.applicationNotificationEmail || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Secondary Notification Email</label>
                <input
                  type="email"
                  name="applicationNotificationEmail2"
                  value={settings?.applicationNotificationEmail2 || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  name="notifyViaEmail"
                  checked={settings?.notifyViaEmail || false}
                  onChange={(e) => setSettings(prev => ({ ...prev, notifyViaEmail: e.target.checked }))}
                />
                <label>Send email notifications for new applications</label>
              </div>
            </div>
          </section>

          {/* Social Media */}
          <section className="settings-section">
            <h2>Social Media</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Facebook</label>
                <input
                  type="url"
                  name="facebook"
                  value={settings?.facebook || ''}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="form-group">
                <label>Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  value={settings?.twitter || ''}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={settings?.linkedin || ''}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div className="form-group">
                <label>Instagram</label>
                <input
                  type="url"
                  name="instagram"
                  value={settings?.instagram || ''}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>
          </section>

          <button type="submit" disabled={saving} className="save-btn">
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSettings;
