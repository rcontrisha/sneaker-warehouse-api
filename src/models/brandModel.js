const db = require('../config/db');

const Brand = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM brands ORDER BY name ASC');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM brands WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (data) => {
    const { name, country, logo_url } = data;
    const [result] = await db.query(
      'INSERT INTO brands (name, country, logo_url) VALUES (?, ?, ?)',
      [name, country, logo_url]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const fields = Object.keys(data);
    if (fields.length === 0) return false;

    const queryParts = fields.map(field => `${field} = ?`).join(', ');
    const values = Object.values(data);
    values.push(id);

    const sql = `UPDATE brands SET ${queryParts} WHERE id = ?`;
    await db.query(sql, values);
    return true;
  },

  delete: async (id) => {
    await db.query('DELETE FROM brands WHERE id = ?', [id]);
    return true;
  }
};

module.exports = Brand;