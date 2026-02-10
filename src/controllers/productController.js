const Product = require('../models/productModel');
const db = require('../config/db');

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json({ status: 'success', data: products });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ status: 'error', message: 'Product not found' });
      
      const [variants] = await db.query('SELECT * FROM product_variants WHERE product_id = ?', [req.params.id]);
      product.variants = variants;

      res.json({ status: 'success', data: product });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { brand_id, category_id, model_name } = req.body;
      if (!brand_id || !category_id || !model_name) {
        return res.status(400).json({ status: 'error', message: 'Field brand_id, category_id, dan model_name wajib diisi!' });
      }
      const id = await Product.create(req.body);
      res.status(201).json({ status: 'success', data: { id } });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const productId = req.params.id;
      const updateData = req.body;

      // Cek dulu apakah produknya ada
      const existing = await Product.findById(productId);
      if (!existing) {
        return res.status(404).json({ status: 'error', message: 'Product not found' });
      }

      // Jalankan update dinamis
      await Product.update(productId, updateData);
      
      res.json({ 
        status: 'success', 
        message: 'Product updated successfully',
        updatedFields: Object.keys(updateData) 
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Product.delete(req.params.id);
      res.json({ status: 'success', message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
};

module.exports = productController;