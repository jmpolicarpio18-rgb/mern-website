const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  // Contact Information
  contactEmail: {
    type: String,
    required: true,
    lowercase: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  contactPhone2: String,
  
  // Address Information
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  
  // Maps Integration
  latitude: {
    type: Number,
    default: 0
  },
  longitude: {
    type: Number,
    default: 0
  },
  googleMapsEmbed: String,
  
  // Application Notification Settings
  applicationNotificationEmail: {
    type: String,
    required: true,
    lowercase: true
  },
  applicationNotificationEmail2: String,
  notifyViaEmail: {
    type: Boolean,
    default: true
  },
  
  // Business Information
  businessName: String,
  businessDescription: String,
  businessHours: String,
  
  // Social Media
  facebook: String,
  twitter: String,
  linkedin: String,
  instagram: String,
  
  // Website Settings
  website: String,
  logo: String,
  favicon: String,
  
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
});

// Ensure only one settings document exists
settingsSchema.statics.findOrCreate = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({
      contactEmail: 'contact@example.com',
      contactPhone: '+1-800-000-0000',
      applicationNotificationEmail: 'admin@example.com'
    });
  }
  return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);
