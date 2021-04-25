const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require("mongoose");
const { itemSchema } = require("./item");
const { storeSchema } = require("./store");

const membersSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

const listItemSchema = new mongoose.Schema({
  itemSchema,
  quantiy: {
    type: Number,
    required: true,
    default: 1,
    minlength: 1,
    maxlength: 255,
  },
});

const householdSchema = new mongoose.Schema({
  household: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 50,
  },
  members: {
    type: [membersSchema],
    required: true,
  },
  stores: {
    type: [storeSchema],
    required: true,
  },
  list: {
    type: [listItemSchema],
    required: true,
  },
  pastItems: {
    type: [itemSchema],
    required: true,
  },
});

const Household = mongoose.model("Household", householdSchema);

function validateHousehold(household) {
  const schema = Joi.object({
    household: Joi.string().min(5).max(50).required(),
    members: Joi.object({
      memberId: Joi.objectId().required(),
      isAdmin: Joi.boolean().required()
    })
  });
  return schema.validate(household);
}

exports.householdSchema = householdSchema;
exports.Household = Household;
exports.validateHousehold = validateHousehold;
