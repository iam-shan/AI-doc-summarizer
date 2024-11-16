// LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleTryNow = () => {
    navigate('/chat'); // Navigate to the ChatApp
  };

  return (
    <div className="landing-page">
      <h1>Welcome to the PDF Chat Application</h1>
      <p>Chat with your PDF files and extract valuable insights!</p>
      <button className="try-now-button" onClick={handleTryNow}>
        Try Now
      </button>
    </div>
  );
};

export default LandingPage;
