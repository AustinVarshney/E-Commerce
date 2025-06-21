const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    items: [
        {
            _id: String,
            name: String,
            price: Number,
            quantity: Number,
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);
