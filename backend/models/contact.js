const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please use a valid email address",
            ],
        },

        // mobile: {
        //     type: String,
        //     required: [true, "Mobile number is required"],
        //     match: [
        //         /^\d{10}$/,
        //         "Please enter a valid 10-digit phone number",
        //     ],
        // },

        category: {
            type: String,
            default: "General",
        },

        subject: {
            type: String,
            default: "",
        },

        message: {
            type: String,
            required: [true, "Message is required"],
        },
    },
    {
        timestamps: true,
    }
);

const ContactForm = mongoose.model("ContactForm", contactFormSchema);

module.exports = ContactForm;
