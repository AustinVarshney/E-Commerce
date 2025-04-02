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


//models
const userRegisterInfo = require("./models/auth");

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
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);


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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/auth/google/callback",
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            console.log("Google Profile:", profile);
            return done(null, profile);
        } catch (error) {
            return done(error, null);
        }
    }));


passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})


app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['profile', 'email']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        if (!req.user) {
            return res.redirect('/login'); // Redirect if authentication failed
        }

        const token = jwt.sign({ email: req.user.emails[0].value }, "e-commerce", { expiresIn: "0.5h" });

        // Set token in cookies (if needed) and redirect to frontend with token
        res.cookie("token", token, { httpOnly: true });
        res.redirect(`http://localhost:5173/oauth-success?token=${token}&username=${req.user.displayName}`);
    }
);



app.get("/logout", (req, res) => {
    req.logOut(() => {
        res.redirect('/');
    });
})

app.post('/register', async (req, res) => {
    try {
        const { username, email, password, mobile_number } = req.body;
        console.log(username, email, password, mobile_number)
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
            username, email, password: hashedPassword, mobile_number
        })

        console.log(newUser);
        await newUser.save();

        const token = jwt.sign({ email: newUser.email }, "e-commerce", { expiresIn: "0.5h" })

        res.cookie("token", token, { httpOnly: true });
        console.log("cookie sent : ", token);
        res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

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

        const token = jwt.sign({ email: user.email }, "rupesh", { expiresIn: '0.5h' });

        console.log("Login Successful for user : ", email);

        res.status(200).json({ message: "Login successful", token, user: { username: user.username, email: user.email } });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
})

app.get("/auth/forgotPassword", (req, res) => {
    res.send("Done");
})



const PORT = 5001;
app.listen(PORT, () => {
    console.log("Server is listening port 5001");
})