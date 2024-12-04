const express = require('express');
const fileController = require('../controllers/fileController');
const router = express.Router();
const upload = require('../middlewares/upload');
const saveFileHandler = require('../handlers/saveFileHandler');

router.post('/', upload.single('file'), fileController.uploadFile);
router.get('/save', saveFileHandler.retriveFile);

module.exports = router;