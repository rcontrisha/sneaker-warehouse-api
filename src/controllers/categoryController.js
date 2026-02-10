const Category = require('../models/categoryModel');

const categoryController = {
  getAll: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.json({ status: 'success', data: categories });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ status: 'error', message: 'Category not found' });
      res.json({ status: 'success', data: category });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ status: 'error', message: 'Name is required' });
      const id = await Category.create(name);
      res.status(201).json({ status: 'success', data: { id } });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.update(req.params.id, name);
      res.json({ status: 'success', message: 'Category updated' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      await Category.delete(req.params.id);
      res.json({ status: 'success', message: 'Category deleted' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
};

module.exports = categoryController;