const express = require('express');
const router = express.Router();
const { registerUser, getUsers } = require('../controllers/userController');

// Register route for user
router.get('/users', getUsers)
router.post('/register', registerUser);

module.exports = router;