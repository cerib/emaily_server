const passport = require("passport");
const keys = require("../config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) {
    console.error(e);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userFromDB = await User.findOne({ googleId: profile.id });
        if (userFromDB) {
          done(null, userFromDB);
        } else {
          //new user!
          const newUser = await new User({ googleId: profile.id }).save();
          done(null, newUser);
        }
      } catch (e) {
        console.error(e);
      }
    }
  )
);
