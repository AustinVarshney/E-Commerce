const mongoose = require("mongoose");

const userRegisterSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        mobile_number: {
            type: String,
            required: true,
            match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
        }
    },
    { timestamps: true }
);

const UserRegisterInfo = mongoose.model("UserRegisterInfo", userRegisterSchema);
module.exports = UserRegisterInfo;
