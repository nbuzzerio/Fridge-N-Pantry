require('dotenv').config();
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    }
});

usersSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.jwtPrivateKey);
    return token;
}

const User = mongoose.model('User', usersSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(1024).required()
    })
    return schema.validate(user)
}

exports.User = User;
exports.validateUser = validateUser;