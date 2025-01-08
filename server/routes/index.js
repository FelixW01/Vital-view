const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.render('index');
});

// About page
router.get('/about', (req, res) => {
    res.render('about');
});

// Chart/app page
router.get('/chart', (req, res) => {
    res.render('chart');
})

// Wild Card for 404 page
router.get('/*', (req, res) => {
    res.render('404')
});

module.exports = router;