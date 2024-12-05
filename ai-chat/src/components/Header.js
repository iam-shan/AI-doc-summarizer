import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-20">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Sum-It-AI
        <br></br>
        <br></br>
        Revolutionize Your PDF Workflow
      </h1>
      <p className="mt-4 text-xl">
        Summarize and Chat with AI in Seconds
      </p>
      <button
        className="mt-6 bg-white text-blue-600 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition"
        onClick={() => navigate('/login')}
      >
        Get Started
      </button>
    </header>
  );
};

export default Header;