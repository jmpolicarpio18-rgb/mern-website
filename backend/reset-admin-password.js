const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

async function resetAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate-loans');
    console.log('Connected to MongoDB');

    // Find the first admin
    const admin = await Admin.findOne();
    
    if (!admin) {
      console.log('No admin account found. Run init-admin.js first.');
      process.exit(0);
    }

    console.log('Current Admin:');
    console.log('- Username:', admin.username);
    console.log('- Email:', admin.email);
    console.log('- Role:', admin.role);

    // Reset password
    const newPassword = 'Admin@12345';
    admin.password = newPassword;
    
    await admin.save();
    
    console.log('\n✓ Password reset successfully!');
    console.log('New Password:', newPassword);
    console.log('\nYou can now login with:');
    console.log('Email:', admin.email);
    console.log('Password:', newPassword);

    process.exit(0);
  } catch (error) {
    console.error('Error resetting password:', error.message);
    process.exit(1);
  }
}

resetAdminPassword();
