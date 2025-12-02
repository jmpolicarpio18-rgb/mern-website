import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoanProducts from './pages/LoanProducts';
import LoanProductDetail from './pages/LoanProductDetail';
import ApplyNow from './pages/ApplyNow';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminApplications from './pages/AdminApplications';
import AdminContacts from './pages/AdminContacts';
import AdminSettings from './pages/AdminSettings';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/loan-products" element={<LoanProducts />} />
                <Route path="/loan-products/:id" element={<LoanProductDetail />} />
                <Route path="/apply" element={<ApplyNow />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
