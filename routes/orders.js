const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Order = require('../models/Order');

router.get('/',auth, async (req, res) => {
    try{
        const order = await Order.find({user: req.user.id}).sort({date: -1});
        res.json(order);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
});

router.post('/', auth, async (req, res) => {
    const { cart, deliveryDetails } = req.body;
    try {
        const newOrder = new Order({
            cart: cart,
            deliveryDetails: deliveryDetails,
            user: req.user.id
        });
        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
    }
});

module.exports = router;