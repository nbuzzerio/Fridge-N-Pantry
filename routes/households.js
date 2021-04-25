const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middleware/asnycHandler');
const { User} = require('../models/users');
const { Household, validateHousehold } = require('../models/household');
const _ = require('lodash');
const auth = require('../middleware/auth');

router.get('/', auth, asyncMiddleware( async (req, res) => {
    const userId = await User.findById(req.user._id).select('_id');
    if (!userId) return res.status(400).send('User is invalid.')

    let household = await Household.findOne({household: req.body.household});
    if (!household) return res.status(400).send('Household does not exist.');
    
    let householdData = _.pick(household, ['household', 'members', 'stores', 'list', 'pastItems']);
    
    const memberNames = await Promise.all(
        householdData.members.map(async (member) => {
            const memberName = await User.findById(member.memberId).select('name -_id');
            return memberName.name
        })
    )
    householdData.members = memberNames;

    res.send(_.pick(householdData, ['household', 'members', 'stores', 'list', 'pastItems'])); 
}));

router.post('/', auth, asyncMiddleware( async (req, res) => {
    const member = {
        memberId: req.user._id,
        isAdmin: true
    };
    const { error } = validateHousehold(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const householdData =  req.body;
    householdData.members = [member];
    householdData.stores = [];
    householdData.list = [];
    householdData.pastItems = [];
    let household = await Household.findOne({household: householdData.household});
    if (household) return res.status(400).send('Household name already registered.');
    
    household = new Household(_.pick(householdData, ['household', 'members', 'stores', 'list', 'pastItems']));
    await household.save();
    
    res.send(_.pick(household, ['household', 'members', 'stores', 'list', 'pastItems']));
}));

module.exports = router;