const express = require('express');
const router = express.Router();

// Import semua controller
const brandController = require('../controllers/brandController');
const productController = require('../controllers/productController');
const variantController = require('../controllers/variantController');
const categoryController = require('../controllers/categoryController'); 

// Categories
router.get('/categories', categoryController.getAll);
router.get('/categories/:id', categoryController.getOne);
router.post('/categories', categoryController.create);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);

// Brands
router.get('/brands', brandController.getAll);
router.get('/brands/:id', brandController.getOne); 
router.post('/brands', brandController.create);
router.patch('/brands/:id', brandController.update); 
router.delete('/brands/:id', brandController.delete); 

// Products
router.get('/products', productController.getAll);
router.get('/products/:id', productController.getOne);
router.post('/products', productController.create);
router.patch('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

// Variants (Inventory)
router.get('/products/:productId/variants', variantController.getByProduct);
router.get('/variants/:id', variantController.getOne); 
router.post('/variants', variantController.addVariant);
router.patch('/variants/:id', variantController.update);
router.delete('/variants/:id', variantController.delete); 

module.exports = router;