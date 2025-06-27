const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: String, // do this in future
    userEmail: String,
    items: [
        {
            productId: String,
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount: Number,
    status: {
        type: String,
        default: "processing"
    },
    paymentId: String,
    razorpayOrderId: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", OrderSchema);
