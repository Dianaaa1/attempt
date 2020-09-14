const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../models/users");
const Projects = require("../models/projects");

router.post(
  "/create",
  function (req, res) {
    User.findOne({ username: req.body.username }, (err, user) => {
      const id = user._id;
      let project = new Projects({ name: req.body.name });
      project.description = req.body.description;
      project.creator = id;
      project.save((err) => {
        if (!err) {
          res.send("ok");
        } else {
          console.log(err);
        }
      });
    });
  }
);
//запрос на регистрацию
router.post("/toggle");
module.exports = router;
