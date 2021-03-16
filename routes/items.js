const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is the Items endpoint');
});

module.exports = router;