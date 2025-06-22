const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    items: [
        {
            _id: { type: String },
            name: String,
            price: Number,
            discount: Number,
            rating: Number,
            image: String,
            reviews: Number,
            link: String,
        }
    ]
});

module.exports = mongoose.model('WishList', wishListSchema);
