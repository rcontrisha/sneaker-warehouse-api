# Sneaker Warehouse API 👟

RESTful API untuk manajemen inventaris gudang sepatu, dibangun menggunakan Node.js, Express, dan MySQL.  
API ini mendukung pengelolaan kategori, brand, produk, dan varian stok (inventory) dengan struktur yang rapi, modular, dan scalable.

---

## 🚀 Fitur Utama

- Full CRUD Operations  
  Create, Read, Update, dan Delete untuk semua entitas: Categories, Brands, Products, dan Variants.

- Dynamic Partial Update  
  Mendukung update parsial menggunakan method PATCH, hanya field yang dikirim yang akan diperbarui.

- Bulk Insert Variants  
  Menambahkan banyak varian produk (size, SKU, harga, stok) dalam satu request.

- Relational Integrity  
  Menggunakan relasi database dengan ON DELETE CASCADE untuk menjaga konsistensi data.

- Clean Architecture  
  Pemisahan yang jelas antara Routes, Controllers, Models, dan Config.

---

## 🛠️ Tech Stack

- Runtime : Node.js  
- Framework : Express.js  
- Database : MySQL  
- Driver : mysql2/promise  
- Environment Config : dotenv  

---

## 📦 Instalasi & Persiapan

### 1. Clone Repository

    git clone https://github.com/rcontrisha/sneaker-warehouse-api.git
    cd sneaker-warehouse-api

### 2. Install Dependencies

    npm install

### 3. Setup Database

- Import file SQL database (contoh: sneaker_warehouse_db.sql) ke MySQL
- Buat file .env di root project

### 4. Menjalankan Aplikasi

    npm run dev

Server akan berjalan di:

    http://localhost:3000

---

## 📡 Endpoint API Utama

Semua endpoint menggunakan prefix:

    /api

### Categories
- GET /categories — Ambil semua kategori
- POST /categories — Tambah kategori baru
- DELETE /categories/:id — Hapus kategori

### Brands
- GET /brands — Ambil semua brand
- PATCH /brands/:id — Update brand secara dinamis

### Products
- GET /products — Ambil semua produk (beserta brand & kategori)
- GET /products/:id — Detail produk lengkap dengan seluruh variannya
- POST /products — Tambah produk baru

### Inventory (Variants)
- POST /variants — Tambah varian (single atau bulk array)
- PATCH /variants/:id — Update varian (stok, harga, dll)

---

## 🧪 Pengujian dengan Postman

Tersedia Postman Collection untuk mempermudah pengujian API.

Langkah:
1. Import file Collection JSON
2. Import file Environment JSON
3. Aktifkan environment lokal dan pastikan variabel:

    {{base_url}}

---

## 👤 Author
Developed by rcontrisha

---

## 📄 License
This project is licensed under the MIT License.
