const db = require('../config/db');

const Variant = {
  findByProductId: async (productId) => {
    const [rows] = await db.query('SELECT * FROM product_variants WHERE product_id = ?', [productId]);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM product_variants WHERE id = ?', [id]);
    return rows[0];
  },

  // Fungsi untuk Bulk Insert
  bulkCreate: async (variantsArray) => {
    const values = variantsArray.map(v => [
      v.product_id,
      v.size,
      v.sku,
      v.stock || 0,
      v.price
    ]);

    const query = 'INSERT INTO product_variants (product_id, size, sku, stock, price) VALUES ?';
    const [result] = await db.query(query, [values]);
    return result.affectedRows;
  },

  // Fungsi untuk Single Insert
  create: async (data) => {
    const { product_id, size, sku, stock, price } = data;
    const [result] = await db.query(
      'INSERT INTO product_variants (product_id, size, sku, stock, price) VALUES (?, ?, ?, ?, ?)',
      [product_id, size, sku, stock, price]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const fields = Object.keys(data);
    if (fields.length === 0) return false;

    const queryParts = fields.map(field => `${field} = ?`).join(', ');
    const values = Object.values(data);
    values.push(id);

    const sql = `UPDATE product_variants SET ${queryParts} WHERE id = ?`;
    await db.query(sql, values);
    return true;
  },

  delete: async (id) => {
    await db.query('DELETE FROM product_variants WHERE id = ?', [id]);
    return true;
  }
};

module.exports = Variant;