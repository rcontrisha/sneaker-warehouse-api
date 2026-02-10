const db = require('../config/db');

const Product = {
  findAll: async () => {
    const query = `
      SELECT p.*, b.name as brand_name, c.name as category_name 
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN categories c ON p.category_id = c.id
    `;
    const [rows] = await db.query(query);
    return rows;
  },

  findById: async (id) => {
    const query = `
      SELECT p.*, b.name as brand_name, c.name as category_name 
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
    const [rows] = await db.query(query, [id]);
    return rows[0];
  },

  create: async (data) => {
    const { brand_id, category_id, model_name, description } = data;
    const [result] = await db.query(
      'INSERT INTO products (brand_id, category_id, model_name, description) VALUES (?, ?, ?, ?)',
      [brand_id, category_id, model_name, description]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const fields = Object.keys(data);
    if (fields.length === 0) return false;

    const queryParts = fields.map(field => `${field} = ?`).join(', ');
    const values = Object.values(data);
    
    values.push(id);

    const sql = `UPDATE products SET ${queryParts} WHERE id = ?`;
    await db.query(sql, values);
    return true;
  },

  delete: async (id) => {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    return true;
  }
};

module.exports = Product;