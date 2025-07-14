require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const multer = require('multer')
const path = require('path');
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
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
    origin: ["http://localhost:5174", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};
app.use(cors(corsOptions))
app.use(express.json())

cloudinary.config({
    cloud_name: 'dc05gja7y',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',
        allowedFormats: ['jpg', 'png'],
        transformation: [{ width: 800, height: 800, crop: "limit" }],
    },
});

const upload = multer({ storage });
// const upload = multer({ 
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//     fileFilter: (req, file, cb) => {
//         const allowedTypes = /jpeg|jpg|png/;
//         const ext = path.extname(file.originalname).toLowerCase();
//         if (allowedTypes.test(ext)) cb(null, true);
//         else cb(new Error("Only images are allowed"));
//     }
// });

// // Storage config
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Create this folder if not exists
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     }
// });

app.use('/uploads', express.static('uploads'));

app.post('/upload-image', upload.single('productImage'), (req, res) => {
    try {
        if (!req.file) {
            console.error("❌ No file uploaded");
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log("✅ Cloudinary Upload Result:", req.file);
        const pImageUrl = req.file.path;
        return res.status(200).json({ pImageUrl });
    } catch (error) {
        console.error("🔥 Upload Error:", error);
        return res.status(500).json({ error: error.message });
    }
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
        const { productName, pImage, productPrice, productDiscount, productInitialStock, productCategory, productDescription, pImageUrl, productRating, productNumberOfRatings } = req.body;

        const newProduct = new addProduct({
            productName,
            productCategory,
            productDiscount,
            productInitialStock,
            productPrice,
            productDescription,
            pImageUrl,
            productRating: 1,
            productNumberOfRatings: 1
        });

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

app.get('/products/product-details/:id', async (req, res) => {
    const { id } = req.params;

    // Check for valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid product ID format' });
    }

    try {
        const product = await addProduct.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: 'Server Error' });
    }
});


app.use((err, req, res, next) => {
    console.error("🔥 Global Error Handler:", err.stack || err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
});

const PORT = 5002;
app.listen(PORT, () => {
    console.log("Server is listening port 5002");
})