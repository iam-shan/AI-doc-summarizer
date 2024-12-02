const express = require('express');
const fileController = require('../controllers/fileController');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/',upload.single('file'), fileController.uploadFile);

module.exports = router;
