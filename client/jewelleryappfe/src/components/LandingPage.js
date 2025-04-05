import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Welcome to Visual Search for Jewellery</h1>
      <p>
        An AI-powered platform that helps you find your favorite jewellery by
        uploading an image or typing your query.
      </p>
      <button onClick={() => navigate('/home')} className="btn">Explore Now</button>
    </div>
  );
};

export default LandingPage;
