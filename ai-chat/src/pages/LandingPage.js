// LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LandingPage.css';
import '../css/globals.css';
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Footer from "../components/Footer";
import InfiniteScrollSection from "../components/InfiniteScrollSection";

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
          <Header/>
        <Features/>
        <HowItWorks/>
        {/*<InfiniteScrollSection/>*/}
        <Footer/>
      </div>
  );
};

export default LandingPage;
