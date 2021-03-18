const mongoose = require('mongoose');
const Joi = require('joi');
const { storeSchema } = require('./store');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    itemLocation: {
        type: [storeSchema],
    }
});

const Item = mongoose.model('Item', itemSchema);

function validateItem(item) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        itemLocation: Joi.array()
    });
    return schema.validate(item);
}

exports.itemSchema = itemSchema;
exports.Item = Item;
exports.validateItem = validateItem;  