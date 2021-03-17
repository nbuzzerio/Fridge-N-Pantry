const Joi = require('joi');
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    store: {
        name: {
            type: String,
            minlength: 5,
            maxlength: 100,
            required: true
        },
        location: {
            type: String,
            minlength: 5,
            maxlength: 100,
            required: true
        },
        nameAndLocation: {
            type: String,
            minlength: 10,
            maxlength: 255,
            required: true,
            unique: true
        },
        isleLocation: {
            type: Number,
            required: true,
            minlength: 0,
            maxlength: 255,
        }
    }
});

function validateStore(store) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(100).required,
        name: Joi.string().min(5).max(100).required,
        name: Joi.string().min(10).max(255).required,
        name: Joi.number().min(0).max(255).required,
    });
    return schema.validate(store);
}

exports.storeSchema = storeSchema;
exports.validateStore = validateStore;