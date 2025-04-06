import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Visual Search for Jewellery</h1>
        <p className="description">
          An AI-powered platform that helps you find your favorite jewellery by
          uploading an image or typing your query.
        </p>
        <button onClick={() => navigate('/home')} className="explore-btn">
          Explore Now
        </button>
      </div>
      <div className="background-decoration">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
      </div>
    </div>
  );
};

export default LandingPage;