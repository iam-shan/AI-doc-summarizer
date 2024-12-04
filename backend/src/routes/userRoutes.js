const express = require('express');
const chatController = require('../controllers/chatController');
const userHandler = require('../handlers/users_management_handler');
const router = express.Router();
const cors = require('cors');

const corsOptions = {
  origin: [
    'https://main.d19opk0v2645vf.amplifyapp.com',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply cors to specific routes
router.post('/fetchSessions', cors(corsOptions), userHandler.getSessions);
router.post('/getChats', cors(corsOptions), userHandler.getChatsBasedOnSessionId);

// Add OPTIONS preflight support
router.options('/fetchSessions', cors(corsOptions));
router.options('/getChats', cors(corsOptions));

module.exports = router;