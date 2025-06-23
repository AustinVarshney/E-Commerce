const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GoogleUser = require("../models/googleOAuth");

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID); // 🐛 Check if undefined

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production'
        ? process.env.GOOGLE_CALLBACK_URL
        : process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: false
}, async (req, accessToken, refreshToken, profile, done) => {
    console.log("Google Profile:", profile);  // Debug log
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