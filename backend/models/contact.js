const mongoose = require("mongoose")

const contactFormSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        },

        mob_no: {
            type: Number,
            required: true,
            match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
        },

        query: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const contactForm = mongoose.model("ContactForm", contactFormSchema);
module.exports = contactForm;