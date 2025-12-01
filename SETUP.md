# Elite Realty Finance - Complete Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### 1. Node.js and NPM
- **Download**: https://nodejs.org/ (LTS version recommended)
- **Verify Installation**:
  ```bash
  node --version
  npm --version
  ```

### 2. MongoDB
Choose one of the following options:

**Option A: Local MongoDB**
- Download from: https://www.mongodb.com/try/download/community
- Install and run MongoDB locally
- Connection string: `mongodb://localhost:27017/real-estate-loans`

**Option B: MongoDB Atlas (Cloud)**
- Create account at: https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string and add to `.env` file

### 3. Git (Optional but recommended)
- Download from: https://git-scm.com/download/win

### 4. Text Editor/IDE
- VS Code: https://code.visualstudio.com/
- WebStorm: https://www.jetbrains.com/webstorm/

## Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd "C:\Users\arian\Desktop\mern-app"
```

### Step 2: Run Installation Script

**Option A: Using PowerShell (Recommended)**
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser
.\install.ps1
```

**Option B: Using Command Prompt**
```bash
install.bat
```

**Option C: Manual Installation**

Backend:
```bash
cd backend
npm install
cd ..
```

Frontend:
```bash
cd frontend
npm install
cd ..
```

### Step 3: Configure Environment Variables

Edit `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/real-estate-loans
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Step 4: Start MongoDB

If using local MongoDB:
```bash
# Windows
mongod

# Or if MongoDB is installed as a service, it starts automatically
```

### Step 5: Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

### Step 6: Start Frontend Application (New Terminal/Tab)

```bash
cd frontend
npm start
```

Expected output:
```
webpack compiled successfully
Local: http://localhost:3000
On Your Network: http://192.168.x.x:3000
```

## Project Access

Once both servers are running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## Features Overview

### Pages Available

1. **Home** (`/`)
   - Hero section
   - Why choose us
   - Featured products
   - Loan calculator

2. **Loan Products** (`/loan-products`)
   - All loan products
   - Filter by type
   - Product details

3. **Loan Details** (`/loan-products/:id`)
   - Detailed information
   - Features and requirements
   - Sample scenarios

4. **Apply Now** (`/apply`)
   - Multi-step application form
   - Real-time validation
   - Submission confirmation

5. **About Us** (`/about`)
   - Company information
   - Mission, vision, values
   - Team and achievements

6. **Contact** (`/contact`)
   - Contact form
   - Company information
   - Map and social links
   - FAQ section

## API Testing

### Using Postman or cURL

**Get All Loan Products**
```bash
curl http://localhost:5000/api/loan-products
```

**Create New Loan Product** (POST)
```bash
curl -X POST http://localhost:5000/api/loan-products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Home Loan",
    "description": "Financing for home purchase",
    "type": "Real-Estate Loan",
    "minAmount": 50000,
    "maxAmount": 1000000,
    "minTerm": 120,
    "maxTerm": 360,
    "interestRate": { "min": 4.5, "max": 8.5 },
    "features": ["Fast Approval", "Flexible Terms"],
    "requirements": ["Property appraisal", "Income verification"]
  }'
```

**Submit Application** (POST)
```bash
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "borrowerInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    "loanDetails": {
      "loanAmount": 250000,
      "loanTerm": 240,
      "purpose": "Home Purchase"
    }
  }'
```

## Troubleshooting

### Port Already in Use

**Backend (Port 5000)**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID 1234 /F
```

**Frontend (Port 3000)**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID 1234 /F
```

### MongoDB Connection Error

1. Check MongoDB is running:
```bash
mongosh
```

2. Verify connection string in `.env`

3. If using MongoDB Atlas, check:
   - Network access is allowed
   - Database user credentials are correct
   - Connection string format is correct

### NPM Install Errors

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rmdir /s /q node_modules

# Reinstall
npm install
```

### Node Modules Not Found

```bash
# Reinstall dependencies
npm install

# Or use npm ci for exact versions
npm ci
```

## Development Workflow

### Code Structure

```
backend/
├── models/          # Database schemas
├── routes/          # API endpoints
├── controllers/     # Business logic
├── middleware/      # Custom middleware
└── server.js        # Entry point

frontend/src/
├── components/      # Reusable components
├── pages/          # Page components
├── styles/         # CSS files
├── utils/          # Helper functions
└── App.js          # Main app component
```

### Adding New Features

1. **Backend API Endpoint**
   - Create route in `routes/`
   - Add controller in `controllers/`
   - Update MongoDB model if needed

2. **Frontend Page**
   - Create new file in `pages/`
   - Add route in `App.js`
   - Create corresponding styles file

### Common Commands

**Backend**
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production
npm test         # Run tests
```

**Frontend**
```bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
npm run eject    # Eject from create-react-app
```

## Performance Tips

1. **Frontend Optimization**
   - Use React.memo for expensive components
   - Implement code splitting with React.lazy
   - Optimize images (use WebP format)
   - Enable GZIP compression

2. **Backend Optimization**
   - Add database indexes
   - Implement caching (Redis)
   - Use pagination for large datasets
   - Add request rate limiting

## Security Checklist

- [ ] Change JWT_SECRET in .env
- [ ] Set NODE_ENV to production for production
- [ ] Use HTTPS in production
- [ ] Implement authentication for admin endpoints
- [ ] Validate all user inputs
- [ ] Set up CORS properly for production domain
- [ ] Use environment variables for sensitive data
- [ ] Implement rate limiting
- [ ] Add request logging and monitoring
- [ ] Regular security audits

## Database Seeding (Optional)

To add sample data, create a seed script:

```javascript
// backend/seed.js
const mongoose = require('mongoose');
const LoanProduct = require('./models/LoanProduct');

mongoose.connect('mongodb://localhost:27017/real-estate-loans');

const loanProducts = [
  {
    name: 'Home Loan',
    description: 'Finance your dream home',
    type: 'Real-Estate Loan',
    minAmount: 50000,
    maxAmount: 1000000,
    minTerm: 120,
    maxTerm: 360,
    interestRate: { min: 4.5, max: 8.5 },
    features: ['Fast Approval', 'Flexible Terms', 'Low Rates'],
    requirements: ['Property appraisal', 'Income verification', 'Credit check']
  }
];

LoanProduct.insertMany(loanProducts)
  .then(() => console.log('Seed data inserted'))
  .catch(err => console.error(err));
```

Run with:
```bash
node seed.js
```

## Next Steps

1. Customize company information (replace "Elite Realty Finance" with actual company name)
2. Add real property images
3. Implement email notifications
4. Add payment gateway integration
5. Create admin dashboard
6. Set up user authentication
7. Deploy to hosting platform
8. Set up CI/CD pipeline

## Support

For issues or questions:
- Check the main README.md
- Review error logs in console
- Check MongoDB Atlas or local MongoDB for connectivity
- Verify all environment variables are set correctly

## Deployment

### Heroku Deployment

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

### Manual Server Deployment

1. Upload files to server (AWS EC2, DigitalOcean, etc.)
2. Install Node.js and MongoDB
3. Set environment variables
4. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

## License

Proprietary - All rights reserved

---

**Last Updated**: December 1, 2025
