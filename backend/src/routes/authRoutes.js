const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;