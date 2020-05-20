const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
   cart: {
       type: Object,
       required: true
   },
   deliveryDetails: {
       type: Object,
       required: true
   },
    date: {
       type: Date,
       default: Date.now
    }
});

module.exports = mongoose.model("Order", OrderSchema);