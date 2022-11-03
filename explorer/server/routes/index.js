var express = require("express");
var router = express.Router();

const Transaction = require("../models/Transaction");

router.get("/", function (req, res) {
  res.status(200).send("welcome");
});

module.exports = router;