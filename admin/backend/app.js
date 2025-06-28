const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")

const addProduct = require("./models/addProduct")

const MONGO_URL = "mongodb://localhost:27017/admin-Panel"
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Admin Panel DB Connected");
    })
    .catch((err) => {
        console.log("Err in connecting : ", err);
    })

const corsOptions = {
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};
app.use(cors(corsOptions))
app.use(express.json())

app.post("/addProduct", async (req, res) => {
    try {
        const { productName, productImage, productPrice, productDiscount, productInitialStock, productCategory, productDescription } = req.body;

        const newProduct = new addProduct({
            productName, productCategory, productDiscount, productImage, productInitialStock, productPrice, productDescription
        })

        console.log("New Product Added");
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
        console.error("Error during product saved in DB:", err.message);
        res.status(500).json({ error: err.message });
    }
})

const PORT = 5002;
app.listen(PORT, () => {
    console.log("Server is listening port 5002");
})