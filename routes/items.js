const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const asyncMiddleware = require('../middleware/asnycHandler');
const { Item, validateItem } = require("../models/item");
const { validateStore } = require("../models/store");
const _ = require('lodash');
const { response } = require('express');

router.get('/:id', asyncMiddleware(async (req, res) => {

    const item = await Item.findOne({ _id: req.params.id });   
    if (!item) return res.status(400).send("Item does not exist");

    res.send(item);
}));

router.post('/', auth, asyncMiddleware(async (req, res) => {
    const store = req.body.store;
    let name_Location;
    if (store) {
        const { error } = validateStore(store);
        if (error) return res.status(400).send(error.details[0].message);

        name_Location = store.name.toLowerCase() + '_' + store.location.toLowerCase();
    }

    const { error } = validateItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let item = await Item.findOne({name: req.body.name.toLowerCase()});
    if (item) {
        if (item.itemLocations.get(name_Location)) return res.status(400).send('Item is already registered to at that store.');

        item.itemLocations.set(name_Location, store);
        await item.save()

        return res.send(item);
    }

    item = new Item({
        name: req.body.name.toLowerCase(),
        itemLocations: {}
    });
    if (store) item.itemLocations.set(name_Location, store);
    await item.save();

    res.send(item);
}));

router.put('/:id/:storeName/:isleNumber', auth, asyncMiddleware(async (req, res) => {
    const { id, storeName, isleNumber} = req.params;
    const item = await Item.findOne({ _id: id });
    const store = item.itemLocations.get(storeName)._doc;
    if (!item || !store) return res.status(400).send("Either item or store does not exist.");

    store.isleLocation = isleNumber;
    item.itemLocations.set(storeName, store);
    const {error} = validateStore(_.pick(store, ['name', 'location', 'isleLocation']));
    console.log(store)
    if (error) return res.status(400).send(error.details[0].message);

    await item.save();

    res.send(item);
}));

module.exports = router;