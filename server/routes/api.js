const express = require('express');
const router = express.Router();
const { registerUser, getUsers, loginUser } = require('../controllers/userController');

// Register route for user
router.get('/users', getUsers)
router.post('/login', loginUser)
router.post('/register', registerUser);

module.exports = router;