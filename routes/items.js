const express = require('express');
const router = express.Router();
const multer = require("multer");
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');

cloudinary.config({
    cloud_name: "blockservices",
    api_key: 965751971587379,
    api_secret:"EpW5WYaHj-ReWRFAOuucatjBA1M"
});

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).single('file');

const Item = require('../models/Item');
const Categories = require('../models/Categories');

// @route   GET api/items
// @desc    Get all items
router.get('/', async (req, res) => {
    try{
        const items = await Item.find().sort({date: -1});
        const itemChunks = [];
        const chunkSize = 3;
        for (let i = 0; i < items.length; i += chunkSize) {
            itemChunks.push(items.slice(i, i + chunkSize));
        }
        res.json(itemChunks);

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

// @route   GET api/items/search/:query
// @desc    Get items by search
// Поиск public
router.get('/search/:query', async (req,res) => {
    try{
        const items = await Item.find({name: new RegExp(req.params.query)}).sort({date: -1});
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
router.post('/', auth, (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(404).json({msg: "Размер изображения слишком больщой, максимальный размер 5мб."});
        }
        const {name, category, category_eng, description, price} = req.body;

        if (!name || !category || !category_eng || !description || !price) {
            return res.status(404).json({msg: "Не все поля заполнены"});
        }
        if (!req.file) {
            return res.status(404).json({msg: "Изображение не выбрано"});
        }
        cloudinary.v2.uploader.upload(req.file.path).then(async function(data){
            const newItem = new Item({
                name: name.toLowerCase(),
                category: category.toLowerCase(),
                category_eng: category_eng.toLowerCase(),
                img: data.url,
                description: description,
                price: price,
            });
            // сохраняем данные
            await newItem.save((error)=>{
                if(error){
                    console.log('error',error)
                }
                else{
                    res.json(newItem);
                }
            });
        }).catch(function(error){
            console.log(error);
        });
    })
});

// @route   PUT api/items/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
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
router.delete('/:id', auth, async (req, res) => {
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

// @route   PUT api/items/categories
// @desc    get all categories
// @access  Private
router.get('/categories', auth, async (req, res) => {
    try{
        const categories = await Categories.find();
        res.json(categories);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Ошибка сервера');
    }
});

// @route   PUT api/items/categories
// @desc    post category
// @access  Private
router.post('/categories', auth, async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(404).json({msg: "Название категории не введено"});
        const newCategory = new Categories({
            name: name
        });
        const category = await newCategory.save();
        res.json(category);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;