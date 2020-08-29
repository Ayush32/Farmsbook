/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const User = require("../models/user");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        return res.render("user_profile", {
          titleName: "User Profile",
          user: user,
        });
      }
      return res.redirect("/users/sign-in");
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    titleName: "FarmSocial | Sign Up",
  });
};
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    titleName: "FarmSocial | Sign In",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in finding user in signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// module.exports.createSession = function (req, res) {
//   // steps to authenticate

//   // find the user
//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       console.log("error in finding user in signing in");
//       return;
//     }
//     // handle the user found

//     if (user) {
//       // handles password which don't match

//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       }

//       res.cookie("user_id", user.id);
//       return res.redirect("/users/profile");
//     } else {
//       // handle user not found

//       return res.redirect("back");
//     }
//   });
// };

module.exports.createSession = function (req, res) {
  // TODO

  return res.redirect("/users/profile");
};

module.exports.destroySession = function (req, res) {
  // TODO
  req.logout();
  return res.redirect("/");
};
