const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    mobile_number: { type: String, required: false }
});

module.exports = mongoose.model("GoogleUser", googleUserSchema);
