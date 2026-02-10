const Variant = require('../models/variantModel');

const variantController = {
  getByProduct: async (req, res) => {
    try {
      const variants = await Variant.findByProductId(req.params.productId);
      res.json({ status: 'success', data: variants });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const variant = await Variant.findById(req.params.id);
      if (!variant) return res.status(404).json({ status: 'error', message: 'Variant not found' });
      res.json({ status: 'success', data: variant });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  addVariant: async (req, res) => {
    try {
      const data = req.body;
      if (Array.isArray(data)) {
        if (data.length === 0) return res.status(400).json({ status: 'error', message: 'Data tidak boleh kosong' });
        const affectedRows = await Variant.bulkCreate(data);
        return res.status(201).json({ status: 'success', message: `${affectedRows} varian berhasil ditambahkan.` });
      } 
      const id = await Variant.create(data);
      res.status(201).json({ status: 'success', data: { id } });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ status: 'error', message: 'Salah satu SKU sudah terdaftar' });
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const variantId = req.params.id;
      const existing = await Variant.findById(variantId);
      if (!existing) return res.status(404).json({ status: 'error', message: 'Variant not found' });

      await Variant.update(variantId, req.body);
      res.json({ status: 'success', message: 'Variant updated successfully' });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ status: 'error', message: 'SKU sudah digunakan oleh varian lain' });
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Variant.delete(req.params.id);
      res.json({ status: 'success', message: 'Variant deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
};

module.exports = variantController;