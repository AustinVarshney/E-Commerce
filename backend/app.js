require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const googleOAuth = require("./authentications/google");
const GoogleUser = require("./models/googleOAuth")
const { sendOtpEmail } = require('./utils/mailer');


//models
const userRegisterInfo = require("./models/auth");
const contactUsForm = require("./models/contact")
const Cart = require("./models/cart")

const MONGO_URL = "mongodb://localhost:27017/e-commerce";
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("E-commerce db connected");
    })

    .catch((err) => {
        console.log("Err in connecting : ", err);
    })

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}
// console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
// console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);

app.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['profile', 'email']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        if (!req.user) {
            return res.redirect('/login');
        }

        try {
            const email = req.user.emails[0].value;
            const username = req.user.displayName;

            let user = await userRegisterInfo.findOne({ email });

            if (!user) {
                const randomPassword = Math.random().toString(36).slice(-8);
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(randomPassword, salt);

                user = new userRegisterInfo({
                    username,
                    email,
                    password: hashedPassword,
                    mobile_number: "0000000000",
                });

                await user.save();
                console.log("New Google User Saved:", user);
            }
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "0.5h" });

            res.cookie("token", token, { httpOnly: true });
            res.redirect(`http://localhost:5173/oauth-success?token=${token}&username=${user.username}&email=${user.email}`);

        } catch (error) {
            console.error("Error during Google OAuth:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

// app.get("/auth/amazon", (req, res) => {
//     passport.authenticate('amazon');
// })

// app.get("/auth/amazon/callback",
//     passport.authenticate('amazon', { failureRedirect: '/' }),
//     function (req, res) {
//         res.redirect('/success');
//     })

// app.get("/success", (req, res) => {
//     res.send("AMAZON Success");
// })

app.post('/register', async (req, res) => {
    try {
        const { username, email, password, mobile_number } = req.body;
        console.log("Register request received with:");
        console.log({ username, email, password, mobile_number });

        if (!username || !email || !password || !mobile_number) {
            return res.status(400).json({ message: "All Fields are mandatory" });
        }

        const existingUser = await userRegisterInfo.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userRegisterInfo({
            username,
            email,
            password: hashedPassword,
            mobile_number
        });

        console.log("User being saved:", newUser);
        await newUser.save();

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '0.5h' });

        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userRegisterInfo.findOne({ email });
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '0.5h' });
        console.log("Login Successful for user : ", email);

        res.status(200).json({ message: "Login successful", token, user: { username: user.username, email: user.email } });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
})


const otpStore = new Map();

app.post('/auth/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit

    try {
        await sendOtpEmail(email, otp);
        otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 }); // 5 minutes
        res.json({ message: 'OTP sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});

app.post('/auth/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const record = otpStore.get(email);

    if (!record) return res.status(400).json({ message: 'OTP expired or not requested' });

    if (record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    if (Date.now() > record.expires) {
        otpStore.delete(email);
        return res.status(400).json({ message: 'OTP expired' });
    }

    otpStore.delete(email); // remove after verification
    res.json({ message: 'OTP verified' });
});

app.patch('/auth/forgotPassword', async (req, res) => {
    try {
        let { email, confirmNewPassword } = req.body;
        let user = await userRegisterInfo.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No User Found" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(confirmNewPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error updating password: " + error.message });
    }
})

// Middleware for token verification
const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

app.get('/cart/:email', verifyToken, async (req, res) => {
    console.log("GET /cart hit with:", req.params.email);
    try {
        const cart = await Cart.findOne({ email: req.params.email });
        console.log("Cart found:", cart);
        res.json(cart ? cart.items : []);
    } catch (err) {
        console.log("Error fetching cart:", err);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
});

app.post('/cart', async (req, res) => {
    const { email, items } = req.body;
    console.log("POST /cart hit with:", req.body);
    try {
        const existingCart = await Cart.findOne({ email });

        if (existingCart) {
            existingCart.items = items;
            await existingCart.save();
        } else {
            const newCart = new Cart({ email, items });
            await newCart.save();
        }

        res.json({ message: 'Cart saved' });
    } catch (error) {
        console.error("Error saving cart:", error);
        res.status(500).json({ error: 'Failed to save cart' });
    }
});

app.delete('/cart/:email/:productId', verifyToken, async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { products: { id: productId } } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(updatedCart);
    } catch (err) {
        console.error('Error deleting product from cart:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


app.post('/contact', async (req, res) => {
    try {
        const { name, email, mobile, query } = req.body;
        const newContact = new contactUsForm({ name, email, mobile, query });
        await newContact.save();
        res.status(201).json({ message: 'Contact saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save contact' });
    }
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log("Server is listening port 5001");
})