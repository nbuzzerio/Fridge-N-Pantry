const mongoose = require('mongoose');
const Joi = require('joi');
const { storeSchema } = require('./store');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true,
        sparse:true
    },
    itemLocations: {
        type: Map,
        of: storeSchema
    }
});

const Item = mongoose.model('Item', itemSchema);

function validateItem(item) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        store: Joi.object().optional()
    });
    return schema.validate(item);
}

exports.itemSchema = itemSchema;
exports.Item = Item;
exports.validateItem = validateItem;  