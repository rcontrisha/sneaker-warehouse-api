require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000;

// Menjalankan server
app.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(`🚀 Sneaker Warehouse API Nyala, Wir!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`===========================================`);
});