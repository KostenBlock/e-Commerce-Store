const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Item = require('../models/Item');

// @route   GET api/items
// @desc    Get all items
router.get('/', async (req, res) => {
    try{
        const items = await Item.find().sort({date: -1});
        res.json(items);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/items/category/:name
// @desc    Get items by category
router.get('/category/:name', async (req, res) => {
    try{
        const items = await Item.find({category_eng: req.params.name}).sort({date: -1});
        res.json(items);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/items/product/:id
// @desc    Get single item
router.get('/product/:id', async (req, res) => {
    try{
        const item = await Item.findById(req.params.id);
        if (!item) res.status(404).json('Item not found');
        res.json(item);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/items
// @desc    Add new item
// @access  Private
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('urlImg', 'Url of Image is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const {name, category, urlImg, price, description} = req.body;

    try {
        const newItem = new Item({
            name: name,
            category: category,
            urlImg: urlImg,
            price: price,
            description: description
        });

        const item = await newItem.save();

        res.json(item);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/items/:id
// @desc    Update contact
// @access  Private
router.put('/:id', async (req, res) => {
    const { name, category, urlImg, price } = req.body;

    // build a contact object
    const itemFields = {};
    if (name) itemFields.name = name;
    if (category) itemFields.category = category;
    if (urlImg) itemFields.urlImg = urlImg;
    if (price) itemFields.price = price;

    try {
        let item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ msg: 'Item not found' });

        console.log(itemFields);

        // if we make it here, then update the contact
        item = await Item.findByIdAndUpdate(
            req.params.id,
            { $set: itemFields },
            { new: true }
        );
        res.json(item);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/items/:id
// @desc    Delete item
// @access  Private
router.delete('/:id', async (req, res) => {
    try{
        let item = await Item.findById(req.params.id);
        if (!item) res.status(404).json('Item not found');

        await Item.findOneAndDelete(req.params.id);
        res.json({msg: 'Item deleted'});
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
});

module.exports = router;