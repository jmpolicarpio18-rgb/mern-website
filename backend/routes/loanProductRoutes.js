const express = require('express');
const router = express.Router();
const LoanProduct = require('../models/LoanProduct');

// Get all loan products
router.get('/', async (req, res) => {
  try {
    const products = await LoanProduct.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single loan product
router.get('/:id', async (req, res) => {
  try {
    const product = await LoanProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create loan product (admin)
router.post('/', async (req, res) => {
  const product = new LoanProduct(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update loan product (admin)
router.put('/:id', async (req, res) => {
  try {
    const product = await LoanProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    Object.assign(product, req.body);
    product.updatedAt = new Date();
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete loan product (admin)
router.delete('/:id', async (req, res) => {
  try {
    const product = await LoanProduct.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
