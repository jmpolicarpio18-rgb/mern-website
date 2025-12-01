# Elite Realty Finance - Quick Reference Guide

## Project Location
```
C:\Users\arian\Desktop\mern-app\
```

## Quick Start Commands

### Installation (First Time Only)

**PowerShell**:
```powershell
cd C:\Users\arian\Desktop\mern-app
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser
.\install.ps1
```

**Command Prompt**:
```cmd
cd C:\Users\arian\Desktop\mern-app
install.bat
```

**Manual**:
```bash
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### Running the Application

**Start Backend** (Terminal 1):
```bash
cd backend
npm run dev
```
→ Runs on `http://localhost:5000`

**Start Frontend** (Terminal 2):
```bash
cd frontend
npm start
```
→ Runs on `http://localhost:3000`

## Directory Structure Quick Guide

```
backend/
├── server.js           ← Entry point
├── models/             ← Database schemas
├── routes/             ← API endpoints
└── .env                ← Configuration

frontend/
├── src/
│   ├── App.js          ← Main component
│   ├── pages/          ← Page components
│   ├── components/     ← Reusable components
│   └── styles/         ← CSS files
└── public/
    └── index.html      ← HTML template
```

## Page URLs

| Page | URL | File |
|------|-----|------|
| Home | `/` | `Home.js` |
| Products | `/loan-products` | `LoanProducts.js` |
| Product Detail | `/loan-products/:id` | `LoanProductDetail.js` |
| Apply | `/apply` | `ApplyNow.js` |
| About | `/about` | `About.js` |
| Contact | `/contact` | `Contact.js` |

## API Endpoints

### Loan Products
```
GET    /api/loan-products           ← Get all products
GET    /api/loan-products/:id       ← Get one product
POST   /api/loan-products           ← Create product (admin)
PUT    /api/loan-products/:id       ← Update product (admin)
DELETE /api/loan-products/:id       ← Delete product (admin)
```

### Applications
```
GET    /api/applications            ← Get all applications (admin)
GET    /api/applications/:id        ← Get one application
POST   /api/applications            ← Submit application
PUT    /api/applications/:id        ← Update application
PUT    /api/applications/:id/submit ← Submit for review
DELETE /api/applications/:id        ← Delete application
```

### Contacts
```
GET    /api/contacts                ← Get all contacts (admin)
GET    /api/contacts/:id            ← Get one contact
POST   /api/contacts                ← Submit contact form
PUT    /api/contacts/:id            ← Update contact/respond
DELETE /api/contacts/:id            ← Delete contact
```

### Health Check
```
GET    /api/health                  ← Server status
```

## Key Files to Edit

### Update Company Info
- `frontend/src/components/Header.js` - Company name in logo
- `frontend/src/components/Footer.js` - Contact details and links
- `frontend/src/pages/About.js` - Mission, vision, values
- `frontend/src/pages/Contact.js` - Contact information

### Update Colors
- `frontend/src/styles/App.css` - Change color codes
- `frontend/tailwind.config.js` - Tailwind color theme

### Add Loan Products
Method 1: Database
```javascript
// POST http://localhost:5000/api/loan-products
{
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
}
```

## Common Issues & Solutions

### Port 5000 Already in Use
```bash
netstat -ano | findstr :5000
taskkill /PID 1234 /F
```

### Port 3000 Already in Use
```bash
netstat -ano | findstr :3000
taskkill /PID 1234 /F
```

### MongoDB Connection Error
1. Verify MongoDB is running
2. Check MONGODB_URI in `backend/.env`
3. For Atlas: check network access and credentials

### Dependencies Not Found
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Form Not Submitting
- Check backend is running
- Check browser console for errors
- Verify API endpoint in network tab
- Check form validation errors

## Development Tips

### Hot Reload
- Backend: Nodemon watches for changes automatically
- Frontend: React dev server auto-refreshes

### Debug Mode
```javascript
// Add to console.log for debugging
console.log('Variable:', variable);
```

### API Testing
Use Postman or curl:
```bash
curl http://localhost:5000/api/health
```

### Add New Component
1. Create file in `frontend/src/components/`
2. Import in needed page
3. Use in JSX

### Add New Page
1. Create file in `frontend/src/pages/`
2. Add route in `frontend/src/App.js`
3. Add link in `Header.js` or other nav

## Configuration Files

### Backend `.env`
```env
MONGODB_URI=mongodb://localhost:27017/real-estate-loans
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:5000
```

## Environment Variables Needed

**Backend**:
- `MONGODB_URI` - Database connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - JWT signing key

**Frontend**:
- `REACT_APP_API_URL` - Backend API URL

## Build & Deploy

### Frontend Build
```bash
cd frontend
npm run build
```
Creates `frontend/build/` folder for deployment

### Backend Production
```bash
cd backend
NODE_ENV=production npm start
```

## Database Models

### LoanProduct
```javascript
{
  name: String,
  description: String,
  type: Enum,
  minAmount: Number,
  maxAmount: Number,
  interestRate: { min: Number, max: Number },
  features: [String],
  requirements: [String]
}
```

### Application
```javascript
{
  borrowerInfo: { firstName, lastName, email, phone, ... },
  loanDetails: { productId, loanAmount, loanTerm },
  collateral: { propertyAddress, propertyType, propertyValue },
  financialInfo: { annualIncome, employmentStatus },
  status: String
}
```

### Contact
```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  inquiryType: Enum
}
```

## Color Reference

- Primary Teal: `#0F766E`
- Secondary Teal: `#0D9488`
- Accent Gold: `#F59E0B`
- Dark Text: `#1f2937`
- Light Background: `#f9fafb`
- Border: `#e5e7eb`

## Responsive Breakpoints

```css
/* Mobile First */
< 768px - Mobile
768px - 1024px - Tablet
> 1024px - Desktop
```

## NPM Scripts

**Backend**:
```bash
npm run dev    # Development with nodemon
npm start      # Production
npm test       # Tests
```

**Frontend**:
```bash
npm start      # Development
npm run build  # Production build
npm test       # Tests
npm run eject  # Eject from CRA
```

## Important Links

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- API Health: `http://localhost:5000/api/health`
- MongoDB Atlas: `https://www.mongodb.com/cloud/atlas`
- Heroku: `https://www.heroku.com/`

## Documentation Files

- `README.md` - Full documentation
- `SETUP.md` - Detailed setup guide
- `CHECKLIST.md` - Getting started checklist
- `PROJECT_SUMMARY.md` - Project overview

## Before Going to Production

1. [ ] Set NODE_ENV=production
2. [ ] Use strong JWT_SECRET
3. [ ] Enable HTTPS
4. [ ] Set up SSL certificate
5. [ ] Configure CORS for your domain
6. [ ] Test all features
7. [ ] Set up monitoring
8. [ ] Backup database
9. [ ] Document API
10. [ ] Train team

## Useful Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check running processes
netstat -ano | findstr :PORT

# Kill process
taskkill /PID PID_NUMBER /F

# MongoDB connection test
mongosh

# Clear npm cache
npm cache clean --force

# Update npm
npm install -g npm@latest
```

## Quick Customization Checklist

- [ ] Change company name in Header/Footer
- [ ] Update contact information
- [ ] Change color scheme (if desired)
- [ ] Replace logo/images
- [ ] Update mission/vision/values
- [ ] Customize loan products
- [ ] Update FAQ section
- [ ] Add social media links
- [ ] Configure email service
- [ ] Set up payment processing

---

**Version**: 1.0.0
**Last Updated**: December 1, 2025
**Status**: Ready to Use ✅
