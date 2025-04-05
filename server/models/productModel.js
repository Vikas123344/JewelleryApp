const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: Number,
  product_name: String,
  product_actual_price: Number,
  product_discount_price: Number,
  product_main_type: String,
  product_sub1_type: String,
  product_sub2_type: String,
  purity: String,
  weight: String,
  stone: String,
  stone_weight: String,
  images: [String],
  rating: Number,
  added_date: Date,
  description: String,
}, { collection: 'jewellery_products' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
