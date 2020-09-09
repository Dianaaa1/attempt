const passport = require('passport');
const User = require("./models/users")
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.initialize();
passport.use(User.createStrategy());

const jwtsecret = "mysecretkey";
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtsecret
};

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
    console.log("payload received", payload)
    User.findOne({ username: payload.username }, (err, user) => {
        if (err) {
            return done(err)
        }
        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
})
);