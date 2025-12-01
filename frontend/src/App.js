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
import './styles/App.css';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
