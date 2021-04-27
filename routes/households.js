const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middleware/asnycHandler');
const { User} = require('../models/users');
const { Household, validateHousehold, validateHouseholdObjectId } = require('../models/household');
const { Item, validateItem } = require("../models/item");
const { Store, validateStore, validateStoreName } = require("../models/store");
const _ = require('lodash');
const auth = require('../middleware/auth');
const checkValidHousehold = require('../middleware/checkValidHousehold');

const hideUserData = async (household) => {
    let householdData = _.pick(household, ['household', 'members', 'stores', 'list', 'pastItems']);
    const memberNames = await Promise.all(
        householdData.members.map(async (member) => {
            const memberName = await User.findById(member.memberId).select('name -_id');
            return memberName.name;
        })
    )
    householdData.members = memberNames;
    return householdData;
}

router.get('/', auth, asyncMiddleware( async (req, res) => {
    const userId = await User.findById(req.user._id).select('_id');
    if (!userId) return res.status(400).send('User is invalid.')

    const { error } = validateHouseholdObjectId(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let household = await Household.findOne({_id: req.body.household_id});
    if (!household) return res.status(400).send('Household does not exist.');
    
    const householdData = await hideUserData(household);

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

router.put('/member', auth, checkValidHousehold, asyncMiddleware( async (req, res) => {
    const member = {
        memberId: req.user._id,
        isAdmin: true
    };
    const household = req.household;
    if (!household.members.find(member => member.memberId.toString() === req.user._id.toString())) {
        household.members.push(member);
        await household.save();
    }
    const householdData = await hideUserData(household);
    res.send(_.pick(householdData, ['household', 'members', 'stores', 'list', 'pastItems']));
}));

router.delete('/member', auth, checkValidHousehold, asyncMiddleware( async (req, res) => {
    const member = {
        memberId: req.user._id,
        isAdmin: true
    };
    const household = req.household;
    household.members = household.members.filter(memeber => memeber.memberId.toString() !== req.user._id);
    await household.save();
    res.send("Successfully left the household.");
}));

router.put('/stores', auth, checkValidHousehold, asyncMiddleware( async (req, res) => {
    const household = req.household;

    if (!household.members.find(member => member.memberId.toString() === req.user._id.toString())) {
        res.status(400).send('User is not a member of this Household');
    }
    
    
    const store = req.body.store;
    const { error: storeError } = validateStoreName(store);
    if (storeError) return res.status(400).send(storeError.details[0].message);
    const name_Location = store.name.toLowerCase() + '_' + store.location.toLowerCase();

    if (household.stores.find(store => store === name_Location)) {
        return res.status(400).send('Store is already registered to this Household');
    }
    
    household.stores.push(name_Location);
    await household.save();

    res.send(_.pick(household, ['stores']));
}));

router.delete('/stores', auth, checkValidHousehold, asyncMiddleware( async (req, res) => {
    const household = req.household;

    if (!household.members.find(member => member.memberId.toString() === req.user._id.toString())) {
        return res.status(400).send('User is not a member of this Household');
    }

    const store = req.body.store;
    const { error: storeError } = validateStoreName(store);
    if (storeError) return res.status(400).send(storeError.details[0].message);
    const name_Location = store.name.toLowerCase() + '_' + store.location.toLowerCase();
    household.stores = household.stores.filter(store => store !== name_Location);
    await household.save();

    res.send(_.pick(household, ['stores']));
}));

module.exports = router;