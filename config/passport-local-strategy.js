/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //   find a user and establish the identify
      User.findOne(
        {
          email: email,
        },
        function (err, user) {
          if (err) {
            req.flash("error", err);
            console.log("Error in finding the user ---> Passport");
            return done(err);
          }

          if (!user || user.password != password) {
            req.flash("error", "Invalid Username/Password");
            console.log("invalid username/Password");
            return done(null, false);
          }

          return done(null, user);
        }
      );
    }
  )
);

// serializing the user to decide which is to be kept in the cookies

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user from the key in the cookies

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding the user ---> Passport");
      return done(err);
    }
    return done(null, user);
  });
});

// check if the user is authenticated

passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  // if the user is not signed in

  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
