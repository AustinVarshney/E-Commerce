const passport = require("passport");
const AmazonStrategy = require('passport-amazon').Strategy;

passport.use(new AmazonStrategy({
    clientID: AMAZON_CLIENT_ID,
    clientSecret: AMAZON_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/auth/amazon/callback"
},
    function (accessToken, refreshToken, profile, done) {
        return done(err, user);
    }
));