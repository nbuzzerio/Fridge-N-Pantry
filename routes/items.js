const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Item, validateItem } = require("../models/item");
const { validateStore } = require("../models/store");

router.get('/:store', (req, res) => {
    res.send('These are all the items at a store');
});

router.get('/:id', (req, res) => {
    res.send('This is the Items endpoint');
});

router.post('/', async (req, res) => {
    const store = req.body.store;
    let name_Location;
    if (store) {
        const { error } = validateStore(store);
        if (error) return res.status(400).send(error.details[0].message);

        name_Location = store.name.toLowerCase() + '_' + store.location.toLowerCase();
    }

    const { error } = validateItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let item = await Item.findOne({name: req.body.name});
    if (item) {
        if (item.itemLocations.get(name_Location)) return res.status(400).send('Item is already registered to at that store');

        item.itemLocations.set(name_Location, store);
        await item.save()

    } else {
        item = new Item({
            name: req.body.name,
            itemLocations: {}
        });
        if (store) item.itemLocations.set(name_Location, store);
        await item.save()
    }

    res.send(item)
});

router.put('/:itemId/:storeName', (req, res) => {
    res.send('This is the Items endpoint');
});

router.delete('/:itemId/:storeName', (req, res) => {
    res.send('This is the Items endpoint');
});

module.exports = router;