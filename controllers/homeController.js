/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
module.exports.home = function (req, res) {
  return res.render("home", {
    titleName: "FarmSocial",
  });
};
