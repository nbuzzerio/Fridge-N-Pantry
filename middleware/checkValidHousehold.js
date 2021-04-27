const mongoose = require('mongoose');
const { Household, validateHouseholdObjectId } = require('../models/household');

module.exports = async function (req, res, next) {
    const { error } = validateHouseholdObjectId(req.body.household);
    if (error) return res.status(400).send(error.details[0].message);
    
    const householdId =  mongoose.Types.ObjectId(req.body.household.household_id);

    req.household = await Household.findOne({_id: householdId});
    if (!req.household) return res.status(400).send('Household does not exist.'); 

    next();
}