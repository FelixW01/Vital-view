const express = require('express');
const router = express.Router();
const { registerUser, getUsers, loginUser, getMe } = require('../controllers/userController');
const { storeSugar, getSugar } = require('../controllers/sugarController');
const { storeRecipe, getRecipe, deleteRecipe } = require('../controllers/recipeController');
const auth = require('../middleware/auth');

// API routes for user
router.get('/users', getUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', auth, getMe);

// API routes for sugar
router.post('/sugar', auth, storeSugar);
router.get('/getSugar', auth, getSugar);

// API for recipes
router.post('/recipe', auth, storeRecipe);
router.get('/getRecipe', auth, getRecipe);
router.delete('/deleteRecipe', auth, deleteRecipe);

module.exports = router;