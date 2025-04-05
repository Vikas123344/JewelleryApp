import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onClick }) => (
  <div className="product-card">
    <img src={product.images[0]} alt={product.product_name} />
    <h3>{product.product_name}</h3>
    <p>Price: ₹{product.product_discount_price}</p>
    <span className="tag">{product.product_main_type}</span>
    <button onClick={onClick}>Open</button>
  </div>
);

export default ProductCard;
