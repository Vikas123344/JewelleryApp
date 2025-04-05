// // import React, { useState, useEffect } from 'react';
// // import ProductCard from './ProductCard';
// // import ProductDetails from './ProductDetails';
// // // import './HomePage.css';

// // const HomePage = () => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [products, setProducts] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);

// //   useEffect(() => {
// //     fetch('http://localhost:3000/api1/category')
// //       .then((response) => response.json())
// //       .then((data) => setProducts(data))
// //       .catch((error) => console.error('Error fetching products:', error));
// //   }, []);
// //   console.log("products",products)
// //   const handleSearch = () => {
// //     fetch(`http://localhost:3000/api1/search?query=${searchTerm}`)
// //       .then((response) => response.json())
// //       .then((data) => setProducts(data))
// //       .catch((error) => console.error('Error searching products:', error));
// //   };

// //   const handleProductClick = (product) => {
// //     setSelectedProduct(product);
// //   };

// //   return (
// //     <div className="home-page">
// //       <div className="search-bar">
// //         <input
// //           type="text"
// //           placeholder="Search for jewellery..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
// //         <button onClick={handleSearch}>Search</button>
// //         <label htmlFor="image-upload" className="camera-icon">📷</label>
// //         <input
// //           type="file"
// //           id="image-upload"
// //           style={{ display: 'none' }}
// //           onChange={(e) => console.log(e.target.files[0])}
// //         />
// //       </div>

// //       {!selectedProduct ? (
// //         <div className="categories">
// //           {['Necklace', 'Earrings', 'Bracelets', 'earrings','Wristwatch'].map((category, index) => (
// //             <div key={index} className="category-slider">
// //               <h2>{category}</h2>
// //               <div className="slider">
// //                 {products
// //                   .filter((product) => product.product_sub1_type === category.toLowerCase())
// //                   .map((product) => (
// //                     <ProductCard
// //                       key={product.product_id}
// //                       product={product}
// //                       onClick={() => handleProductClick(product)}
// //                     />
// //                   ))}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <ProductDetails product={selectedProduct} />
// //       )}
// //     </div>
// //   );
// // };

// // export default HomePage;
// import React, { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import ProductDetails from './ProductDetails';
// import { useNavigate } from 'react-router-dom';
// const HomePage = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [products, setProducts] = useState([]);
//     const [products1, setProducts1] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const navigate = useNavigate();
//     useEffect(() => {
//         fetch('http://localhost:3000/api1/category')
//             .then((response) => response.json())
//             .then((data) => setProducts(data))
//             .catch((error) => console.error('Error fetching products:', error));
//     }, []);

//     const handleSearch = () => {
//         fetch(`http://localhost:3000/api1/search?query=${searchTerm}`)
//             .then((response) => response.json())
//             .then((data) => setProducts(data))
//             .catch((error) => console.error('Error searching products:', error));
//     };

//     const handleImageUpload = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append('image', file);

//         try {
//             // Send the image to the classification API
//             const classifyResponse = await fetch('http://localhost:3000/api/classify', {
//                 method: 'POST',
//                 body: formData,
//             });

//             const classificationData = await classifyResponse.json();
//             console.log('Classification Data:', classificationData);

//             // Extract top 2 predictions
//             const topPredictions = classificationData
//                 .sort((a, b) => b.score - a.score)
//                 .slice(0, 2)
//                 .map((item) => item.class);

//             // Search products based on top predictions
//             const searchPromises = topPredictions.map((term) =>
//                 fetch(`http://localhost:3000/api1/search?query=${term}`).then((res) => res.json())
//             );

//             const searchResults = await Promise.all(searchPromises);

//             // Combine results from all searches
//             const combinedResults = searchResults.flat();
//             setProducts1(combinedResults);
//         } catch (error) {
//             console.error('Error processing image or fetching products:', error);
//         }
//     };
//     const handleProductClick = (product) => {
//         // Navigate to product details page with product data
//         navigate(`/productdetails`, { state: { product } });
//     };
//     //   const handleProductClick = (product) => {
//     //     setSelectedProduct(product);
//     //   };

