const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const Settings = require('./models/Settings');

dotenv.config();

async function initializeAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate-loans');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log('Admin account already exists. Skipping initialization.');
      console.log('Admin Email:', existingAdmin.email);
      process.exit(0);
    }

    // Create default admin
    const defaultAdmin = new Admin({
      username: 'admin',
      email: 'admin@realestate-loans.com',
      password: 'Admin@12345', // Change this after first login
      fullName: 'Administrator',
      role: 'super-admin',
      permissions: {
        canEditSettings: true,
        canManageApplications: true,
        canManageContacts: true,
        canViewReports: true
      }
    });

    await defaultAdmin.save();
    console.log('✓ Admin account created successfully!');
    console.log('Email: admin@realestate-loans.com');
    console.log('Password: Admin@12345');
    console.log('⚠️  Please change this password after first login!');

    // Initialize default settings
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({
        contactEmail: 'contact@realestate-loans.com',
        contactPhone: '+1-800-LOANS-NOW',
        applicationNotificationEmail: 'admin@realestate-loans.com'
      });
      await settings.save();
      console.log('✓ Default settings initialized');
    }

    console.log('\n✓ Admin panel is ready!');
    console.log('Access the admin panel at: http://localhost:3000/admin/login');

    process.exit(0);
  } catch (error) {
    console.error('Error initializing admin:', error.message);
    process.exit(1);
  }
}

initializeAdmin();
