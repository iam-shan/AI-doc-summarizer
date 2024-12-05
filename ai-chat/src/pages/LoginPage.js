import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      //const response = await fetch('http://localhost:8080/api/auth/login', {
        const response = await fetch('https://hepngrwaqb.us-east-2.awsapprunner.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        navigate('/chat');
      }
      else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-fade-in">
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 gradient-text">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p>
            Don’t have an account?{' '}
            <button
                onClick={() => navigate('/register')}
                className="text-blue-500 hover:text-blue-700"
            >
              Register here
            </button>
            |
            <button onClick={() => navigate('/')} className="text-blue-500 hover:text-blue-700 mt-2">
              Home
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;