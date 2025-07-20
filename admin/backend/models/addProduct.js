const mongoose = require("mongoose");

const addProductSchema = new mongoose.Schema({
    productName: { type: String, require: true },
    pImageUrl: { type: String, require: true },
    productPrice: { type: Number, require: true },
    productDiscount: { type: Number, require: true },
    productInitialStock: { type: Number, require: true },
    productCategory: { type: String, require: true },
    productDescription: { type: String, require: true },
    productRating: { type: Number },
    productNumberOfRatings: { type: Number },
})

module.exports = mongoose.model('AddProduct', addProductSchema)