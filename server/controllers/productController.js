const Product = require('../models/productModel');

// Fetch category-wise data
exports.getCategoryData = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const products = await Product.find(); // Adjust limit as needed
    if (products.length === 0) {
      return res.status(404).json({ message: `No products found in this ${categoryName}.` });
    }
    console.log("productscat",products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching category data:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Search products by typing or returned category
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query; // Example: ?query=gold
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required.' });
    }

    const products = await Product.find({
      $or: [
        { product_main_type: { $regex: query, $options: 'i' } },
        { product_sub1_type: { $regex: query, $options: 'i' } },
        { product_sub2_type: { $regex: query, $options: 'i' } },
      ],
    });

    if (products.length === 0) {
        console.log("No products found.")
      return res.status(404).json({ message: 'No products found.' });
    }
    console.log("products",products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching products:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};
