const express = require('express');
const router = express.Router();
const { registerUser, getUsers, loginUser, getMe } = require('../controllers/userController');
const auth = require('../middleware/auth');

// Register route for user
router.get('/users', getUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', auth, getMe);

module.exports = router;