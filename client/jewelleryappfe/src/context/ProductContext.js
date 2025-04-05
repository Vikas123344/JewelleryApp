import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const bdurl=process.env.REACT_APP_BE_URL; 
  useEffect(() => {
    fetch(`${bdurl}/api1/category`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = () => {
    fetch(`${bdurl}/api1/search?query=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error searching products:', error));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const classifyResponse = await fetch(`${bdurl}/api/classify`, {
        method: 'POST',
        body: formData,
      });

      const classificationData = await classifyResponse.json();
      const topPredictions = classificationData
        .sort((a, b) => b.score - a.score)
        .slice(0, 2)
        .map((item) => item.class);

      const searchPromises = topPredictions.map((term) =>
        fetch(`${bdurl}/api1/search?query=${term}`).then((res) => res.json())
      );

      const searchResults = await Promise.all(searchPromises);
      setProducts1(searchResults.flat());
    } catch (error) {
      console.error('Error processing image or fetching products:', error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        products1,
        searchTerm,
        setSearchTerm,
        handleSearch,
        handleImageUpload,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
