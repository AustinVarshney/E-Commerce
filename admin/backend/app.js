const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const multer = require('multer')
const path = require('path');

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

// Storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Create this folder if not exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));

app.post('/upload-image', upload.single('productImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    const pImageUrl = `http://localhost:5002/uploads/${req.file.filename}`;
    console.log("File uploaded:", req.file);

    res.status(200).json({ pImageUrl });
});

app.get("/products", async (req, res) => {
    try {
        const products = await addProduct.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

app.post("/addProduct", async (req, res) => {
    try {
        const { productName, productImage, productPrice, productDiscount, productInitialStock, productCategory, productDescription, pImageUrl } = req.body;

        const newProduct = new addProduct({
            productName, productCategory, productDiscount, productImage, productInitialStock, productPrice, productDescription, pImageUrl
        })

        console.log("New Product Added");
        console.log("Product received:", req.body);
        await newProduct.save();
        res.status(201).json({ newProduct });
    } catch (err) {
        console.error("Error during product saved in DB:", err.message);
        res.status(500).json({ error: err.message });
    }
})

app.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await addProduct.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (err) {
        console.error("Error deleting product:", err.message);
        res.status(500).json({ error: "Failed to delete product" });
    }
});

const PORT = 5002;
app.listen(PORT, () => {
    console.log("Server is listening port 5002");
})