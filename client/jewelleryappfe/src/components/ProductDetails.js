// import React from 'react';
// import '../styles/ProductDetails.css';
// import { useLocation } from 'react-router-dom';

// const ProductDetails = () => {
//   const { state } = useLocation(); // Retrieve the product data
//   const { product } = state; // Destructure product from state
//   return (
//   <div className="product-details">
//     <h2>{product.product_name}</h2>
//     <div className="details-grid">
//       <div><strong>ID:</strong> {product.product_id}</div>
//       <div><strong>Price:</strong> ₹{product.product_actual_price}</div>
//       <div><strong>Discount Price:</strong> ₹{product.product_discount_price}</div>
//       <div><strong>Type:</strong> {product.product_main_type}</div>
//       <div><strong>Sub-Type:</strong> {product.product_sub2_type}</div>
//       <div><strong>Purity:</strong> {product.purity}</div>
//       <div><strong>Weight:</strong> {product.weight}</div>
//       <div><strong>Stone:</strong> {product.stone || 'None'}</div>
//       <div><strong>Stone Weight:</strong> {product.stone_weight || 'None'}</div>
//       <div><strong>Rating:</strong> {product.rating}</div>
//       <div><strong>Added Date:</strong> {product.added_date}</div>
//       <div><strong>Description:</strong> {product.description}</div>
//     </div>
//     <div className="images">
//       {product.images.map((img, index) => (
//         <img key={index} src={img} alt={`Product ${index + 1}`} />
//       ))}
//     </div>
//   </div>
//   )
// };

// export default ProductDetails;
//v2
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { state } = useLocation();
  const { product } = state;
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="product-details">
      <h2>{product.product_name}</h2>

      {product.images.length > 1 ? (
        <div className="carousel">
          <div
            className="carousel-slide"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {product.images.map((img, index) => (
              <img key={index} src={img} alt={`Product ${index + 1}`} />
            ))}
          </div>

          <button className="carousel-arrow prev" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
          <button className="carousel-arrow next" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>

          <div className="carousel-buttons">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <img src={product.images[0]} alt={product.product_name} />
      )}

      <div className="details-grid">
        <div><strong>ID:</strong> {product.product_id}</div>
        <div><strong>Price:</strong> ₹{product.product_actual_price}</div>
        <div><strong>Discount Price:</strong> ₹{product.product_discount_price}</div>
        <div><strong>Type:</strong> {product.product_main_type}</div>
        <div><strong>Sub-Type:</strong> {product.product_sub2_type}</div>
        <div><strong>Purity:</strong> {product.purity}</div>
        <div><strong>Weight:</strong> {product.weight}</div>
        <div><strong>Stone:</strong> {product.stone || 'None'}</div>
        <div><strong>Stone Weight:</strong> {product.stone_weight || 'None'}</div>
        <div><strong>Rating:</strong> {product.rating}</div>
        <div><strong>Added Date:</strong> {product.added_date}</div>
        <div><strong>Description:</strong> {product.description}</div>
      </div>
    </div>
  );
};

export default ProductDetails;