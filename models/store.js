const Joi = require('joi');
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
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
    isleLocation: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255,
    }
});

const Store = mongoose.model("Store", storeSchema);

function validateStore(store) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(100).required(),
        location: Joi.string().min(5).max(100).required(),
        isleLocation: Joi.number().min(0).max(255).required(),
    });
    return schema.validate(store);
}

function validateStoreName(store) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(100).required(),
        location: Joi.string().min(5).max(100).required(),
    });
    return schema.validate(store);
}

exports.Store = Store;
exports.storeSchema = storeSchema;
exports.validateStore = validateStore;
exports.validateStoreName = validateStoreName;