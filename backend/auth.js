const passport = require('passport')

let GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/auth/google/callback",
    passReqToCallback: true
},
    function (accessToken, refreshToken, profile, cb) {
        console.log("Google Profile : ", profile)
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        // return cb(err, user);
        // });
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})