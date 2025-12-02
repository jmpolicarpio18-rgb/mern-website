# Admin Panel Documentation

## Overview
The Admin Panel is a comprehensive management system for the Real Estate Loan website. It allows administrators to:
- Manage loan applications
- Respond to contact inquiries
- Edit website settings (contact info, maps, notification emails)
- View dashboard statistics

## Features

### 1. Dashboard
- View quick statistics:
  - Total applications
  - Pending applications
  - Total contacts
  - New contacts
  - Resolved contacts

### 2. Applications Management
- View all loan applications
- Filter by status (Pending, Under Review, Approved, Rejected)
- View detailed application information
- Update application status
- Add internal notes

### 3. Contacts Management
- View all contact form submissions
- Filter by status (New, In Progress, Resolved, Closed)
- View detailed contact messages
- Send responses to contacts
- Delete contacts

### 4. Settings
Manage all website configurations:
- **Contact Information**: Email, phone numbers
- **Address Information**: Complete business address
- **Location & Maps**: Latitude, longitude, Google Maps embed code
- **Application Notifications**: Emails to receive new application notifications
- **Social Media**: Links to social profiles
- **Business Information**: Name, description, hours

## Getting Started

### Initial Setup

1. **Initialize Admin Account**
```bash
cd backend
node init-admin.js
```

This will create a default admin account:
- **Email**: admin@realestate-loans.com
- **Password**: Admin@12345

2. **Access the Admin Panel**
- Navigate to: `http://localhost:3000/admin/login`
- Login with the credentials above
- **Change your password immediately** after first login

### Creating Additional Admins

1. Login to the admin panel
2. Use the API endpoint to create additional admins (requires super-admin role)

**API Endpoint:**
```
POST /api/admin/create-admin
Authorization: Bearer {token}

{
  "username": "admin2",
  "email": "admin2@example.com",
  "password": "SecurePassword123",
  "fullName": "John Doe",
  "role": "admin"
}
```

## Admin Roles

### Super Admin
- Full access to all features
- Can create/manage other admins
- Can delete contacts
- Can access all settings

### Admin
- Can manage applications
- Can manage contacts
- Can view and update settings
- Cannot create other admins

## Key Settings to Configure

After login, navigate to **Settings** and configure:

1. **Contact Email**: Primary contact email for inquiries
2. **Application Notification Email**: Email(s) to receive new application notifications
3. **Business Address**: Physical location details
4. **Google Maps**: Embed your business location
5. **Social Media**: Links to your social profiles

## API Endpoints

### Authentication
```
POST /api/admin/login
POST /api/admin/create-admin (Super Admin only)
```

### Settings
```
GET /api/admin/settings
PUT /api/admin/settings
```

### Contacts
```
GET /api/admin/contacts
GET /api/admin/contacts/:id
PUT /api/admin/contacts/:id
DELETE /api/admin/contacts/:id (Super Admin only)
```

### Applications
```
GET /api/admin/applications
GET /api/admin/applications/:id
PUT /api/admin/applications/:id
```

### Statistics
```
GET /api/admin/statistics/dashboard
```

## Security Notes

- All admin endpoints require JWT authentication
- Tokens expire after 7 days
- Passwords are encrypted using bcryptjs
- Always use HTTPS in production
- Change default admin password immediately
- Keep JWT_SECRET secure in environment variables

## Troubleshooting

### Login Issues
- Verify email and password
- Check if admin account is active
- Ensure MongoDB is running

### Settings Not Saving
- Check if you have admin permissions
- Verify all required fields are filled
- Check browser console for API errors

### Notifications Not Working
- Verify notification emails are correct
- Check SMTP settings in environment variables
- Review server logs for email errors

## Backend Environment Variables

Required `.env` variables:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secure_secret_key
PORT=5000
NODE_ENV=development
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Development

### Running the Backend
```bash
cd backend
npm install
npm start
```

### Running the Frontend
```bash
cd frontend
npm install
npm start
```

Backend will run on: `http://localhost:5000`
Frontend will run on: `http://localhost:3000`

## Support

For issues or questions about the admin panel, contact your system administrator.
