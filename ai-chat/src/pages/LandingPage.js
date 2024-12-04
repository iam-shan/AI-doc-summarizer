// LandingPage.js
import React from 'react';
import '../css/LandingPage.css';
import '../css/globals.css';
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Footer from "../components/Footer";

const LandingPage = () => {

  return (
      <div className="landing-page">
        <Header/>
        <Features/>
        <HowItWorks/>
        <Footer/>
      </div>
  );
};

export default LandingPage;
