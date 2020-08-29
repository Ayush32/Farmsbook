/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

router.get("/profile", passport.checkAuthentication, userController.profile);
router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);
router.post("/create", userController.create);
router.get("/sign-out", userController.destroySession);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "users/sign-in" }),
  userController.createSession
);

module.exports = router;
