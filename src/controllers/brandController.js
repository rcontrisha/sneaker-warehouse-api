const Brand = require('../models/brandModel');

const brandController = {
  getAll: async (req, res) => {
    try {
      const brands = await Brand.findAll();
      res.json({ status: 'success', data: brands });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const brand = await Brand.findById(req.params.id);
      if (!brand) return res.status(404).json({ status: 'error', message: 'Brand not found' });
      res.json({ status: 'success', data: brand });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ status: 'error', message: 'Brand name is required' });
      
      const id = await Brand.create(req.body);
      res.status(201).json({ status: 'success', data: { id } });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const brandId = req.params.id;
      const existing = await Brand.findById(brandId);
      if (!existing) return res.status(404).json({ status: 'error', message: 'Brand not found' });

      await Brand.update(brandId, req.body);
      res.json({ status: 'success', message: 'Brand updated successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const brandId = req.params.id;
      const existing = await Brand.findById(brandId);
      if (!existing) return res.status(404).json({ status: 'error', message: 'Brand not found' });

      await Brand.delete(brandId);
      res.json({ status: 'success', message: 'Brand and all its products deleted' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
};

module.exports = brandController;