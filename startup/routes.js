const express = require('express');
const auth = require('../routes/auth');
const users = require('../routes/users');
const items = require('../routes/items');
const households = require('../routes/households');
const error = require ('../middleware/error');


module.exports = function(app) {
    app.use(express.json());
    app.use('/api/households', households);
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use('/api/items', items);
    app.use(error);
}


