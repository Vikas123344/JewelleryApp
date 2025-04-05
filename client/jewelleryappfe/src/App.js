import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import ProductDetails from './components/ProductDetails';
import { ProductProvider } from './context/ProductContext.js';
const App = () => {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/productdetails" element={<ProductDetails />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;
