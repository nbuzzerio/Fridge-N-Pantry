require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/users');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

router.get('/me', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
    }
    catch(exception) {
        res.status(400).send('Invalid token.')
    }

    const user = await (await User.findById(req.user._id).select('_id name email'));
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered to this email.')

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;