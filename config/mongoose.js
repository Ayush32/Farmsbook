/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/farmsocial_dev");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to the database :: MongoDB");
});

module.exports = db;
