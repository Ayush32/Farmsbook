/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.home);
router.use("/users", require("./users"));

module.exports = router;
