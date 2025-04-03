const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    mobile_number: { type: String }
});

module.exports = mongoose.model("GoogleUser", googleUserSchema);
