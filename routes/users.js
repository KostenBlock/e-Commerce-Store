const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('name', 'Пожалуйста введите имя').not().isEmpty(),
    check('surname', 'Пожалуйста введите фамилию').not().isEmpty(),
    check('country', 'Пожалуйста введите страну').not().isEmpty(),
    check('city', 'Пожалуйста введите город').not().isEmpty(),
    check('address', 'Пожалуйста введите адрес').not().isEmpty(),
    check('zipcode', 'Пожалуйста введите почтовый индекс').not().isEmpty(),
    check('email', 'Введите корректный Email-адрес').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, country, city, address, zipcode, email, password } = req.body;

    try {
        let user = await User.findOne({email: email});

        if( user ) {
            return res.status(400).json({msg: 'Пользователь с таким Email-адресом уже существует'});
        }

        user = new User({
            name,
            surname,
            country,
            city,
            address,
            zipcode,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Ошибка сервера');
    }
});

// @route   POST api/users
// @desc    change settings
// @access  Private
router.put('/', auth, [
    check('name', 'Пожалуйста введите имя').not().isEmpty(),
    check('surname', 'Пожалуйста введите фамилию').not().isEmpty(),
    check('country', 'Пожалуйста введите страну').not().isEmpty(),
    check('city', 'Пожалуйста введите город').not().isEmpty(),
    check('address', 'Пожалуйста введите адрес').not().isEmpty(),
    check('zipcode', 'Пожалуйста введите почтовый индекс').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, country, city, address, zipcode } = req.body;

    const userFields = {};

    if (name) userFields.name = name;
    if (surname) userFields.surname = surname;
    if (country) userFields.country = country;
    if (city) userFields.city = city;
    if (address) userFields.address = address;
    if (zipcode) userFields.zipcode = zipcode;

    try {
        let user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({msg: "Такого пользователя нет"});

        user = await User.findByIdAndUpdate(
            req.user.id,
            {$set: userFields},
            {new: true}
        );

        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Ошибка сервера');
    }
});

// @route   GET api/users
// @desc    get all users
// @access  Private ADMIN
router.get("/", auth, async (req, res) => {
    try{
        let user = await User.findById(req.user.id);

        if (user.role !== "admin") return res.status(404).json({msg: "Доступ ограничен"});

        const users = await User.find({role: "Пользователь"}).sort({date: 1});
        res.json(users);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Ошибка сервера');
    }
});

// @route   GET api/users
// @desc    delete certain user
// @access  Private ADMIN
router.delete("/:id", auth, async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        let admin = await User.findById(req.user.id);
        console.log(req.user)
        if (!user) return res.status(404).json({msg: "Такого пользователя нет"});
        if (admin.role !== "admin") return res.status(404).json({msg: "Доступ ограничен"});

        await User.findByIdAndDelete(req.params.id);
        res.json({msg: "Пользователь удален"});
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;