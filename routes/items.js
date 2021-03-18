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
    if (store) {
        const { error } = validateStore(store);
        if (error) return res.status(400).send(error.details[0].message);

        store.name_Location = store.name.toLowerCase() + '_' + store.location.toLowerCase();
    }

    const { error } = validateItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let item = await Item.findOne({name: req.body.name});

    if (item) {
        const registeredLoc = item.itemLocation.find(location => { return location.name_Location === store.name_Location});

        if (registeredLoc) return res.status(400).send('Item is already registered to at that store');

        item.itemLocation.push(store);
        await item.save()

    } else {
        item = new Item({
            name: req.body.name,
            itemLocation: []
        });
        if (store) item.itemLocation.push(store);
        await item.save()
    }

    res.send(item)
});

router.put('/:id', (req, res) => {
    res.send('This is the Items endpoint');
});

router.delete('/:id', (req, res) => {
    res.send('This is the Items endpoint');
});

module.exports = router;