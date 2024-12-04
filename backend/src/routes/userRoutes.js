const express = require('express');
const chatController = require('../controllers/chatController');
const userHandler = require('../handlers/users_management_handler')
const router = express.Router();

router.post('/fetchSessions', userHandler.getSessions); // Chat with file
router.post('/getChats', userHandler.getChatsBasedOnSessionId)
module.exports = router;
