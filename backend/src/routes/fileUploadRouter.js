const express = require('express');
const fileController = require('../controllers/fileController');
const router = express.Router();
const upload = require('../middlewares/upload');
const saveFileHandler = require('../handlers/saveFileHandler');
const cors = require('cors');

// Apply the same CORS config to the router
const corsOptions = {
  origin: [
    'https://main.d19opk0v2645vf.amplifyapp.com',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

router.post('/', cors(corsOptions), upload.single('file'), fileController.uploadFile);
router.get('/save', cors(corsOptions), saveFileHandler.retriveFile);

module.exports = router;