//     return (
//         <div className="home-page">
//             <div className="search-bar">
//                 <input
//                     type="text"
//                     placeholder="Search for jewellery..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//                 <label htmlFor="image-upload" className="camera-icon">📷</label>
//                 <input
//                     type="file"
//                     id="image-upload"
//                     style={{ display: 'none' }}
//                     onChange={handleImageUpload}
//                 />
//             </div>
//             {/* {(products1 && products1.length > 0) ?(
//             <div className="category-slider">
//             <div className="slider">
//                 {products1.map((product) => (
//                     <ProductCard
//                       key={product.product_id}
//                       product={product}
//                       onClick={() => handleProductClick(product)}
//                     />
//                   ))}
//               </div>
//             </div>
//         ):(
//             <p></p>
//         )

//         } */}
//             <div className="categories">
//                 {(!products1 || products1.length === 0) ? (
//                     // Display categories if products1 is not available or is empty
//                     ['Necklace', 'Earrings', 'Bracelets', 'Rings', 'Wristwatch'].map((category, index) => (
//                         <div key={index} className="category-slider">
//                             <h2>{category}</h2>
//                             <div className="slider">
//                                 {products
//                                     .filter((product) => product.product_sub1_type?.toLowerCase() === category.toLowerCase())
//                                     .map((product) => (
//                                         <ProductCard
//                                             key={product.product_id}
//                                             product={product}
//                                             onClick={() => handleProductClick(product)}
//                                         />
//                                     ))}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     // Display products1 if available
//                     <div className="category-slider">
//                         <div className="slider">
//                             {products1.map((product) => (
//                                 <ProductCard
//                                     key={product.product_id}
//                                     product={product}
//                                     onClick={() => handleProductClick(product)}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>

//         </div>
//     );
// };

// export default HomePage;

// {/* <ProductDetails product={selectedProduct} /> */ }


import React, { useContext ,useEffect,useState} from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import "../styles/Homepage.css";
const HomePage = () => {
    const {
        products,
        products1,
        searchTerm,
        setSearchTerm,
        handleSearch,
        handleImageUpload,
    } = useContext(ProductContext);

    const navigate = useNavigate();

    const handleProductClick = (product) => {
        navigate(`/productdetails`, { state: { product } });
    };
    const [showTooltip, setShowTooltip] = useState(true);

    // Hide tooltip after a short delay when the page loads
    useEffect(() => {
      const timer = setTimeout(() => setShowTooltip(false), 3000);
      return () => clearTimeout(timer);
    }, []);
    return (
        <div className="home-page">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for jewellery..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <label htmlFor="image-upload" className="camera-icon"><i className='mage--image-plus'></i></label>
                    <input
                        type="file"
                        id="image-upload"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                    {showTooltip && (
                        <div className="tooltip">
                            Upload here
                            <div className="diamond"></div>
                        </div>
                    )}
                </div>
            </div>

            <div className="categories">
                {(!products1 || products1.length === 0) ? (
                    ['Necklace', 'Earrings', 'Bracelets', 'Rings', 'Wristwatch'].map((category, index) => (
                        <div key={index} className="category-slider">
                            <h2>{category}</h2>
                            <div className="slider">
                                {products
                                    .filter((product) => product.product_sub1_type?.toLowerCase() === category.toLowerCase())
                                    .map((product) => (
                                        <ProductCard
                                            key={product.product_id}
                                            product={product}
                                            onClick={() => handleProductClick(product)}
                                        />
                                    ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="category-slider">
                        <div className="slider">
                            {products1.map((product) => (
                                <ProductCard
                                    key={product.product_id}
                                    product={product}
                                    onClick={() => handleProductClick(product)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
