const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Settings = require('../models/Settings');
const Contact = require('../models/Contact');
const Application = require('../models/Application');
const { verifyToken, verifySuperAdmin } = require('../middleware/adminAuth');

// AUTHENTICATION ROUTES

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (!admin.isActive) {
      return res.status(401).json({ message: 'Admin account is inactive' });
    }
    
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role, email: admin.email },
      process.env.JWT_SECRET || 'your_jwt_secret_key_change_this',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
        permissions: admin.permissions
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Create Admin (Super Admin Only)
router.post('/create-admin', verifyToken, verifySuperAdmin, async (req, res) => {
  try {
    const { username, email, password, fullName, role } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email or username already exists' });
    }
    
    const newAdmin = new Admin({
      username,
      email,
      password,
      fullName,
      role: role || 'admin'
    });
    
    await newAdmin.save();
    
    res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        fullName: newAdmin.fullName,
        role: newAdmin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create admin', error: error.message });
  }
});

// SETTINGS ROUTES

// Get Settings
router.get('/settings', verifyToken, async (req, res) => {
  try {
    let settings = await Settings.findOne().populate('updatedBy', 'fullName email');
    if (!settings) {
      settings = await Settings.findOrCreate();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch settings', error: error.message });
  }
});

// Update Settings
router.put('/settings', verifyToken, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.findOrCreate();
    }
    
    // Update all fields
    Object.assign(settings, req.body);
    settings.updatedBy = req.adminId;
    settings.updatedAt = new Date();
    
    await settings.save();
    
    res.json({
      message: 'Settings updated successfully',
      settings
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update settings', error: error.message });
  }
});

// CONTACTS MANAGEMENT ROUTES

// Get All Contacts
router.get('/contacts', verifyToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = status ? { status } : {};
    const skip = (page - 1) * limit;
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Contact.countDocuments(query);
    
    res.json({
      contacts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error: error.message });
  }
});

// Get Single Contact
router.get('/contacts/:id', verifyToken, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contact', error: error.message });
  }
});

// Update Contact Status and Add Response
router.put('/contacts/:id', verifyToken, async (req, res) => {
  try {
    const { status, response } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        status,
        response,
        respondedBy: req.adminId,
        respondedAt: new Date()
      },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json({
      message: 'Contact updated successfully',
      contact
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update contact', error: error.message });
  }
});

// Delete Contact
router.delete('/contacts/:id', verifyToken, verifySuperAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contact', error: error.message });
  }
});

// APPLICATIONS MANAGEMENT ROUTES

// Get All Applications
router.get('/applications', verifyToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = status ? { 'loanDetails.status': status } : {};
    const skip = (page - 1) * limit;
    
    const applications = await Application.find(query)
      .populate('loanDetails.productId', 'productName interestRate')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Application.countDocuments(query);
    
    res.json({
      applications,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
  }
});

// Get Single Application
router.get('/applications/:id', verifyToken, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('loanDetails.productId');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch application', error: error.message });
  }
});

// Update Application Status
router.put('/applications/:id', verifyToken, async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        'loanDetails.status': status,
        'loanDetails.notes': notes
      },
      { new: true }
    ).populate('loanDetails.productId');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json({
      message: 'Application updated successfully',
      application
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update application', error: error.message });
  }
});

// STATISTICS ROUTES

// Get Dashboard Statistics
router.get('/statistics/dashboard', verifyToken, async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const newApplications = await Application.countDocuments({ 'loanDetails.status': 'Pending' });
    const newContacts = await Contact.countDocuments({ status: 'New' });
    
    res.json({
      totalApplications,
      totalContacts,
      newApplications,
      newContacts,
      resolvedContacts: await Contact.countDocuments({ status: 'Resolved' })
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch statistics', error: error.message });
  }
});

module.exports = router;
