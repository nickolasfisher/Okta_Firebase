var express = require("express");
var router = express.Router();

const {
  APP_BASEURL
} = process.env;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { loggedIn: req.isAuthenticated(), appBaseUrl: APP_BASEURL });
});

module.exports = router;
