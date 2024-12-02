const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

router.post('/', chatController.chatWithFile); // Chat with file
router.get('/:fileId/history', chatController.getChatHistory); // Fetch chat history

module.exports = router;
