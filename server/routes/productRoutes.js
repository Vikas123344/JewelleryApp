const express = require('express');
const { getCategoryData, searchProducts } = require('../controllers/productController');
const router = express.Router();

// Route to fetch category-wise data
router.get('/category', getCategoryData);

// Route to fetch searched data based on typing or returned category name
router.get('/search', searchProducts);

module.exports = router;
